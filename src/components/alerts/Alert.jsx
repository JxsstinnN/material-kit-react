import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function CustomAlert({status,message, open, onClose}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={status === 'success' ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

CustomAlert.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}