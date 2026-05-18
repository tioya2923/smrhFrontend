import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center font-bold text-lg text-white">✝</div>
              <div>
                <div className="font-bold text-white">Seminário Maior</div>
                <div className="text-sm text-primary-300">de Cristo Rei</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Formando sacerdotes ao serviço de Deus e da Igreja em Angola desde 1954.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Instituição</h4>
            <ul className="space-y-2 text-sm">
              {[['O Seminário', '/seminario'], ['Formação', '/formacao'], ['Comunidade', '/comunidade'], ['Blog', '/noticias']].map(([l, h]) => (
                <li key={h}><Link to={h} className="hover:text-primary-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Apoio */}
          <div>
            <h4 className="text-white font-semibold mb-4">Apoie-nos</h4>
            <ul className="space-y-2 text-sm">
              {[['Deus Chama-me?', '/vocacao'], ['Como Ajudar', '/ajudar'], ['Apadrinhamento', '/ajudar#apadrinhamento'], ['Pedido de Oração', '/ajudar#oracao']].map(([l, h]) => (
                <li key={h}><Link to={h} className="hover:text-primary-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-primary-400 shrink-0" /><span>Av. da República, Huambo, Angola</span></li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-primary-400 shrink-0" /><a href="tel:+244xxxxxxxxx" className="hover:text-primary-400">+244 xxx xxx xxx</a></li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-primary-400 shrink-0" /><a href="mailto:info@cristorei.ao" className="hover:text-primary-400">info@cristorei.ao</a></li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Seminário Maior de Cristo Rei — Huambo, Angola</p>
          <div className="flex gap-4">
            <Link to="/privacidade" className="hover:text-gray-400">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-gray-400">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
