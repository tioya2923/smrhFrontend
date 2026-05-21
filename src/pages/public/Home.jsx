import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { publicAPI } from '../../api';
import { useConteudo } from '../../hooks/useConteudo';

const DEFAULTS = {
  citacao: '«Que o Senhor envie à sua Igreja novos obreiros da messe, sacerdotes sábios e santos, para que a evangelização chegue a todos os cantos de Angola e o Evangelho transforme os corações dos homens.»',
  hero_subtitulo: 'Seminário Maior',
  hero_titulo: 'DE CRISTO REI',
};

/* ── Social sidebar ────────────────────────────────────────────────────────── */
function SocialSidebar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 bg-[#3b5998] text-white hover:bg-[#2d4373] transition-colors"
        aria-label="Facebook"><Facebook size={15} /></a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 bg-[#1da1f2] text-white hover:bg-[#1a8fd1] transition-colors"
        aria-label="Twitter"><Twitter size={15} /></a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 bg-[#c13584] text-white hover:bg-[#a0286c] transition-colors"
        aria-label="Instagram"><Instagram size={15} /></a>
    </div>
  );
}

/* ── Hero Slider ───────────────────────────────────────────────────────────── */
function HeroSlider({ subtitulo, titulo, imagens }) {
  const [slide, setSlide] = useState(0);
  const srcs = imagens.length ? imagens : ['/images/hero.svg'];
  const total = srcs.length;

  const next = useCallback(() => setSlide(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setSlide(i => (i === 0 ? total - 1 : i - 1)), [total]);

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, total]);

  return (
    <section className="relative bg-gray-900 overflow-hidden" style={{ height: '70vh', minHeight: '480px' }}>
      {srcs.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          fetchpriority={i === 0 ? 'high' : 'low'}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {/* gradient overlay — left-heavy so text is legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

      {/* text */}
      <div className="relative h-full flex flex-col justify-center px-10 md:px-20 lg:px-28 max-w-3xl">
        <p className="text-white/75 uppercase tracking-[0.25em] mb-3 text-sm md:text-base font-light">
          {subtitulo}
        </p>
        <h1 className="text-white font-serif font-bold leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
          {titulo}
        </h1>
        <div className="mt-6 w-16 h-1 bg-primary-500" />
      </div>

      {/* arrows */}
      <button onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-primary-700 text-white p-2.5 transition-colors"
        aria-label="Slide anterior"><ChevronLeft size={26} /></button>
      <button onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-primary-700 text-white p-2.5 transition-colors"
        aria-label="Próximo slide"><ChevronRight size={26} /></button>

      {/* dots */}
      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {srcs.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === slide ? 'bg-white' : 'bg-white/35'}`} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ── News Slider ───────────────────────────────────────────────────────────── */
function NewsSlider({ noticias }) {
  const [cur, setCur] = useState(0);

  const prev = useCallback(e => { e.stopPropagation(); setCur(i => (i === 0 ? noticias.length - 1 : i - 1)); }, [noticias.length]);
  const next = useCallback(e => { e.stopPropagation(); setCur(i => (i === noticias.length - 1 ? 0 : i + 1)); }, [noticias.length]);

  useEffect(() => {
    if (noticias.length <= 1) return;
    const t = setInterval(() => setCur(i => (i === noticias.length - 1 ? 0 : i + 1)), 5000);
    return () => clearInterval(t);
  }, [noticias.length]);

  if (!noticias.length) {
    return (
      <div className="relative bg-white flex flex-col border border-gray-100" style={{ minHeight: '440px' }}>
        <div className="absolute top-0 left-0 right-0 bg-primary-700 px-5 py-2.5 z-10">
          <span className="text-white font-bold text-xs tracking-widest uppercase">Notícias</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Sem notícias de momento</p>
        </div>
      </div>
    );
  }

  const n = noticias[cur];
  const href = `/noticias/${n.slug || n.id}`;

  return (
    <div className="relative group bg-white overflow-hidden border border-gray-100" style={{ minHeight: '440px' }}>
      {/* full-area image */}
      <Link to={href} className="absolute inset-0 block" tabIndex={-1} aria-hidden="true">
        {n.imagem_url
          ? <img src={n.imagem_url} alt={n.titulo} loading="lazy" decoding="async"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 will-change-transform" />
          : <div className="w-full h-full bg-gray-100" />}
      </Link>

      {/* badge */}
      <div className="absolute top-0 left-0 bg-primary-700 px-5 py-2.5 z-10">
        <span className="text-white font-bold text-xs tracking-widest uppercase">Notícias</span>
      </div>

      {/* arrows on hover */}
      {noticias.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary-700 text-white p-2 z-20 opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Anterior"><ChevronLeft size={20} /></button>
          <button onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary-700 text-white p-2 z-20 opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Seguinte"><ChevronRight size={20} /></button>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {noticias.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCur(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === cur ? 'bg-white' : 'bg-white/35'}`} />
            ))}
          </div>
        </>
      )}

      {/* title bar */}
      <Link to={href}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/4 bg-primary-700/60 hover:bg-primary-700/75 transition-colors px-5 py-4 z-10 block text-center backdrop-blur-sm">
        <p className="text-white font-semibold text-sm leading-snug line-clamp-2">{n.titulo}</p>
      </Link>
    </div>
  );
}

