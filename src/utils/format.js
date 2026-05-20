export function formatCurrency(value, moeda = 'AOA') {
  if (value == null) return '—';
  const locales = { AOA: 'pt-AO', EUR: 'pt-PT', USD: 'en-US' };
  return new Intl.NumberFormat(locales[moeda] || 'pt-PT', {
    style: 'currency', currency: moeda,
  }).format(value);
}

export function formatDate(date) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatDateTime(date) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export const DIAS_SEMANA = {
  segunda: 'Segunda-feira', terca: 'Terça-feira', quarta: 'Quarta-feira',
  quinta: 'Quinta-feira', sexta: 'Sexta-feira', sabado: 'Sábado',
};

export const PERMISSOES_LABEL = {
  seminarista: 'Seminarista', staff: 'Staff', admin: 'Administrador',
};

export const SECCAO_LABEL = {
  teologia: 'Secção de Teologia',
  filosofia: 'Secção de Filosofia',
};

export const SECCAO_SHORT = {
  teologia: 'Teologia',
  filosofia: 'Filosofia',
};

export const SECCAO_ANOS = {
  teologia: [1, 2, 3, 4],
  filosofia: [1, 2, 3],
};
