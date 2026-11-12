export function unwrapData(payload, fallback) {
  if (payload?.data !== undefined && payload?.data !== null) return payload.data;
  if (fallback !== undefined) return fallback;

  throw new Error(
    payload?.message || 'The server returned an empty response. Please try again.'
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
