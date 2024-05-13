import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

// ----------------------------------------------------------------------


export default function ManualView({title,content}) {
  return (
    <Container>

      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{__html: content}} />
    </Container>
  );
}

ManualView.propTypes = {
  title:  PropTypes.string,
  content: PropTypes.string
};