/* ── Testimonials Slider ───────────────────────────────────────────────────── */
function TestemunhosSlider() {
  const [list, setList] = useState([]);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    publicAPI.getConteudo('vocacao')
      .then(r => { const l = Array.isArray(r.data?.testemunhos) ? r.data.testemunhos : []; if (l.length) setList(l); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => setCur(i => (i === list.length - 1 ? 0 : i + 1)), 6000);
    return () => clearInterval(t);
  }, [list.length]);

  const prev = e => { e.stopPropagation(); setCur(i => (i === 0 ? list.length - 1 : i - 1)); };
  const goNext = e => { e.stopPropagation(); setCur(i => (i === list.length - 1 ? 0 : i + 1)); };
  const t = list[cur];

  return (
    <div className="relative group bg-white overflow-hidden border border-gray-100" style={{ minHeight: '440px' }}>
      <Link to="/vocacao" className="absolute inset-0 z-0" tabIndex={-1} aria-hidden="true" />

      {t?.foto_url
        ? <img src={t.foto_url} alt={t.nome} loading="lazy" decoding="async"
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 will-change-transform" />
        : <div className="absolute inset-0 bg-gray-100" />}

      <div className="absolute top-0 left-0 bg-primary-700 px-5 py-2.5 z-10">
        <span className="text-white font-bold text-xs tracking-widest uppercase">Testemunhos</span>
      </div>

      {list.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary-700 text-white p-2 z-20 opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Anterior"><ChevronLeft size={20} /></button>
          <button onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary-700 text-white p-2 z-20 opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Seguinte"><ChevronRight size={20} /></button>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {list.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCur(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === cur ? 'bg-white' : 'bg-white/35'}`} />
            ))}
          </div>
        </>
      )}

      <Link to="/vocacao"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/4 bg-primary-700/60 hover:bg-primary-700/75 transition-colors px-5 py-4 z-10 block text-center backdrop-blur-sm">
        {t
          ? <><p className="text-white font-semibold text-sm">{t.nome}</p>
              {t.ano && <p className="text-primary-200 text-xs mt-0.5">{t.ano}</p>}</>
          : <p className="text-white font-semibold text-sm">Testemunhos de vida</p>}
      </Link>
    </div>
  );
}

