const BASE_URL = import.meta.env.VITE_1952_API;

export async function createExhibition(form, token) {
  const url = `${BASE_URL}/exhibition`;

  if (!form.file || !(form.file instanceof File)) {
    throw new Error('Invalid image file. Must be a File object.');
  }

  const formData = new FormData();
  formData.append('file', form.file);
  formData.append('title', form.title);
  formData.append('description', form.description);
  formData.append('year', form.year);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create exhibition');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function getExhibitions({
  token,
  rangeStatus,
  searchQuery,
  sortMethod,
}) {
  let url = `${BASE_URL}/exhibition`;

  if (rangeStatus) {
    url = `${url}?${rangeStatus.field}=${rangeStatus.value}`;
  }

  if (searchQuery) {
    url = `${url}?${searchQuery.field}=${searchQuery.value}`;
  }

  if (sortMethod) {
    sortMethod.field === 'sortOrder'
      ? (url = `${url}?sort=year&${sortMethod.field}=${sortMethod.value}`)
      : (url = `${url}?${sortMethod.field}=${sortMethod.value}`);
  }

  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch exhibitions');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function updateExhibition(data, id, token) {
  const url = `${BASE_URL}/exhibition/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function getExhibition(id, token) {
  const url = `${BASE_URL}/exhibition/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch data');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function updateExhibitionImage(imageFile, id, token) {
  const url = `${BASE_URL}/exhibition/${id}/image`;

  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function deleteExhibition(id, token) {
  const url = `${BASE_URL}/exhibition/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function createWork(form, token) {
  const url = `${BASE_URL}/exhibition`;

  if (!form.file || !(form.file instanceof File)) {
    throw new Error('Invalid image file. Must be a File object.');
  }

  const formData = new FormData();
  formData.append('file', form.file);
  formData.append('title', form.title);
  formData.append('medium', form.medium);
  formData.append('canvas_size', form.canvas_size);
  formData.append('video_url', form.video_url);
  formData.append('exhibition_id', form.exhibition_id);
  formData.append('artist_id', form.artist_id);
  formData.append('value', form.value);
  formData.append('value_currency', form.value_currency);
  formData.append('is_available', form.is_available);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create work');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

////////////////////////////////////////////////////////
export async function getExhibitionData(token) {
  const url = `${BASE_URL}/exhibition/all/meta`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch data');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}
