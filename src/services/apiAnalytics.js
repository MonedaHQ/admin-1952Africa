import { BASE_URL } from '../utilities/config';
import { addQueryParam } from '../utilities/helpers';

export async function getAnalytics({ dateRange }) {
  let url = `${BASE_URL}/analytics`;

  url = addQueryParam(url, 'dateRange', dateRange);

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch artists');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
}