/* ── Banner section (Olivais-style: full-width image + white box + red bar) ── */
function Banner({ imageSrc, title, subtitle, href, height = '380px', objectFit = 'object-contain' }) {
  return (
    <Link to={href} className="relative block group overflow-hidden bg-white border border-gray-100" style={{ height }}>
      <img src={imageSrc} alt={title} loading="lazy" decoding="async"
        className={`absolute inset-0 w-full h-full ${objectFit} transition-transform duration-700 group-hover:scale-105 will-change-transform`} />

      {/* centred label box */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16">
        <div className="w-1/4 text-center">
          <div className="bg-white/60 px-6 py-4 backdrop-blur-sm">
            <span className="text-primary-700 font-bold text-2xl uppercase tracking-widest whitespace-nowrap font-serif">
              {title}
            </span>
          </div>
          {subtitle && (
            <div className="bg-primary-700/60 px-6 py-2.5 backdrop-blur-sm">
              <span className="text-white text-sm font-medium tracking-wide">{subtitle}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ── Half-card (Reitor / Um Dia) ───────────────────────────────────────────── */
function HalfCard({ imageSrc, label, href }) {
  return (
    <Link to={href} className="relative block group overflow-hidden bg-white border border-gray-100" style={{ height: '340px' }}>
      <img src={imageSrc} alt={label} loading="lazy" decoding="async"
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 will-change-transform" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/4 bg-primary-700/60 py-4 px-6 text-center backdrop-blur-sm">
        <span className="text-white font-bold text-sm uppercase tracking-widest">{label}</span>
      </div>
    </Link>
  );
}

/* ── Divider ───────────────────────────────────────────────────────────────── */
function Div() { return <div className="h-10 bg-gray-100" />; }

/* ── Main page ─────────────────────────────────────────────────────────────── */
export default function Home() {
  const { data: noticiaData } = useApi(() => publicAPI.getNoticias({ destaque: true }));
  const noticias = noticiaData?.noticias || [];
  const hp = useConteudo('homepage', DEFAULTS);

  const citacao       = hp.citacao       || DEFAULTS.citacao;
  const heroSubtitulo = hp.hero_subtitulo || DEFAULTS.hero_subtitulo;
  const heroTitulo    = hp.hero_titulo    || DEFAULTS.hero_titulo;
  const heroImagens   = [hp.hero_imagem_1, hp.hero_imagem_2].filter(Boolean);

  return (
    <div>
      <SocialSidebar />

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <HeroSlider subtitulo={heroSubtitulo} titulo={heroTitulo} imagens={heroImagens} />

      {/* ── 2. Citação ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-10 h-0.5 bg-primary-600 mx-auto mb-6" />
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic font-serif">
            {citacao}
          </p>
          <div className="w-10 h-0.5 bg-primary-600 mx-auto mt-6" />
        </div>
      </section>

      <Div />

      {/* ── 3. Notícias + Testemunhos ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
        <NewsSlider noticias={noticias} />
        <TestemunhosSlider />
      </div>

      <Div />

      {/* ── 4. Comunidade ──────────────────────────────────────────────────── */}
      <Banner
        imageSrc={hp.imagem_comunidade || '/images/comunidade.svg'}
        title="Comunidade"
        subtitle="2025/2026"
        href="/comunidade"
        height="700px"
        objectFit="object-cover"
      />

      <Div />

      {/* ── 5. Formação ────────────────────────────────────────────────────── */}
      <Banner
        imageSrc={hp.imagem_formacao || '/images/formacao.svg'}
        title="Formação"
        subtitle="Linhas orientadoras"
        href="/formacao"
        height="700px"
        objectFit="object-cover"
      />

      <Div />

      {/* ── 6. Como Ajudar ─────────────────────────────────────────────────── */}
      <Banner
        imageSrc={hp.imagem_ajudar || '/images/ajudar.svg'}
        title="Como Ajudar?"
        subtitle="Quero ajudar o Seminário"
        href="/ajudar"
        height="700px"
        objectFit="object-cover"
      />

      <Div />

      {/* ── 7. Reitor + Um Dia ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
        <HalfCard
          imageSrc={hp.imagem_reitor || '/images/reitor.svg'}
          label="Mensagem do Reitor"
          href="/seminario"
        />
        <HalfCard
          imageSrc={hp.imagem_um_dia || '/images/um-dia.svg'}
          label="Um Dia no Seminário"
          href="/seminario"
        />
      </div>
    </div>
  );
}
