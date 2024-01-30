const BASE_URL = import.meta.env.VITE_1952_API;

export async function createProgram(form, token) {
  const url = `${BASE_URL}/program`;

  if (!form.file || !(form.file instanceof File)) {
    throw new Error('Invalid image file. Must be a File object.');
  }

  const formData = new FormData();
  formData.append('file', form.file);
  formData.append('title', form.title);
  formData.append('description', form.description);

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
      throw new Error(errorData.message || 'Failed to create program');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function getPrograms({
  token,
  // rangeStatus,
  // searchQuery,
  // sortMethod,
}) {
  let url = `${BASE_URL}/program`;

  // if (rangeStatus) {
  //   url = `${url}?${rangeStatus.field}=${rangeStatus.value}`;
  // }

  // if (searchQuery) {
  //   url = `${url}?${searchQuery.field}=${searchQuery.value}`;
  // }

  // if (sortMethod) {
  //   sortMethod.field === 'sortOrder'
  //     ? (url = `${url}?sort=created_at&${sortMethod.field}=${sortMethod.value}`)
  //     : (url = `${url}?${sortMethod.field}=${sortMethod.value}`);
  //   console.log(url);
  // }

  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch programs');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function updateProgram(data, id, token) {
  const url = `${BASE_URL}/program/${id}`;

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

export async function updateProgramImage(imageFile, id, token) {
  const url = `${BASE_URL}/program/${id}/image`;

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

export async function createActivity(form, token) {
  const url = `${BASE_URL}/activity`;

  if (!form.file || !(form.file instanceof File)) {
    throw new Error('Invalid image file. Must be a File object.');
  }

  const formData = new FormData();
  formData.append('file', form.file);
  formData.append('title', form.title);
  formData.append('description', form.description);
  formData.append('video_url', form.video_url);
  formData.append('program_id', form.program_id);
  formData.append('date', form.date);

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
      throw new Error(errorData.message || 'Failed to create activity');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function getActivities({
  token,
  program_id,
  // rangeStatus,
  // searchQuery,
  // sortMethod,
}) {
  let url = `${BASE_URL}/activity?program_id=${program_id}`;

  // if (rangeStatus) {
  //   url = `${url}?${rangeStatus.field}=${rangeStatus.value}`;
  // }

  // if (searchQuery) {
  //   url = `${url}?${searchQuery.field}=${searchQuery.value}`;
  // }

  // if (sortMethod) {
  //   sortMethod.field === 'sortOrder'
  //     ? (url = `${url}?sort=created_at&${sortMethod.field}=${sortMethod.value}`)
  //     : (url = `${url}?${sortMethod.field}=${sortMethod.value}`);
  //   console.log(url);
  // }

  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch activities');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function getActivity(id, token) {
  const url = `${BASE_URL}/activity/${id}`;

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
