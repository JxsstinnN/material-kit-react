import { Helmet } from 'react-helmet-async';

import ManualForm from 'src/components/manuals/ManualForm';


// ----------------------------------------------------------------------

export default function CreateManualForm() {
  return (
    <>
      <Helmet>
        <title> Daite | Crear Manuales </title>
      </Helmet>

      <ManualForm />
    </>
  );
}
