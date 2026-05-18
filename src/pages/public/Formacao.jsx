export default function Formacao() {
  const diasTipico = [
    { hora: '06:00', atividade: 'Laudes e Oração Pessoal', tipo: 'espiritual' },
    { hora: '07:00', atividade: 'Santa Missa', tipo: 'espiritual' },
    { hora: '07:45', atividade: 'Pequeno-almoço', tipo: 'comunitario' },
    { hora: '08:30', atividade: 'Aulas (1.ª bloco)', tipo: 'academico' },
    { hora: '10:30', atividade: 'Intervalo', tipo: 'comunitario' },
    { hora: '11:00', atividade: 'Aulas (2.ª bloco)', tipo: 'academico' },
    { hora: '13:00', atividade: 'Almoço e Descanso', tipo: 'comunitario' },
    { hora: '15:00', atividade: 'Estudo Individual', tipo: 'academico' },
    { hora: '17:00', atividade: 'Actividade Desportiva / Cultural', tipo: 'comunitario' },
    { hora: '18:30', atividade: 'Vésperas', tipo: 'espiritual' },
    { hora: '19:00', atividade: 'Jantar', tipo: 'comunitario' },
    { hora: '20:00', atividade: 'Tempo Livre / Estudo', tipo: 'academico' },
    { hora: '22:00', atividade: 'Completas e Silêncio', tipo: 'espiritual' },
  ];

  const cores = { espiritual: 'bg-purple-100 text-purple-700', academico: 'bg-blue-100 text-blue-700', comunitario: 'bg-green-100 text-green-700' };

  return (
    <div>
      <section className="bg-dark-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-300 text-sm uppercase tracking-widest mb-4">Curriculum</p>
          <h1 className="text-5xl font-serif font-bold mb-6">Formação</h1>
          <p className="text-xl text-gray-300 leading-relaxed">Sete anos de formação integral: humana, espiritual, intelectual e pastoral.</p>
        </div>
      </section>

      {/* Linhas pedagógicas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Linhas Pedagógicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '❤️', titulo: 'Formação Humana', desc: 'Desenvolvimento da personalidade, maturidade afectiva, liberdade e responsabilidade.' },
              { emoji: '🕊️', titulo: 'Formação Espiritual', desc: 'Vida de oração, sacramentos, lectio divina, direcção espiritual e retiros.' },
              { emoji: '📖', titulo: 'Formação Intelectual', desc: 'Estudos de Filosofia, Teologia, Escritura, Patrística, Direito Canónico e Pastoral.' },
              { emoji: '✝️', titulo: 'Formação Pastoral', desc: 'Estágios paroquiais, catequese, animação litúrgica e serviço aos mais pobres.' },
            ].map(l => (
              <div key={l.titulo} className="card text-center">
                <div className="text-4xl mb-4">{l.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-3">{l.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plano de estudos */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Plano de Estudos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="font-bold text-xl mb-4 text-primary-700">Curso de Filosofia (3 anos)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {['Filosofia Geral', 'Lógica e Epistemologia', 'Metafísica', 'Ética e Filosofia Moral', 'História da Filosofia', 'Filosofia da Religião', 'Introdução à Teologia', 'Línguas (Latim, Grego, Inglês)'].map(d => (
                  <li key={d} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full shrink-0" />{d}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="font-bold text-xl mb-4 text-primary-700">Curso de Teologia (4 anos)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {['Sagrada Escritura (AT e NT)', 'Teologia Sistemática', 'Teologia Moral', 'Patrística', 'Liturgia e Sacramentos', 'Direito Canónico', 'Teologia Pastoral', 'Homilética'].map(d => (
                  <li key={d} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full shrink-0" />{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Um dia típico */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Um Dia Típico</h2>
          <div className="space-y-2">
            {diasTipico.map(({ hora, atividade, tipo }) => (
              <div key={hora} className="flex items-center gap-4 p-3 rounded-lg bg-white border border-gray-100">
                <span className="text-sm font-mono font-bold text-gray-500 w-14 shrink-0">{hora}</span>
                <span className="flex-1 text-sm text-gray-800">{atividade}</span>
                <span className={`badge text-xs ${cores[tipo]}`}>{tipo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
