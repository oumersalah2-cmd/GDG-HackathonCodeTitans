import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="bg-gradient-to-br from-primary-500 to-emerald-500 p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">Agri<span className="text-primary-400">Gate</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Connecting Ethiopian farmers directly with buyers. AI-powered pricing, secure payments, zero middlemen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group">Products <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/ai" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group">AI Assistant <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/marketplace" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group">Marketplace <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Account</h4>
            <ul className="space-y-3">
              <li><Link to="/register" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group">Register <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group">Login <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm"><Mail className="h-4 w-4 text-slate-500" /> info@agrigate.et</li>
              <li className="flex items-center gap-2 text-slate-400 text-sm"><Phone className="h-4 w-4 text-slate-500" /> +251 911 123 456</li>
              <li className="flex items-center gap-2 text-slate-400 text-sm"><MapPin className="h-4 w-4 text-slate-500" /> Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} AgriGate. All rights reserved.</p>
          <p className="text-sm text-slate-500 flex items-center gap-1">Made with <Heart className="h-3.5 w-3.5 text-red-400 fill-current" /> for Ethiopian Farmers</p>
        </div>
      </div>
    </footer>
  );
}
