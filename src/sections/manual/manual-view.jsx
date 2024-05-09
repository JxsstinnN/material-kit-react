import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

// ----------------------------------------------------------------------


export default function ManualView({content}) {
  return (
    <Container>
      <h1>Manuales Daite</h1>

      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{__html: content}} />
    </Container>
  );
}

ManualView.propTypes = {
  content: PropTypes.string
};
