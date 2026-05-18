import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, Users, ChevronRight } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { publicAPI } from '../../api';
import { formatDate } from '../../utils/format';

function NewsCard({ noticia }) {
  return (
    <Link to={`/noticias/${noticia.slug || noticia.id}`} className="card hover:shadow-md transition-shadow group">
      {noticia.imagem_url && (
        <img src={noticia.imagem_url} alt={noticia.titulo} className="w-full h-44 object-cover rounded-lg mb-4" loading="lazy" />
      )}
      <span className="badge bg-primary-100 text-primary-800 mb-2">{noticia.categoria}</span>
      <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 mb-2">{noticia.titulo}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{noticia.resumo}</p>
      <p className="text-xs text-gray-400">{formatDate(noticia.data_publicacao)}</p>
    </Link>
  );
}

export default function Home() {
  const { data: noticiaData } = useApi(() => publicAPI.getNoticias({ destaque: true }));
  const noticias = noticiaData?.noticias || [];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-dark-900 text-white min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-950 opacity-90" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <p className="text-primary-300 text-sm uppercase tracking-widest mb-4 font-medium">Diocese do Huambo · Angola</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
              Seminário Maior<br />
              <span className="text-primary-400">de Cristo Rei</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              Formando sacerdotes ao serviço de Deus, da Igreja e do povo angolano. Uma vocação que transforma, uma missão que dura para sempre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/vocacao" className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-8">
                Sente um chamamento? <ArrowRight size={18} />
              </Link>
              <Link to="/ajudar" className="btn-secondary flex items-center justify-center gap-2 text-base py-3 px-8 bg-transparent text-white border-white hover:bg-white hover:text-dark-900">
                <Heart size={18} /> Apoiar o Seminário
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="bg-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[['70+', 'Anos de História'], ['45+', 'Seminaristas'], ['200+', 'Sacerdotes Formados'], ['7', 'Anos de Formação']].map(([n, l]) => (
              <div key={l}>
                <div className="text-4xl font-bold font-serif mb-1">{n}</div>
                <div className="text-sm text-primary-200">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Formação Integral', text: 'Seis anos de formação humana, espiritual, intelectual e pastoral, preparando sacerdotes completos.', href: '/formacao' },
              { icon: Users, title: 'Comunidade Viva', text: 'Uma família que partilha oração, estudo e fraternidade no coração de Angola.', href: '/comunidade' },
              { icon: Heart, title: 'Como Ajudar', text: 'Apadrinhe um seminarista, faça uma doação ou peça uma oração. A sua ajuda faz a diferença.', href: '/ajudar' },
            ].map(({ icon: Icon, title, text, href }) => (
              <Link key={title} to={href} className="card hover:shadow-lg transition-shadow group text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors">
                  <Icon size={28} className="text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{text}</p>
                <span className="text-primary-600 text-sm font-medium flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                  Saber mais <ChevronRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Notícias em destaque */}
      {noticias.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-primary-600 text-sm font-medium uppercase tracking-wide mb-2">Últimas</p>
                <h2 className="section-title">Notícias em Destaque</h2>
              </div>
              <Link to="/noticias" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                Ver todas <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {noticias.slice(0, 3).map(n => <NewsCard key={n.id} noticia={n} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA Donativos */}
      <section className="bg-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">A sua generosidade forma sacerdotes</h2>
          <p className="text-xl text-primary-100 mb-10 leading-relaxed">
            Cada donativo, grande ou pequeno, contribui para a formação dos futuros sacerdotes de Angola. Junte-se a nós nesta missão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ajudar" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors text-base">
              Fazer uma doação
            </Link>
            <Link to="/ajudar#apadrinhamento" className="border border-white text-white hover:bg-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors text-base">
              Apadrinhar um seminarista
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
