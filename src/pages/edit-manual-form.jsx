import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { getManualDetailsById } from 'src/data/api';

import EditManualFormView from 'src/sections/edit-manual/edit-manual-form';

// ----------------------------------------------------------------------

export default function EditManualForm() {
  const { id } = useParams();

  const [manual, setManual] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchManual = async () => {
      try {
        const manualData = await getManualDetailsById(id);
        const manualId = manualData ? manualData[0]?.id_manual : null;

        // Verificar si el manual ha cambiado
        if (manualId !== id) {
          setManual(manualData);
        }
      } catch (error) {
        console.error('Error fetching manual:', error);
      }
    };

    fetchManual();
  }, [id]);

  return (
    <>
      <Helmet>
        <title> Daite | Editar Manuales </title>
      </Helmet>

      <EditManualFormView manual={manual} />
    </>
  );
}
