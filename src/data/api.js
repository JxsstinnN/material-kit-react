export const getCategories = async () => {
  const response = await fetch('http://localhost:5000/categories');
  const data = await response.json();

  return data;
};

export const getModulesWithManuals = async () => {
  const response = await fetch('http://localhost:5000/posts');
  const data = await response.json();

  const modulesWithManuals = {};

  data.forEach(({ id_modulo, modulo, operacion, id_manual, manual }) => {
    modulo = modulo.trim();

    if (!modulesWithManuals[modulo]) {
      modulesWithManuals[modulo] = [];
    }

    const existingOperation = modulesWithManuals[modulo].find(op => op.operacion === operacion);
    if (!existingOperation) {
      modulesWithManuals[modulo].push({
        operacion,
        posts: [{ id_manual, manual }]
      });
    } else {
      existingOperation.posts.push({ id_manual, manual });
    }
  });

  const result = Object.entries(modulesWithManuals).map(([modulo, operations]) => ({
    modulo,
    operations
  }));

  return result;
};


export const getManuals = async () => {
  const response = await fetch('http://localhost:5000/manuals');
  const data = await response.json();

  return data;
};

export const getManualById = async (id) => {
  const response = await fetch(`http://localhost:5000/manual/${id}`);
  const data = await response.json();

  return data;
};

export const getManualByName = async (id) => {

  id = id.replace(/-/g, ' ');

  const response = await fetch(`http://localhost:5000/manual/${id }`);
  const data = await response.json();

  return data;
};

export const getManualDetailsById = async (id) => {
  const response = await fetch(`http://localhost:5000/manual-detail/${id}`);
  const data = await response.json();

  return data;
};

export const getOperations = async (id) => {
  const response = await fetch(`http://localhost:5000/operations`);
  const data = await response.json();

  return data;
}

export const createManual = async (manual) => {
  const response = await fetch('http://localhost:5000/create-manual', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(manual),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      data,
    };
  }

  return {
    ok: true,
    data,
  };
};
