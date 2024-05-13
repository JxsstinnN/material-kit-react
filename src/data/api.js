export const getCategories = async () => {
  const response = await fetch('http://localhost:5000/categories');
  const data = await response.json();

  return data;
};

export const getCategoriesWithPosts = async () => {
  const response = await fetch('http://localhost:5000/posts');
  const data = await response.json();

  // Objeto para almacenar las categorías con sus respectivos posts
  const categoriesWithPosts = {};

  // Iterar sobre los datos y agruparlos por categoría
  data.forEach(({ id_categoria, categoria, id_manual, manual }) => {
    // Verificar si la categoría ya existe en el objeto
    if (!categoriesWithPosts[categoria]) {
      categoriesWithPosts[categoria] = [];
    }
    // Añadir el post a la categoría correspondiente
    categoriesWithPosts[categoria].push({ id_manual, manual });
  });

  // Convertir el objeto en un array de objetos
  const result = Object.entries(categoriesWithPosts).map(([categoria, posts]) => ({
    categoria,
    posts,
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

export const getManualDetailsById = async (id) => {
  const response = await fetch(`http://localhost:5000/manual-detail/${id}`);
  const data = await response.json();

  return data;
};

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
