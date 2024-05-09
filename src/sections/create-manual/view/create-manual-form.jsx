import StarterKit from '@tiptap/starter-kit';
import React, { useRef, useState, useEffect } from 'react';
import {
  MenuDivider,
  RichTextEditor,
  MenuButtonBold,
  MenuButtonItalic,
  MenuSelectHeading,
  MenuControlsContainer,
} from 'mui-tiptap';

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

export default function CreateManualFormView() {
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [alertData, setAlertData] = useState({ status: '', message: '' });

  const rteRef = useRef(null);

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
    console.log('ksajdadlkadlk');
    const result = await createManual(formValues);
    if (result.ok) {
      setAlertData({ status: 'success', message: result.message });
    } else {
      setAlertData({ status: 'error', message: result.message });
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Crear Nuevo Manual</Typography>
      </Stack>

      <form onSubmit={handleSubmit} id="manualForm">
        <Grid container spacing={2}>
          <Grid item justifyContent='flex-end' alignItems='end'>
            <Button
              variant="contained"
              color="success"
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
              onUpdate={(editor) => {
                setFormValues({
                  ...formValues,
                  contenido: editor.editor.getHTML(),
                });
              }}
              extensions={[StarterKit]}
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                </MenuControlsContainer>
              )}
            />
          </Grid>
        </Grid>
      </form>

      <CustomAlert {...alertData} />
    </Container>
  );
}
