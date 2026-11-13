export const PAGE_SIZE = 10;

const configuredBaseUrl = import.meta.env.VITE_1952_API?.trim();

export const BASE_URL = configuredBaseUrl?.replace(/\/$/, '') || '';

export function getApiUrl(path) {
  if (!BASE_URL) {
    throw new Error(
      'The API URL is not configured. Add VITE_1952_API to the deployment environment and redeploy.'
    );
  }

  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
