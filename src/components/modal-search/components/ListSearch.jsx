import PropTypes from 'prop-types'

import List from '@mui/material/List';
import Paper from '@mui/material/Paper';


export default function ListSearch({children}) {
  return (
    <Paper mt={2} sx={{ maxHeight: 400, overflow: 'auto' }}>
      <List
        sx={{ width: '100%', maxWidth: '100%', bgcolor: 'primary.main' }}
        component="ul"
        aria-labelledby="nested-list-subheader"
      >
        {children}
      </List>
    </Paper>
  );
}

ListSearch.propTypes = {
  children: PropTypes.node.isRequired
}