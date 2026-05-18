export default function Seminario() {
  return (
    <div>
      <section className="bg-dark-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-300 text-sm uppercase tracking-widest mb-4">A nossa Casa</p>
          <h1 className="text-5xl font-serif font-bold mb-6">O Seminário</h1>
          <p className="text-xl text-gray-300 leading-relaxed">Uma casa de formação com décadas de história ao serviço da Igreja em Angola.</p>
        </div>
      </section>

      {/* Mensagem do Reitor */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1 text-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-bold text-primary-700">R</div>
              <p className="font-semibold text-gray-900">Pe. Reitor</p>
              <p className="text-sm text-gray-500">Reitor do Seminário</p>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-serif font-bold mb-6">Mensagem do Reitor</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-600 italic leading-relaxed border-l-4 border-primary-500 pl-4 mb-6">
                  "O Seminário Maior de Cristo Rei é uma casa onde jovens angolanos se preparam para servir a Deus e ao seu povo como sacerdotes. É uma comunidade onde a oração, o estudo e a fraternidade formam homens de Deus."
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Fundado em 1954 pela Arquidiocese do Huambo, o Seminário já formou mais de duzentos sacerdotes que servem em Angola e além-fronteiras. A nossa missão é a formação integral do futuro sacerdote, nas suas dimensões humana, espiritual, intelectual e pastoral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">História e Património</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { ano: '1954', titulo: 'Fundação', desc: 'O Seminário é fundado pela Arquidiocese do Huambo para responder às necessidades da Igreja local.' },
              { ano: '1975', titulo: 'Independência', desc: 'Durante os desafios da independência, o Seminário manteve-se firme na sua missão formativa.' },
              { ano: '2002', titulo: 'Reconstrução', desc: 'Com o fim da guerra civil, o Seminário inicia uma fase de expansão e modernização das suas instalações.' },
              { ano: '2010', titulo: 'Crescimento', desc: 'Abertura de novas instalações académicas e aumento do número de seminaristas.' },
              { ano: '2020', titulo: 'Digitalização', desc: 'Lançamento de ferramentas digitais para apoiar a formação e a gestão académica.' },
              { ano: 'Hoje', titulo: 'Missão Viva', desc: 'Com 45+ seminaristas, continuamos a formar sacerdotes para Angola e para o mundo.' },
            ].map(h => (
              <div key={h.ano} className="card">
                <div className="text-2xl font-bold text-primary-600 mb-2">{h.ano}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{h.titulo}</h3>
                <p className="text-sm text-gray-600">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infraestruturas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Infraestruturas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: '📚', nome: 'Biblioteca', desc: '5.000+ volumes' },
              { emoji: '⛪', nome: 'Capela', desc: 'Capacidade para 200' },
              { emoji: '🏫', nome: 'Salas de Aula', desc: '10 salas equipadas' },
              { emoji: '🍽️', nome: 'Refeitório', desc: 'Refeições diárias' },
              { emoji: '⚽', nome: 'Desporto', desc: 'Campo e ginásio' },
              { emoji: '🏥', nome: 'Enfermaria', desc: 'Cuidados básicos' },
              { emoji: '💻', nome: 'Laboratório', desc: 'Informática e internet' },
              { emoji: '🌿', nome: 'Jardins', desc: 'Espaços de oração' },
            ].map(i => (
              <div key={i.nome} className="card text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{i.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{i.nome}</h3>
                <p className="text-xs text-gray-500">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
