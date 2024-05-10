import { Helmet } from 'react-helmet-async';

import EditManualFormView from 'src/sections/edit-manual/edit-manual-form';


// ----------------------------------------------------------------------

export default function CreateManualForm() {

  

  return (
    <>
      <Helmet>
        <title> Daite | Editar Manuales </title>
      </Helmet>

      <EditManualFormView />
    </>
  );
}
