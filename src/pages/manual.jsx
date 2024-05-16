import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { getManualByName } from 'src/data/api';

import ManualView from 'src/sections/manual/manual-view';

// ----------------------------------------------------------------------

export default function Manual() {
  const { id } = useParams();

  const [manual, setManual] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchManual = async () => {
      try {
        const manualData = await getManualByName(id);
        const manualId = manualData ? manualData[0]?.id_detalle_manual : null;
        console.log(manualId);
  
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

  const manualContent = manual ? manual[0]?.contenido : null;
  return (
    <>
      <Helmet>
        <title> Manual Daite</title>
      </Helmet>

      <ManualView content={manualContent} />
    </>
  );
}
