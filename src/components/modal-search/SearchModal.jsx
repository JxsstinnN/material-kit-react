import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { getManuals } from 'src/data/api';

import Iconify from 'src/components/iconify';

import ListSearch from './components/ListSearch';
import ListSearchItem from './components/ListSearchItem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'primary.lighter',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getManuals();

      const result = data.filter((manual) =>
        manual.manual.toLowerCase().includes(input.toLowerCase())
      );

      setResults(result);
    };

    fetchData();
  }, [input]);

  const handleChange = debounce((value) => {
    setInput(value); 
  }); 

  return (
    <div>

      <Button
        onClick={handleOpen}
        sx={{
          bgcolor: 'text.white',
          width: '100%',
          '&:hover': { borderBlockColor: 'warning.main' },
        }}
      >
        
        Buscar
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <TextField
              autoFocus
              fullWidth
              placeholder="Buscar..."
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 1, fontWeight: 'fontWeightBold', mb: 2 }}
            />
          </Box>
          <Box>
            <Typography variant="h6">Resultados de la búsqueda</Typography>
            {results.length === 0 ? (
              <Typography variant="body1">No se encontraron resultados.</Typography>
            ) : (
              <ListSearch>
                {results.map((result, key) => (
                  <ListSearchItem manual={result} key={key} handleClose={handleClose} />
                ))}
              </ListSearch>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
