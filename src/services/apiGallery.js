import { addQueryParam } from '../utilities/helpers';
import { normalizeCollection, unwrapData } from './apiResponse';

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
    return unwrapData(responseData);
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
  page,
}) {
  let url = `${BASE_URL}/exhibition`;

  url = addQueryParam(url, 'page', page);
  url = addQueryParam(url, rangeStatus?.field, rangeStatus?.value);
  url = addQueryParam(url, searchQuery?.field, searchQuery?.value);

  if (sortMethod) {
    const sortParam =
      sortMethod.field === 'sortOrder'
        ? 'sort=year&sortOrder'
        : sortMethod.field;
    url = addQueryParam(url, sortParam, sortMethod.value);
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
    return normalizeCollection(responseData);
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
    return unwrapData(responseData);
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
    return unwrapData(responseData);
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
    return unwrapData(responseData);
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
    return unwrapData(responseData, null);
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
    return unwrapData(responseData, []);
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}
