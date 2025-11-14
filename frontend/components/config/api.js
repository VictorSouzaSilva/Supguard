const DEFAULT_BASE = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://132.465.89.100:5000';
const API_BASE = DEFAULT_BASE.replace(/\/$/, '');

async function apiFetch(path, { method = 'GET', body, headers } = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? path : '/'+path}`;
  const opts = { method, headers: { 'Content-Type': 'application/json', ...(headers || {}) } };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) {
    const err = new Error(json?.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.payload = json;
    throw err;
  }
  return json;
}

export const api = {
  health: () => apiFetch('/api/health'),
  register: (payload) => apiFetch('/api/register', { method: 'POST', body: payload }),
  login:    (payload) => apiFetch('/api/login',    { method: 'POST', body: payload }),
  criarIncidente: (payload) => apiFetch('/api/incidentes', { method: 'POST', body: payload }),
  listarIncidentes: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch('/api/incidentes' + (qs ? `?${qs}` : ''));
  },
};
export default api;
