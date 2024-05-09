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

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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

export default function CreateManualFormView() {
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({});

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

  const handleSubmit = (event) => {
    event.preventDefault();

    createManual(formValues);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Crear Nuevo Manual</Typography>
      </Stack>

      <Card sx={{ p: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} justifyContent="flex-end">
              <Box justify-content="flex-end">
                <Button type="submit" variant="contained">
                  Registrar
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={6} xl={12} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Manual"
                name="manual"
                value={formValues.manual || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={12} sx={{ mb: 3 }}>
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

            <Grid item xs={12} sm={6} xl={12} sx={{ mb: 3 }}>
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
      </Card>
    </Container>
  );
}
