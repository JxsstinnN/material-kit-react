import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import { LinkBubbleMenu, RichTextEditor } from 'mui-tiptap';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Iconify from 'src/components/iconify/iconify';
import CustomAlert from 'src/components/alerts/Alert';

import useExtensions from './text-editor/useExtensions';
import EditorMenuControls from './text-editor/EditorMenuControls';
import { createManual, getCategories, getOperations } from '../../data/api';

const ManualForm = ({ manual }) => {
  const [categories, setCategories] = useState([]);
  const [operations, setOperations] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [initialContentSet, setInitialContentSet] = useState(false);
  const extensions = useExtensions('');
  const [alertData, setAlertData] = useState({ status: '', message: '', open: false });

  const rteRef = useRef(null);

  useEffect(() => {
    if (manual) {
      setFormValues({
        id_manual: manual.id_manual || 0,
        manual: manual.manual || '',
        id_modulo: manual.id_modulo || '',
        contenido: manual.contenido || '',
        id_operacion: manual.id_operacion || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manual]);

  const handleAlertClose = () => {
    setAlertData({ ...alertData, open: false });
  };

  const fetchSelectorData = async () => {
    const categoriesData = await getCategories();
    const operationsData = await getOperations();
    setCategories(categoriesData);
    setOperations(operationsData);
  };

  useEffect(() => {
    fetchSelectorData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await createManual(formValues);
    const { data } = result;
    if (result.ok) {
      setAlertData({ status: 'success', message: data[0][0].mensaje, open: true });
      setFormValues({});
      rteRef.current.editor.commands.clearContent();
    } else {
      setAlertData({ status: 'error', message: data.error, open: true });
    }
  };

  const addServerVideo = () => {
    const url = prompt('Ingrese el link del video desde el servidor');
    if (url) {
      rteRef.current.editor.commands.setVideo(url);
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt('Ingrese el Link del video de YT:');
    if (url) {
      rteRef.current.editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(640, 10)) || 640,
        height: Math.max(180, parseInt(480, 10)) || 480,
      });
    }
  };

  const handleContentUpdate = (editor) => {
    setFormValues({
      ...formValues,
      contenido: editor.editor.getHTML(),
    });
  };

  useEffect(() => {
    if (!initialContentSet && formValues.contenido && rteRef.current) {
      rteRef.current.editor.commands.setContent(formValues.contenido);
      setInitialContentSet(true);
    }
  }, [formValues.contenido, initialContentSet]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" mb={5}>

        <Link to='/crearmanualdaite'>        
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
          />
        </Link>

        <Typography variant="h4" ml={3}>
          {manual ? 'Editar Manual' : 'Crear Manual'}{' '}
        </Typography>

      </Stack>

      <form onSubmit={handleSubmit} id="manualForm" autoComplete="off">
        <Grid container spacing={2}>
          <Grid container spacing={2} direction="row-reverse">
            <Grid item justifyContent="flex-end">
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {manual ? 'Guardar' : 'Crear'}
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} xl={12}>
            <TextField
              fullWidth
              label="Manual"
              name="manual"
              value={formValues.manual || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={12} xl={6}>
            <FormControl fullWidth>
              <TextField
                select
                label="Módulo"
                name="id_modulo"
                value={categories.length === 0 ? '' : formValues.id_modulo}
                onChange={handleChange}
              >
                {categories.map(({ id_modulo, modulo }) => (
                  <MenuItem key={id_modulo} value={id_modulo}>
                    {modulo}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} xl={6}>
            <FormControl fullWidth>
              <TextField
                select
                label="Operación"
                name="id_operacion"
                value={operations.length === 0 ? '' : formValues.id_operacion}
                onChange={handleChange}
              >
                {operations.map(({ id_operacion, operacion }) => (
                  <MenuItem key={id_operacion} value={id_operacion}>
                    {operacion}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} xl={12}>
            <InputLabel>Contenido del Manual</InputLabel>
            <RichTextEditor
              ref={rteRef}
              name="contenido"
              extensions={[...extensions]}
              onUpdate={handleContentUpdate}
              renderControls={() => (
                <EditorMenuControls>
                  <Button variant="button" color="primary" onClick={addYoutubeVideo}>
                    YT <Iconify icon="eva:video-fill" />
                  </Button>
                  <Button variant="button" color="primary" onClick={addServerVideo}>
                    SV <Iconify icon="eva:video-fill" />
                  </Button>
                </EditorMenuControls>
              )}
            >
              {() => <LinkBubbleMenu />}
            </RichTextEditor>
          </Grid>
        </Grid>
      </form>

      <CustomAlert {...alertData} onClose={handleAlertClose} />
    </Container>
  );
};

ManualForm.propTypes = {
  manual: PropTypes.object,
};

export default ManualForm;
