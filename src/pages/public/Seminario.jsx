import { useEffect, useState } from 'react';
import { useConteudo } from '../../hooks/useConteudo';
import { publicAPI } from '../../api';

const DEFAULTS = {
  reitor_teologia_nome: 'Pe. António Lúcio Ferreira',
  reitor_teologia_cargo: 'Reitor da Secção de Teologia',
  reitor_teologia_citacao: '"A Teologia é a ciência da fé. Aqui formamos homens que pensam com a Igreja e servem o povo de Deus com profundidade intelectual e ardor apostólico."',
  reitor_teologia_descricao: 'A Secção de Teologia acolhe os seminaristas que, após concluírem os estudos filosóficos, avançam para a formação teológica específica que os prepara para o presbiterado.',
  reitor_filosofia_nome: 'Pe. Carlos Eduardo Neto',
  reitor_filosofia_cargo: 'Reitor da Secção de Filosofia',
  reitor_filosofia_citacao: '"A Filosofia forma homens que interrogam, que pensam, que buscam a verdade. É o alicerce indispensável sobre o qual se edificará toda a formação teológica."',
  reitor_filosofia_descricao: 'A Secção de Filosofia é o primeiro grau da formação seminarística no Seminário Maior. Os candidatos ao sacerdócio iniciam aqui o seu percurso, adquirindo os fundamentos filosóficos, humanísticos e espirituais necessários.',
  disciplinas_teologia: ['Sagrada Escritura (AT e NT)', 'Teologia Sistemática', 'Teologia Moral', 'Patrística', 'Liturgia e Sacramentos', 'Direito Canónico', 'Teologia Pastoral', 'Homilética'],
  disciplinas_filosofia: ['Filosofia Geral', 'Lógica e Epistemologia', 'Metafísica', 'Ética e Filosofia Moral', 'História da Filosofia', 'Filosofia da Religião', 'Introdução à Teologia', 'Latim e Grego'],
  stats_teologia: [{ valor: '8', desc: 'Seminaristas' }, { valor: '4', desc: 'Anos de formação' }, { valor: '3', desc: 'Membros da Direcção' }],
  stats_filosofia: [{ valor: '6', desc: 'Seminaristas' }, { valor: '3', desc: 'Anos de formação' }, { valor: '3', desc: 'Membros da Direcção' }],
  historia: [
    { ano: '1954', titulo: 'Fundação', desc: 'O Seminário Maior de Cristo Rei é fundado pela Arquidiocese do Huambo.' },
    { ano: '1975', titulo: 'Fidelidade', desc: 'Durante a independência, as duas comunidades mantiveram-se firmes na sua missão.' },
    { ano: '2002', titulo: 'Reconstrução', desc: 'Com o fim da guerra, as duas Secções iniciam uma fase de expansão das suas instalações.' },
    { ano: '2010', titulo: 'Crescimento', desc: 'Abertura de novas instalações e reorganização das duas Secções com estatutos próprios.' },
    { ano: '2020', titulo: 'Digitalização', desc: 'Lançamento de ferramentas digitais de gestão académica para as duas Secções.' },
    { ano: 'Hoje', titulo: 'Missão Viva', desc: 'Com mais de 14 seminaristas nas duas Secções, o Seminário continua a formar sacerdotes para Angola.' },
  ],
  infraestruturas: [
    { emoji: '📚', nome: 'Biblioteca', desc: '5.000+ volumes' },
    { emoji: '⛪', nome: 'Capela', desc: 'Celebrações comuns' },
    { emoji: '🍽️', nome: 'Refeitório', desc: 'Refeições diárias' },
    { emoji: '⚽', nome: 'Desporto', desc: 'Campo e ginásio' },
    { emoji: '🏥', nome: 'Enfermaria', desc: 'Cuidados básicos' },
    { emoji: '💻', nome: 'Laboratório', desc: 'Informática e internet' },
    { emoji: '🌿', nome: 'Jardins', desc: 'Espaços de oração' },
    { emoji: '🏫', nome: 'Salas de Aula', desc: 'Separadas por Secção' },
  ],
};

const seccoes = [
  {
    id: 'teologia',
    titulo: 'Secção de Teologia',
    cor: 'border-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    anos: 4,
    chaveNome: 'reitor_teologia_nome',
    chaveCargo: 'reitor_teologia_cargo',
    chaveCitacao: 'reitor_teologia_citacao',
    chaveDesc: 'reitor_teologia_descricao',
    chaveDisciplinas: 'disciplinas_teologia',
    chaveStats: 'stats_teologia',
  },
  {
    id: 'filosofia',
    titulo: 'Secção de Filosofia',
    cor: 'border-amber-500',
    badge: 'bg-amber-100 text-amber-700',
    anos: 3,
    chaveNome: 'reitor_filosofia_nome',
    chaveCargo: 'reitor_filosofia_cargo',
    chaveCitacao: 'reitor_filosofia_citacao',
    chaveDesc: 'reitor_filosofia_descricao',
    chaveDisciplinas: 'disciplinas_filosofia',
    chaveStats: 'stats_filosofia',
  },
];

function inicialNome(nome) {
  return (nome || '').split(' ').filter(p => !['Pe.', 'Irmã', 'Fr.', 'D.'].includes(p))[0]?.charAt(0) ?? '?';
}

