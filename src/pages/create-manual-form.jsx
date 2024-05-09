import { Helmet } from 'react-helmet-async';

import CreateManualFormView from 'src/sections/create-manual/view/create-manual-form';


// ----------------------------------------------------------------------

export default function CreateManualForm() {
  return (
    <>
      <Helmet>
        <title> Daite | Crear Manuales </title>
      </Helmet>

      <CreateManualFormView />
    </>
  );
}
