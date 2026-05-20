import { useApi } from '../../hooks/useApi';
import { adminAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/format';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

function SeccaoBadge({ seccao }) {
  if (!seccao) return null;
  const cfg = seccao === 'teologia'
    ? 'bg-blue-100 text-blue-700'
    : 'bg-amber-100 text-amber-700';
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg}`}>
      {seccao === 'teologia' ? 'Teologia' : 'Filosofia'}
    </span>
  );
}

export default function AdminHome() {
  const { isSuperAdmin } = useAuth();
  const { data: stats } = useApi(() => adminAPI.getStats(), []);
  const { data: arrecadacao } = useApi(() => adminAPI.relatorioArrecadacao(), []);
  const { data: devedores } = useApi(() => adminAPI.relatorioDevedores(), []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral</h1>

      {/* Stats principais */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {[
          { label: 'Seminaristas Activos', value: stats?.total_seminaristas ?? '—', icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Arrecadado', value: stats ? formatCurrency(stats.total_pago, 'AOA') : '—', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
          { label: 'Total em Dívida', value: stats ? formatCurrency(stats.total_devedor, 'AOA') : '—', icon: AlertTriangle, color: 'bg-amber-50 text-amber-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats por secção — apenas para super-admin */}
      {isSuperAdmin && stats?.seminaristas_teologia != null && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card border-l-4 border-blue-500 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.seminaristas_teologia}</p>
              <p className="text-sm text-gray-500">Seminaristas — Teologia</p>
            </div>
          </div>
          <div className="card border-l-4 border-amber-500 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Users size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.seminaristas_filosofia}</p>
              <p className="text-sm text-gray-500">Seminaristas — Filosofia</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arrecadação */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Arrecadação por Mês</h2>
            <Link to="/admin/relatorios" className="text-sm text-primary-600 hover:underline">Ver mais</Link>
          </div>
          {!arrecadacao?.length ? <p className="text-sm text-gray-500 py-4 text-center">Sem dados</p> : (
            <div className="space-y-2">
              {arrecadacao.slice(0, 6).map(r => (
                <div key={r.mes} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20 shrink-0">
                    {new Date(r.mes).toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' })}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${Math.min(100, (r.total / (arrecadacao[0]?.total || 1)) * 100)}%` }} />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-24 text-right">{formatCurrency(r.total, 'AOA')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Devedores */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Maiores Devedores</h2>
            <Link to="/admin/relatorios" className="text-sm text-primary-600 hover:underline">Ver todos</Link>
          </div>
          {!devedores?.length ? <p className="text-sm text-gray-500 py-4 text-center">Sem devedores</p> : (
            <div className="space-y-3">
              {devedores.slice(0, 5).map(d => (
                <div key={d.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Link to={`/admin/seminaristas/${d.user?.id}`} className="text-sm text-gray-900 hover:text-primary-600 font-medium truncate">{d.user?.nome}</Link>
                    <SeccaoBadge seccao={d.user?.seccao} />
                  </div>
                  <span className="badge bg-red-100 text-red-700 text-xs shrink-0">{formatCurrency(d.saldo_devedor, d.moeda)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
