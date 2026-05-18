import api from './client';

// Auth
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  changePassword: (password_atual, password_nova) => api.put('/auth/change-password', { password_atual, password_nova }),
};

// Seminarista
export const semináristaAPI = {
  getPerfil: () => api.get('/seminarista/perfil'),
  updatePerfil: (data) => api.put('/seminarista/perfil', data),
  getHorarios: () => api.get('/seminarista/horarios'),
  getMateriais: () => api.get('/seminarista/materiais'),
  getComunicados: () => api.get('/seminarista/comunicados'),
  getForumPosts: (params) => api.get('/seminarista/forum', { params }),
  createForumPost: (data) => api.post('/seminarista/forum', data),
};

// Propinas
export const propinaAPI = {
  getMinhaDivida: () => api.get('/propinas/minha-divida'),
  pagar: (data) => api.post('/propinas/pagar', data),
  confirmar: (data) => api.post('/propinas/confirmar', data),
  getRecibos: () => api.get('/propinas/recibos'),
  downloadRecibo: (id) => api.get(`/propinas/recibos/${id}/download`, { responseType: 'blob' }),
  pedirProrrogacao: (data) => api.post('/propinas/pedir-prorrogacao', data),
};

// Público
export const publicAPI = {
  getNoticias: (params) => api.get('/noticias', { params }),
  getNoticia: (id) => api.get(`/noticias/${id}`),
  getEventos: () => api.get('/eventos'),
  submitContacto: (data) => api.post('/contacto/formulario', data),
  criarDonativo: (data) => api.post('/donativos/criar', data),
};

// Admin
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  listSeminaristas: (params) => api.get('/admin/seminaristas', { params }),
  getSeminarista: (id) => api.get(`/admin/seminarista/${id}`),
  createSeminarista: (data) => api.post('/admin/seminarista', data),
  updateSeminarista: (id, data) => api.put(`/admin/seminarista/${id}`, data),
  aplicarBolsa: (id, data) => api.post(`/admin/seminarista/${id}/bolsa`, data),
  configurarPropina: (data) => api.post('/admin/propina/config', data),
  enviarComunicado: (data) => api.post('/admin/comunicado', data),
  getPagamentos: (params) => api.get('/admin/pagamentos', { params }),
  relatorioArrecadacao: () => api.get('/admin/relatorios/arrecadacao'),
  relatorioDevedores: () => api.get('/admin/relatorios/devedores'),
  uploadMaterial: (formData) => api.post('/admin/material', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
