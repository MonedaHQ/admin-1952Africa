export function unwrapData(payload, fallback) {
  if (payload?.data !== undefined && payload?.data !== null) return payload.data;
  if (fallback !== undefined) return fallback;

  throw new Error(
    payload?.message || 'The server returned an empty response. Please try again.'
  );
}

export async function parseApiResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const responseText = (await response.text()).trim();
  const detail = responseText
    ? ` The server returned: ${responseText.slice(0, 120)}`
    : '';

  throw new Error(
    `The API returned an invalid response (${response.status}). Check the deployed API URL.${detail}`
  );
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return { data: payload, count: payload.length, meta: { itemCount: payload.length } };
  }

  const data = Array.isArray(payload?.data) ? payload.data : [];
  const count = Number(
    payload?.meta?.itemCount ?? payload?.count ?? payload?.total ?? data.length
  );
  const safeCount = Number.isFinite(count) ? count : data.length;
  return {
    ...payload,
    data,
    count: safeCount,
    meta: { ...payload?.meta, itemCount: safeCount },
  };
}
