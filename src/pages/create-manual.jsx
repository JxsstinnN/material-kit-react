import { Helmet } from 'react-helmet-async';

import { CreateManualView } from 'src/sections/create-manual/view/';

// ----------------------------------------------------------------------

export default function CreateManual() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <CreateManualView />
    </>
  );
}
