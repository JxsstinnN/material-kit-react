import PropTypes from 'prop-types';
import { RichTextEditor } from 'mui-tiptap';
import StarterKit from '@tiptap/starter-kit';
import React, { useRef, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { createManual, getCategories } from 'src/data/api';

import Iconify from 'src/components/iconify/iconify';
import CustomAlert from 'src/components/alerts/Alert';

import useExtensions from '../create-manual/view/text-editor/useExtensions';
import EditorMenuControls from '../create-manual/view/text-editor/EditorMenuControls';

export default function EditManualFormView({ manual }) {
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({});
  const extensions = useExtensions('');
  const [alertData, setAlertData] = useState({ status: '', message: '', open: false });

  const rteRef = useRef(null);

  if(manual) {
    setFormValues({
      manual: manual.manual,
      id_categoria: manual.id_categoria,
      contenido: manual.contenido,
    });
  }

  const handleAlertClose = () => {
    setAlertData({ ...alertData, open: false });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
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

  const addYoutubeVideo = () => {

    const url = prompt('Ingrese el Link del video de YT:');

    if(url) {
      rteRef.current.editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(640, 10)) || 640,
        height: Math.max(180, parseInt(480, 10)) || 480,
      });
    }

  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Editar Manual</Typography>
      </Stack>

      <form onSubmit={handleSubmit} id="manualForm" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item justifyContent="flex-end" alignItems="end">
            <Button
              variant="contained"
              color="success"
              type="submit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Agregar
            </Button>
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
          <Grid item xs={12} sm={12} xl={12}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                name="id_categoria"
                value={formValues.id_categoria || ''}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id_categoria} value={category.id_categoria}>
                    {category.categoria}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} xl={12}>
            <InputLabel>Contenido del Manual</InputLabel>
            <RichTextEditor
              ref={rteRef}
              onChange={handleChange}
              name="contenido"
              extensions={[...extensions, StarterKit]}
              renderControls={() => (
                <EditorMenuControls>
                  <Button variant="button" color="primary" onClick={addYoutubeVideo}>
                    YT <Iconify icon="eva:video-fill" />
                  </Button>
                </EditorMenuControls>
              )}
              onUpdate={(editor) => {
                setFormValues({
                  ...formValues,
                  contenido: editor.editor.getHTML(),
                });
              }}
            />
          </Grid>
        </Grid>
      </form>

      <CustomAlert {...alertData} onClose={handleAlertClose} />
    </Container>
  );
}

EditManualFormView.propTypes = { 
  manual: PropTypes.object.isRequired,
}
