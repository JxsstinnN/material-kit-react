import { Helmet } from 'react-helmet-async';

import ManualCRUD from 'src/sections/create-manual/view/manualCRUD';

// ----------------------------------------------------------------------

export default function CreateManual() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

     <ManualCRUD />
    </>
  );
}