export default function Seminario() {
  const c = useConteudo('seminario', DEFAULTS);
  const [equipa, setEquipa] = useState({ teologia: [], filosofia: [] });


  useEffect(() => {
    publicAPI.getEquipa().then(r => {
      const lista = Array.isArray(r.data) ? r.data : [];
      setEquipa({
        teologia: lista.filter(m => m.seccao === 'teologia').sort((a, b) => a.ordem - b.ordem),
        filosofia: lista.filter(m => m.seccao === 'filosofia').sort((a, b) => a.ordem - b.ordem),
      });
    }).catch(() => {});
  }, []);

  function get(chave) {
    const val = c[chave];
    return val !== undefined && val !== null && val !== '' ? val : DEFAULTS[chave];
  }

  const historia = Array.isArray(c.historia) && c.historia.length ? c.historia : DEFAULTS.historia;
  const infraestruturas = Array.isArray(c.infraestruturas) && c.infraestruturas.length ? c.infraestruturas : DEFAULTS.infraestruturas;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dark-900 text-white py-24">
        {c.hero_imagem && (
          <>
            <img src={c.hero_imagem} alt="" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/55" />
          </>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-300 text-sm uppercase tracking-widest mb-4">Arquidiocese do Huambo</p>
          <h1 className="text-5xl font-serif font-bold mb-6">Seminário Maior de Cristo Rei</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Uma casa com duas vocações distintas: a Secção de Teologia e a Secção de Filosofia, cada uma com a sua Direcção, equipa e regulamento próprios.
          </p>
        </div>
      </section>

      {/* Nota institucional */}
      <section className="py-12 bg-white border-b border-primary-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-800 text-base leading-relaxed">
            O <strong>Seminário Maior de Cristo Rei</strong> é composto por duas Secções canonicamente distintas: a <strong>Secção de Teologia</strong> e a <strong>Secção de Filosofia</strong>. Cada Secção possui direcção autónoma, comunidade própria, programa académico específico e regulamento interno independente.
          </p>
        </div>
      </section>

      {/* Secções */}
      {seccoes.map((s, idx) => {
        const nome = get(s.chaveNome);
        const cargo = get(s.chaveCargo);
        const citacao = get(s.chaveCitacao);
        const descricao = get(s.chaveDesc);
        const foto = c[s.id === 'teologia' ? 'reitor_teologia_foto' : 'reitor_filosofia_foto'];
        const disciplinas = Array.isArray(c[s.chaveDisciplinas]) && c[s.chaveDisciplinas].length
          ? c[s.chaveDisciplinas]
          : DEFAULTS[s.chaveDisciplinas];
        const stats = Array.isArray(c[s.chaveStats]) && c[s.chaveStats].length
          ? c[s.chaveStats]
          : DEFAULTS[s.chaveStats];
        const membros = equipa[s.id] || [];

        return (
          <section key={s.id} className={`py-28 ${idx % 2 === 1 ? 'bg-white' : ''}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`border-l-4 ${s.cor} pl-6 mb-12`}>
                <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold mb-3 ${s.badge}`}>{s.titulo}</span>
                <h2 className="text-3xl font-serif font-bold text-gray-900">{s.titulo}</h2>
              </div>

              {/* Mensagem do Reitor */}
              <div className="grid md:grid-cols-3 gap-12 items-start mb-16">
                <div className="md:col-span-1 text-center">
                  {foto ? (
                    <img
                      src={foto}
                      alt={nome}
                      loading="lazy"
                      decoding="async"
                      className="w-28 h-28 rounded-full object-contain bg-gray-100 mx-auto mb-4 border-4 border-primary-100"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-primary-700">
                      {inicialNome(nome)}
                    </div>
                  )}
                  <p className="font-semibold text-gray-900">{nome}</p>
                  <p className="text-sm text-gray-500">{cargo}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-serif font-bold mb-4">Mensagem do Reitor</h3>
                  <p className="text-gray-600 italic leading-relaxed border-l-4 border-primary-400 pl-4 mb-4 text-base">{citacao}</p>
                  <p className="text-gray-600 leading-relaxed">{descricao}</p>
                </div>
              </div>

              {/* Stats + Direcção + Disciplinas */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="card">
                  <h4 className="font-semibold text-gray-900 mb-4">Em números</h4>
                  <div className="space-y-4">
                    {stats.map((st, i) => (
                      <div key={i} className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-primary-600">{st.valor}</span>
                        <span className="text-sm text-gray-500">{st.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <h4 className="font-semibold text-gray-900 mb-4">Direcção</h4>
                  {membros.length > 0 ? (
                    <div className="space-y-3">
                      {membros.map(m => (
                        <div key={m.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                            {inicialNome(m.nome)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{m.nome}</p>
                            <p className="text-xs text-gray-500">{m.cargo}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">A carregar equipa...</p>
                  )}
                </div>
                <div className="card">
                  <h4 className="font-semibold text-gray-900 mb-4">Disciplinas ({s.anos} anos)</h4>
                  <ul className="space-y-1.5">
                    {disciplinas.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full shrink-0" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* História */}
      <section className="bg-dark-900 text-white py-28">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">História Comum</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {historia.map((h, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-primary-400 mb-2">{h.ano}</div>
                <h3 className="font-semibold text-white mb-2">{h.titulo}</h3>
                <p className="text-sm text-gray-400">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infraestruturas */}
      <section className="py-28">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">Infraestruturas Partilhadas</h2>
          <p className="text-center text-gray-500 text-sm mb-10">Espaços comuns às duas Secções</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {infraestruturas.map((inf, i) => (
              <div key={i} className="card text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{inf.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{inf.nome}</h3>
                <p className="text-xs text-gray-500">{inf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
