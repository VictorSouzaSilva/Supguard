const DEFAULT_BASE = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.1.66:5000';
const API_BASE = DEFAULT_BASE.replace(/\/$/, '');

async function apiFetch(path, { method = 'GET', body, headers } = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? path : '/'+path}`;
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    timeout: 10000, // 10 segundos de timeout
  };
  if (body !== undefined) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(url, opts);
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
    if (!res.ok) {
      const err = new Error(json?.error || `HTTP ${res.status}`);
      err.status = res.status;
      err.payload = json;
      throw err;
    }
    return json;
  } catch (error) {
    console.error('🔴 Erro de conexão:', {
      url,
      error: error.message,
      type: error.type || 'unknown',
    });
    throw error;
  }
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
  criarContato: (payload) => apiFetch('/api/contato', { method: 'POST', body: payload }),
};
export default api;
