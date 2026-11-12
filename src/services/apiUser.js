import { BASE_URL } from '../utilities/config';
import { addQueryParam } from '../utilities/helpers';
import { normalizeCollection, unwrapData } from './apiResponse';

export async function updateProfileImage(imageFile, token) {
  const url = `${BASE_URL}/user/display-image`;

  if (!(imageFile instanceof File)) {
    throw new Error('Invalid imageFile. Must be a File object.');
  }

  const formData = new FormData();
  formData.append('file', imageFile);

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
      throw new Error(errorData.message || 'Image upload failed');
    }

    const responseData = await response.json();
    return unwrapData(responseData);
  } catch (error) {
    console.error('Image upload error:', error.message);
    throw new Error('Image upload failed');
  }
}
export async function getCurrentUser(id, token) {
  const url = `${BASE_URL}/user/${id}`;

  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch');
    }

    const responseData = await response.json();
    return unwrapData(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Could not fetch data');
  }
}

export async function getUsers({
  token,
  rangeStatus,
  searchQuery,
  sortMethod,
  page,
}) {
  let url = `${BASE_URL}/user`;

  url = addQueryParam(url, 'page', page);
  url = addQueryParam(url, rangeStatus?.field, rangeStatus?.value);
  url = addQueryParam(url, searchQuery?.field, searchQuery?.value);

  if (sortMethod) {
    const sortParam =
      sortMethod.field === 'sortOrder'
        ? 'sort=created_at&sortOrder'
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
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    const responseData = await response.json();
    return normalizeCollection(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Could not fetch data');
  }
}

export async function getUser(id, token) {
  const url = `${BASE_URL}/user/${id}`;

  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    const responseData = await response.json();
    return unwrapData(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Could not fetch data');
  }
}

export async function updateUser(data, token) {
  const url = `${BASE_URL}/user`;

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
    throw new Error('Failed to update');
  }
}

export async function createUser(data, token) {
  const url = `${BASE_URL}/user`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
    }
    const responseData = await response.json();
    return unwrapData(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function upgradeUserRole(data, id, token) {
  const url = `${BASE_URL}/user/${id}/role`;

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
    throw new Error('Failed to update');
  }
}

export async function deleteUser(id, token) {
  const url = `${BASE_URL}/user/${id}`;

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
