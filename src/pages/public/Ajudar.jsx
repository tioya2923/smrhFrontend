import { useState } from 'react';
import { Heart, HandHeart, Cross } from 'lucide-react';
import { publicAPI } from '../../api';
import toast from 'react-hot-toast';

function DonatePage() {
  const [valor, setValor] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome || !email || !valor) return toast.error('Preencha todos os campos obrigatórios');
    setLoading(true);
    try {
      const res = await publicAPI.criarDonativo({ nome, email, valor: parseFloat(valor), moeda: 'AOA', mensagem });
      toast.success('Redirecionando para pagamento...');
      // In production: use Stripe Elements here with client_secret
    } catch (err) {
      toast.error(err.response?.data?.erro || 'Erro ao processar donativo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="donativo" className="card max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Fazer uma Doação</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 mb-2">
          {[5000, 10000, 25000, 50000].map(v => (
            <button key={v} type="button" onClick={() => setValor(String(v))}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${String(v) === valor ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 hover:border-primary-400'}`}>
              {v.toLocaleString('pt-AO')} Kz
            </button>
          ))}
        </div>
        <div>
          <label className="label">Outro valor (Kz)</label>
          <input type="number" min="1000" step="1000" value={valor} onChange={e => setValor(e.target.value)} placeholder="Ex: 15000" className="input" />
        </div>
        <div>
          <label className="label">Nome *</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} className="input" required />
        </div>
        <div>
          <label className="label">Email *</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" required />
        </div>
        <div>
          <label className="label">Mensagem (opcional)</label>
          <textarea value={mensagem} onChange={e => setMensagem(e.target.value)} rows={3} className="input" placeholder="Deixe uma mensagem de apoio..." />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'A processar...' : `Doar ${valor ? parseInt(valor).toLocaleString('pt-AO') + ' Kz' : ''}`}
        </button>
        <p className="text-xs text-gray-500 text-center">Pagamento seguro via Stripe. Os seus dados estão protegidos.</p>
      </form>
    </div>
  );
}

export default function Ajudar() {
  return (
    <div>
      <section className="bg-dark-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-300 text-sm uppercase tracking-widest mb-4">Generosidade</p>
          <h1 className="text-5xl font-serif font-bold mb-6">Como Ajudar</h1>
          <p className="text-xl text-gray-300 leading-relaxed">A sua generosidade transforma vidas e forma sacerdotes ao serviço de Angola.</p>
        </div>
      </section>

      {/* Opções */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { emoji: '💝', titulo: 'Donativos', desc: 'Apoie a missão formativa com uma contribuição livre, única ou mensal.' },
              { emoji: '🤝', titulo: 'Apadrinhamento', desc: 'Apadrinhe um seminarista e acompanhe a sua jornada vocacional de perto.' },
              { emoji: '🙏', titulo: 'Pedido de Oração', desc: 'Os nossos seminaristas rezam por si e pelos seus intenções. Envie o seu pedido.' },
            ].map(o => (
              <div key={o.titulo} className="card text-center">
                <div className="text-5xl mb-4">{o.emoji}</div>
                <h3 className="font-semibold text-xl mb-3">{o.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <DonatePage />

            {/* Apadrinhamento */}
            <div id="apadrinhamento" className="card">
              <h3 className="text-xl font-semibold mb-4">Apadrinhamento de Seminaristas</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ao apadrinhar um seminarista, contribui mensalmente para cobrir os custos da sua formação (propinas, material escolar, alimentação, alojamento).
              </p>
              <ul className="space-y-2 mb-6">
                {['Recebe cartas e atualizações do seminarista que apoia', 'Participação na missa de ordenação', 'Oração especial do seminarista por si', 'Contribuição a partir de 50.000 Kz/mês'].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-primary-600 font-bold shrink-0">✓</span>{i}
                  </li>
                ))}
              </ul>
              <a href="mailto:info@cristorei.ao?subject=Apadrinhamento" className="btn-secondary block text-center">
                Tornar-me Padrinho
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Oração */}
      <section id="oracao" className="bg-primary-700 text-white py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🙏</div>
          <h2 className="text-3xl font-serif font-bold mb-4">Pedido de Oração</h2>
          <p className="text-primary-100 mb-8">Envie o seu pedido de oração e os nossos seminaristas orarão por si durante a Missa e a oração comunitária.</p>
          <a href="mailto:oracao@cristorei.ao?subject=Pedido de Oração" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg inline-block transition-colors">
            Enviar Pedido de Oração
          </a>
        </div>
      </section>
    </div>
  );
}
