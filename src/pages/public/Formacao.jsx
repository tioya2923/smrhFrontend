const diasTipico = [
  { hora: '06:00', atividade: 'Laudes e Oração Pessoal', tipo: 'espiritual' },
  { hora: '07:00', atividade: 'Santa Missa', tipo: 'espiritual' },
  { hora: '07:45', atividade: 'Pequeno-almoço', tipo: 'comunitario' },
  { hora: '08:30', atividade: 'Aulas (1.º bloco)', tipo: 'academico' },
  { hora: '10:30', atividade: 'Intervalo', tipo: 'comunitario' },
  { hora: '11:00', atividade: 'Aulas (2.º bloco)', tipo: 'academico' },
  { hora: '13:00', atividade: 'Almoço e Descanso', tipo: 'comunitario' },
  { hora: '15:00', atividade: 'Estudo Individual', tipo: 'academico' },
  { hora: '17:00', atividade: 'Actividade Desportiva / Cultural', tipo: 'comunitario' },
  { hora: '18:30', atividade: 'Vésperas', tipo: 'espiritual' },
  { hora: '19:00', atividade: 'Jantar', tipo: 'comunitario' },
  { hora: '20:00', atividade: 'Tempo Livre / Estudo', tipo: 'academico' },
  { hora: '22:00', atividade: 'Completas e Silêncio', tipo: 'espiritual' },
];

const cores = {
  espiritual: 'bg-purple-100 text-purple-700',
  academico: 'bg-blue-100 text-blue-700',
  comunitario: 'bg-green-100 text-green-700',
};

const anosFil = [
  { ano: '1.º Ano', disciplinas: ['Filosofia Geral', 'Lógica e Epistemologia', 'Introdução à Filosofia', 'Latim I', 'Grego I', 'Introdução às Ciências da Religião'] },
  { ano: '2.º Ano', disciplinas: ['Metafísica', 'Ética e Filosofia Moral', 'Filosofia da Natureza', 'Latim II', 'Grego II', 'Psicologia Filosófica'] },
  { ano: '3.º Ano', disciplinas: ['História da Filosofia', 'Filosofia da Religião', 'Filosofia Social e Política', 'Introdução à Teologia', 'Patologia e Higiene', 'Línguas Modernas'] },
];

const anosTeo = [
  { ano: '1.º Ano', disciplinas: ['Sagrada Escritura – AT I', 'Teologia Fundamental', 'Patrística I', 'Liturgia Fundamental', 'História da Igreja I', 'Latim Eclesiástico'] },
  { ano: '2.º Ano', disciplinas: ['Sagrada Escritura – NT I', 'Teologia Dogmática I', 'Teologia Moral I', 'Patrística II', 'Liturgia e Sacramentos', 'Direito Canónico I'] },
  { ano: '3.º Ano', disciplinas: ['Sagrada Escritura – NT II', 'Teologia Dogmática II', 'Teologia Moral II', 'Teologia Espiritual', 'Direito Canónico II', 'Psicologia Pastoral'] },
  { ano: '4.º Ano', disciplinas: ['Teologia Pastoral', 'Homilética', 'Catequética', 'Teologia das Missões', 'Ecumenismo', 'Estágio Pastoral Paroquial'] },
];

export default function Formacao() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-dark-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-300 text-sm uppercase tracking-widest mb-4">Curriculum</p>
          <h1 className="text-5xl font-serif font-bold mb-6">Formação</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Sete anos de formação integral distribuídos por duas Secções autónomas: três anos de Filosofia e quatro anos de Teologia.
          </p>
        </div>
      </section>

      {/* Linhas pedagógicas comuns */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">Quatro Dimensões da Formação</h2>
          <p className="text-center text-gray-500 text-sm mb-12">Comuns às duas Secções</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '❤️', titulo: 'Formação Humana', desc: 'Desenvolvimento da personalidade, maturidade afectiva, liberdade e responsabilidade.' },
              { emoji: '🕊️', titulo: 'Formação Espiritual', desc: 'Vida de oração, sacramentos, lectio divina, direcção espiritual e retiros.' },
              { emoji: '📖', titulo: 'Formação Intelectual', desc: 'Filosofia, Teologia, Escritura, Patrística, Direito Canónico e Pastoral, consoante a Secção.' },
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

      {/* Secção de Filosofia */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-amber-500 pl-6 mb-10">
            <span className="inline-block text-xs px-3 py-1 rounded-full font-semibold mb-3 bg-amber-100 text-amber-700">Secção de Filosofia</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Curso de Filosofia — 3 Anos</h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              A Secção de Filosofia oferece uma formação filosófica e humana sólida, constituindo o alicerce indispensável para os estudos teológicos. O candidato adquire ferramentas de pensamento crítico, expressão oral e escrita, e um fundamento espiritual robusto.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {anosFil.map(({ ano, disciplinas }) => (
              <div key={ano} className="card border-t-4 border-amber-400">
                <h3 className="font-bold text-lg mb-4 text-amber-700">{ano}</h3>
                <ul className="space-y-2">
                  {disciplinas.map(d => (
                    <li key={d} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />{d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secção de Teologia */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-blue-500 pl-6 mb-10">
            <span className="inline-block text-xs px-3 py-1 rounded-full font-semibold mb-3 bg-blue-100 text-blue-700">Secção de Teologia</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Curso de Teologia — 4 Anos</h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              A Secção de Teologia aprofunda a fé da Igreja na sua totalidade: Escritura, Dogma, Moral, Liturgia, Direito Canónico e Pastoral. O quarto ano culmina com o estágio pastoral paroquial e prepara o seminarista para a ordenação.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {anosTeo.map(({ ano, disciplinas }) => (
              <div key={ano} className="card border-t-4 border-blue-400">
                <h3 className="font-bold text-lg mb-4 text-blue-700">{ano}</h3>
                <ul className="space-y-2">
                  {disciplinas.map(d => (
                    <li key={d} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />{d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Um dia típico */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">Um Dia Típico</h2>
          <p className="text-center text-gray-500 text-sm mb-10">Ritmo comum às duas Secções</p>
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
