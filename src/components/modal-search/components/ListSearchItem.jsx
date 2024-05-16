import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { replaceSpaces } from 'src/utils/replace-spaces';


export default function ListSearchItem({manual, handleClose, key}) {
  return (
    <Link
    key={key}
    to={`/manual/${replaceSpaces(manual.manual)}`}
    style={{ textDecoration: 'none', color: '#FFFFFF'}}
    onClick={handleClose}
    >
    <ListItemButton sx={{
      borderBottom: '1px solid #FFFFFF',
      height: '57px'
    }}>
      <ListItemText primary={manual.manual} secondary={`${manual.modulo} ${manual.operacion}`} />
    </ListItemButton>
    </Link>
  )
}

ListSearchItem.propTypes = { 
  manual: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  key: PropTypes.number.isRequired
}