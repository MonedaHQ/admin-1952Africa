import { BASE_URL } from '../utilities/config';
import { addQueryParam } from '../utilities/helpers';
import { normalizeCollection, unwrapData } from './apiResponse';

export async function createArtist(form, token) {
  const url = `${BASE_URL}/artist`;

  if (!form.file || !(form.file instanceof File)) {
    throw new Error('Invalid image file. Must be a File object.');
  }

  const formData = new FormData();
  formData.append('file', form.file);
  formData.append('first_name', form.first_name);
  formData.append('last_name', form.last_name);
  formData.append('medium', form.medium);
  formData.append('bio', form.bio);
  formData.append('video_url', form.video_url);
  formData.append('instagram_url', form.instagram_url);
  formData.append('email', form.email);
  form.program_id && formData.append('program_id', form.program_id);
  form.activity_id && formData.append('activity_id', form.activity_id);

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
      throw new Error(errorData.message || 'Failed to create artist');
    }

    const responseData = await response.json();
    return unwrapData(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function getArtists({
  program_id,
  rangeStatus,
  searchQuery,
  sortMethod,
  page,
}) {
  let url = `${BASE_URL}/artist`;

  url = addQueryParam(url, 'program_id', program_id);
  url = addQueryParam(url, 'page', page);
  url = addQueryParam(url, rangeStatus?.field, rangeStatus?.value);
  url = addQueryParam(url, searchQuery?.field, searchQuery?.value);

  if (sortMethod) {
    const sortParam =
      sortMethod.field === 'sortOrder'
        ? 'sort=first_name&sortOrder'
        : sortMethod.field;
    url = addQueryParam(url, sortParam, sortMethod.value);
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch artists');
    }

    const responseData = await response.json();
    return normalizeCollection(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function getArtist(id) {
  const url = `${BASE_URL}/artist/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
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

export async function updateArtist(data, id, token) {
  const url = `${BASE_URL}/artist/${id}`;

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

export async function updateArtistAvatar(imageFile, id, token) {
  const url = `${BASE_URL}/artist/${id}/image`;

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

export async function deleteArtist(id, token) {
  const url = `${BASE_URL}/artist/${id}`;

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

/////////////////////////////
export async function getArtistData(token) {
  const url = `${BASE_URL}/artist/all/meta`;

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
