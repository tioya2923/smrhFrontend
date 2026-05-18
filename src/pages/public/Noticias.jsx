import { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicAPI } from '../../api';
import { useApi } from '../../hooks/useApi';
import { formatDate } from '../../utils/format';

const CATEGORIAS = ['todas', 'geral', 'eventos', 'formacao', 'comunidade', 'vocacao'];

export default function Noticias() {
  const [categoria, setCategoria] = useState('todas');
  const [page, setPage] = useState(1);
  const params = categoria === 'todas' ? { page } : { page, categoria };
  const { data, loading } = useApi(() => publicAPI.getNoticias(params), [categoria, page]);

  return (
    <div>
      <section className="bg-dark-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-300 text-sm uppercase tracking-widest mb-4">Actualidade</p>
          <h1 className="text-5xl font-serif font-bold mb-6">Notícias</h1>
          <p className="text-xl text-gray-300 leading-relaxed">O que se passa no Seminário e na Arquidiocese do Huambo.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categorias */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIAS.map(c => (
              <button key={c} onClick={() => { setCategoria(c); setPage(1); }}
                className={`badge px-4 py-2 text-sm cursor-pointer transition-colors capitalize ${categoria === c ? 'bg-primary-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full" />
            </div>
          ) : (
            <>
              {data?.noticias?.length === 0 && (
                <p className="text-center text-gray-500 py-16">Nenhuma notícia encontrada nesta categoria.</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {data?.noticias?.map(n => (
                  <Link key={n.id} to={`/noticias/${n.slug || n.id}`} className="card hover:shadow-md transition-shadow group">
                    {n.imagem_url && <img src={n.imagem_url} alt={n.titulo} className="w-full h-44 object-cover rounded-lg mb-4" loading="lazy" />}
                    <span className="badge bg-primary-100 text-primary-800 mb-2 capitalize">{n.categoria}</span>
                    <h2 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 mb-2">{n.titulo}</h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{n.resumo}</p>
                    <p className="text-xs text-gray-400">{formatDate(n.data_publicacao)}</p>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {data?.total > 10 && (
                <div className="flex justify-center gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary px-4 py-2 text-sm disabled:opacity-50">Anterior</button>
                  <span className="px-4 py-2 text-sm text-gray-600">Página {page}</span>
                  <button onClick={() => setPage(p => p + 1)} disabled={page * 10 >= data.total} className="btn-secondary px-4 py-2 text-sm disabled:opacity-50">Seguinte</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
