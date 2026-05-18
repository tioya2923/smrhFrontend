export default function Comunidade() {
  const equipa = [
    { nome: 'Pe. Reitor', cargo: 'Reitor', area: 'Direcção' },
    { nome: 'Pe. Vice-Reitor', cargo: 'Vice-Reitor', area: 'Direcção' },
    { nome: 'Pe. Prefeito de Estudos', cargo: 'Prefeito de Estudos', area: 'Académica' },
    { nome: 'Pe. Director Espiritual', cargo: 'Director Espiritual', area: 'Espiritual' },
    { nome: 'Pe. Ecónomo', cargo: 'Ecónomo', area: 'Administrativa' },
    { nome: 'Pe. Formador', cargo: 'Formador', area: 'Formação' },
  ];

  return (
    <div>
      <section className="bg-dark-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-300 text-sm uppercase tracking-widest mb-4">A nossa Família</p>
          <h1 className="text-5xl font-serif font-bold mb-6">Comunidade</h1>
          <p className="text-xl text-gray-300 leading-relaxed">Formadores e seminaristas unidos na oração, no estudo e na fraternidade.</p>
        </div>
      </section>

      {/* Equipa formadora */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Equipa Formadora</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipa.map(m => (
              <div key={m.nome} className="card text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-primary-700">
                  {m.nome.charAt(3)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{m.nome}</h3>
                <p className="text-sm text-primary-600 font-medium mb-1">{m.cargo}</p>
                <span className="badge bg-gray-100 text-gray-600">{m.area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vida comunitária */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Vida Comunitária</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { titulo: 'Oração Comum', desc: 'Começamos cada dia com a Liturgia das Horas e a Santa Missa, o centro da vida do Seminário.' },
              { titulo: 'Estudo e Formação', desc: 'Aulas de Filosofia e Teologia, seminários de investigação e leitura espiritual estruturam o dia académico.' },
              { titulo: 'Convívio Fraterno', desc: 'Refeições partilhadas, actividades desportivas e culturais constroem laços de fraternidade duradouros.' },
              { titulo: 'Serviço Pastoral', desc: 'Aos fins-de-semana, os seminaristas participam na pastoral das paróquias da Diocese do Huambo.' },
            ].map(v => (
              <div key={v.titulo} className="card">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">{v.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Associações */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-6">Associações de Apoio</h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Várias associações de leigos e entidades parceiras apoiam a missão do Seminário, contribuindo com recursos humanos, materiais e financeiros.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {['Amigos do Seminário', 'Associação Alumni', 'Benefactores da Diocese'].map(a => (
              <div key={a} className="card border-2 border-primary-100">
                <p className="font-semibold text-primary-700">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
