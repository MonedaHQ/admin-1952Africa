const BASE_URL = import.meta.env.VITE_1952_API;

export async function login(email, password) {
  const url = `${BASE_URL}/auth/sign-in`;
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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw new Error('Login failed');
  }
}

export async function changePassword(data, token) {
  const url = `${BASE_URL}/auth/change-password`;

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
