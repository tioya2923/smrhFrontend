import { useState } from 'react';
import { adminAPI } from '../../api';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';
import { Search, Plus, Eye } from 'lucide-react';
import { formatCurrency, PERMISSOES_LABEL, SECCAO_SHORT, SECCAO_ANOS } from '../../utils/format';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function SeccaoBadge({ seccao }) {
  if (!seccao) return <span className="text-gray-400">—</span>;
  const cfg = seccao === 'teologia' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700';
  return <span className={`badge text-xs ${cfg}`}>{SECCAO_SHORT[seccao]}</span>;
}

export default function AdminSeminaristas() {
  const { isSuperAdmin, seccao: adminSeccao } = useAuth();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filterSeccao, setFilterSeccao] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    nome: '', email: '', password: '',
    ano_formacao: 1, permissoes: 'seminarista',
    seccao: adminSeccao || 'teologia',
  });

  const seccaoQuery = adminSeccao || filterSeccao || undefined;
  const { data, loading, reload } = useApi(
    () => adminAPI.listSeminaristas({ page, search: search || undefined, seccao: seccaoQuery }),
    [page, search, filterSeccao],
  );

  const anosDisponiveis = SECCAO_ANOS[form.seccao] || [1, 2, 3, 4];

  function set(field) { return e => setForm(f => ({ ...f, [field]: e.target.value })); }

  function handleSeccaoChange(e) {
    const s = e.target.value;
    setForm(f => ({ ...f, seccao: s, ano_formacao: 1 }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await adminAPI.createSeminarista(form);
      toast.success('Utilizador criado com sucesso');
      setShowCreate(false);
      setPage(1);
      reload?.();
    } catch (err) {
      toast.error(err.response?.data?.erro || 'Erro ao criar utilizador');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seminaristas e Staff</h1>
          {adminSeccao && (
            <p className="text-sm text-gray-500 mt-0.5">
              {adminSeccao === 'teologia' ? 'Secção de Teologia' : 'Secção de Filosofia'}
            </p>
          )}
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Adicionar
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Pesquisar por nome..." value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }} className="input pl-10" />
        </div>
        {isSuperAdmin && (
          <select value={filterSeccao} onChange={e => { setFilterSeccao(e.target.value); setPage(1); }} className="input w-44">
            <option value="">Todas as Secções</option>
            <option value="teologia">Teologia</option>
            <option value="filosofia">Filosofia</option>
          </select>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" /></div>
      ) : (
        <>
          <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Nome', 'Email', 'Secção', 'Ano', 'Tipo', 'Dívida', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data?.seminaristas?.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-700">{s.nome?.charAt(0)}</div>
                          <span className="font-medium">{s.nome}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{s.email}</td>
                      <td className="px-4 py-3"><SeccaoBadge seccao={s.seccao} /></td>
                      <td className="px-4 py-3">{s.ano_formacao ? `${s.ano_formacao}º` : '—'}</td>
                      <td className="px-4 py-3"><span className="badge bg-gray-100 text-gray-700 capitalize">{PERMISSOES_LABEL[s.permissoes]}</span></td>
                      <td className="px-4 py-3">
                        {s.propina ? (
                          <span className={`badge ${parseFloat(s.propina.saldo_devedor) > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {formatCurrency(s.propina.saldo_devedor, s.propina.moeda)}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/admin/seminaristas/${s.id}`} className="text-primary-600 hover:text-primary-700">
                          <Eye size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {!data?.seminaristas?.length && (
                    <tr><td colSpan={7} className="text-center py-10 text-gray-500">Nenhum resultado</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {data?.total > 25 && (
            <div className="flex justify-center gap-2 mt-4">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-sm px-4 py-2 disabled:opacity-50">Anterior</button>
              <span className="px-4 py-2 text-sm text-gray-600">{page} / {Math.ceil(data.total / 25)}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page * 25 >= data.total} className="btn-secondary text-sm px-4 py-2 disabled:opacity-50">Seguinte</button>
            </div>
          )}
        </>
      )}

      {/* Modal criar */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="font-semibold text-lg mb-4">Novo Utilizador</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div><label className="label">Nome *</label><input type="text" onChange={set('nome')} className="input" required /></div>
              <div><label className="label">Email *</label><input type="email" onChange={set('email')} className="input" required /></div>
              <div><label className="label">Password *</label><input type="password" onChange={set('password')} className="input" required minLength={8} /></div>

              <div>
                <label className="label">Secção *</label>
                <select value={form.seccao} onChange={handleSeccaoChange} className="input" disabled={!isSuperAdmin}>
                  <option value="teologia">Secção de Teologia</option>
                  <option value="filosofia">Secção de Filosofia</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Ano</label>
                  <select value={form.ano_formacao} onChange={set('ano_formacao')} className="input">
                    {anosDisponiveis.map(n => <option key={n} value={n}>{n}º Ano</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Tipo</label>
                  <select onChange={set('permissoes')} className="input">
                    {['seminarista', 'staff', 'admin'].map(p => <option key={p} value={p}>{PERMISSOES_LABEL[p]}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">Criar</button>
                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
