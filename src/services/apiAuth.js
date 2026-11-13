import { getApiUrl } from '../utilities/config';
import { parseApiResponse, unwrapData } from './apiResponse';

export async function login(email, password) {
  const url = getApiUrl('/auth/sign-in');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await parseApiResponse(response);
      throw new Error(errorData.message || 'Login failed');
    }
    const responseData = await parseApiResponse(response);
    return unwrapData(responseData);
  } catch (error) {
    console.error('Login error:', error.message);
    throw new Error(error.message);
  }
}

export async function resetPassword(email) {
  const url = getApiUrl('/auth/reset-password');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!response.ok) {
      const errorData = await parseApiResponse(response);
      throw new Error(errorData.message || 'Failed to reset');
    }
    const responseData = await parseApiResponse(response);
    return unwrapData(responseData, {});
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function changePassword(data, token) {
  const url = getApiUrl('/auth/change-password');

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await parseApiResponse(response);
      throw new Error(errorData.message || 'Failed to update');
    }

    const responseData = await parseApiResponse(response);
    return unwrapData(responseData, {});
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}

export async function updatePassword(data, token) {
  const url = getApiUrl('/auth/update-password');
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await parseApiResponse(response);
      throw new Error(errorData.message || 'Failed to update');
    }

    const responseData = await parseApiResponse(response);
    return unwrapData(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}
