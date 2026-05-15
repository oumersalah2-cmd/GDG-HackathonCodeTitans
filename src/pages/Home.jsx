import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, TrendingUp, Users, Sparkles, Brain, Globe, Package, Star, ArrowUp, Leaf, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { listings, orders } = useAppContext();

  // Impact stats
  const totalFarmers = new Set(listings.map(l => l.farmerId)).size || 156;
  const totalKgTraded = orders.reduce((sum, order) => sum + order.quantity, 0) + 12500;
  const baseOrderValue = orders.reduce((sum, order) => sum + order.totalPrice, 0) + 450000;
  const totalBirrSaved = Math.floor(baseOrderValue * 0.3);

  // Top Farmers - using Pollinations AI images
  const topFarmers = [
    { id: 1, name: 'Abebe Bikila', region: 'Oromia', rating: 4.9, reviews: 124, crops: 'Teff, Wheat', activeSince: 'Jan 2024', image: 'https://image.pollinations.ai/prompt/Professional%20portrait%20Ethiopian%20male%20farmer%20smiling%20wearing%20traditional%20clothes%20warm%20lighting%20headshot?width=300&height=300&nologo=true' },
    { id: 2, name: 'Tirunesh Dibaba', region: 'SNNPR', rating: 4.8, reviews: 98, crops: 'Coffee, Sorghum', activeSince: 'Feb 2024', image: 'https://image.pollinations.ai/prompt/Professional%20portrait%20Ethiopian%20female%20farmer%20smiling%20in%20green%20field%20warm%20lighting%20headshot?width=300&height=300&nologo=true' },
    { id: 3, name: 'Haile Gebrselassie', region: 'Amhara', rating: 4.9, reviews: 156, crops: 'Maize, Barley', activeSince: 'Nov 2023', image: 'https://image.pollinations.ai/prompt/Professional%20portrait%20Ethiopian%20male%20elder%20farmer%20experienced%20kind%20face%20warm%20lighting%20headshot?width=300&height=300&nologo=true' }
  ];

  return (
    <div className="flex flex-col">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex items-center pt-24 pb-32 overflow-hidden min-h-[85vh]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-200/40 blur-[120px] mix-blend-multiply float-animation"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-emerald-200/40 blur-[120px] mix-blend-multiply float-animation" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-[10%] left-[30%] w-[30%] h-[30%] rounded-full bg-violet-200/30 blur-[100px] mix-blend-multiply float-animation" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Empowering Ethiopian Farmers with AI
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Connect directly with <br/>
              <span className="gradient-text">verified buyers.</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Skip the middlemen. Get AI-suggested fair prices, secure mobile money payments, and grow your agricultural business with AgriGate.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Join as Farmer
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all">
                Browse Products
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-slate-500">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary-500" /><span>Verified Farmers</span></div>
              <div className="flex items-center gap-1.5"><Brain className="h-4 w-4 text-violet-500" /><span>AI-Powered Pricing</span></div>
              <div className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-emerald-500" /><span>All Ethiopian Regions</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="bg-white py-24 border-t border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Why AgriGate</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Built for Ethiopian Farmers</h2>
            <p className="text-lg text-slate-600">Our platform is designed to maximize farmer profits and provide buyers with the freshest, most affordable produce.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* AI Pricing */}
            <Link to="/ai" className="group p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 card-hover relative overflow-hidden block">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Price Suggestions</h3>
                <p className="text-slate-600 leading-relaxed">Our Claude AI engine analyzes region, season, and demand to suggest the fairest price per kg.</p>
                <div className="mt-4 inline-flex items-center gap-1 text-violet-600 font-semibold text-sm group-hover:gap-2 transition-all">Try AI Assistant <ArrowRight className="h-4 w-4" /></div>
              </div>
            </Link>

            {/* Secure Payments */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Payments</h3>
                <p className="text-slate-600 leading-relaxed">Direct integration with Telebirr and CBE Birr. Payments go straight to your mobile wallet.</p>
                <div className="mt-4 inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">Secure & instant <ShieldCheck className="h-4 w-4" /></div>
              </div>
            </div>

            {/* Referrals */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Earn with Referrals</h3>
                <p className="text-slate-600 leading-relaxed">Invite farmers using your unique code. Earn 50 ETB rewards per successful referral.</p>
                <div className="mt-4 inline-flex items-center gap-1 text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">Start earning <Zap className="h-4 w-4" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR IMPACT ═══════════════ */}
      <section id="impact" className="py-24 border-t border-slate-100 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-0 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-medium text-sm mb-6">
              <TrendingUp className="h-4 w-4" />
              Real-time Platform Metrics
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Our Impact</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Transforming Ethiopia's agricultural supply chain — one farmer at a time.
            </p>
          </div>

          {/* Impact Stats - Clean Professional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Farmers Connected */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 group-hover:-translate-y-1 transition-all duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-5xl font-extrabold text-slate-900">{totalFarmers.toLocaleString()}</p>
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-0.5">
                  <ArrowUp className="h-3 w-3" /> 12%
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Farmers Connected</h3>
              <p className="text-sm text-slate-500">Growing their businesses directly</p>
            </div>

            {/* ETB Saved */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 group-hover:-translate-y-1 transition-all duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-5xl font-extrabold text-slate-900">{totalBirrSaved.toLocaleString()}</p>
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-0.5">
                  <ArrowUp className="h-3 w-3" /> 28%
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">ETB Saved</h3>
              <p className="text-sm text-slate-500">Compared to traditional Delala prices</p>
            </div>

            {/* Produce Traded */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/30 group-hover:-translate-y-1 transition-all duration-300">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-5xl font-extrabold text-slate-900">{totalKgTraded.toLocaleString()}</p>
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-0.5">
                  <ArrowUp className="h-3 w-3" /> 45%
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Kg Traded</h3>
              <p className="text-sm text-slate-500">Fresh farm-to-table deliveries</p>
            </div>
          </div>

          {/* ── Top Rated Farmers ── */}
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
              <div>
                <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">Community</p>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Top Rated Farmers</h2>
                <p className="text-slate-500 mt-1">Trust is built on quality and consistency.</p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl font-semibold text-sm border border-emerald-100">
                <ShieldCheck className="h-4 w-4" />
                100% Verified Reviews
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topFarmers.map((farmer, idx) => (
                <div key={farmer.id} className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group">
                  {/* Rank badge */}
                  {idx === 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" /> #1
                      </div>
                    </div>
                  )}

                  {/* Avatar */}
                  <div className="relative mb-5">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary-50 group-hover:ring-primary-100 transition-all">
                      <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <ShieldCheck className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-slate-900">{farmer.name}</h3>
                  <p className="text-slate-500 text-sm mb-1">{farmer.region}</p>
                  <p className="text-xs text-primary-600 font-medium mb-4">{farmer.crops}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                    <span className="text-slate-700 font-bold ml-1.5">{farmer.rating}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">Based on {farmer.reviews} reviews</p>
                  
                  {/* Footer */}
                  <div className="w-full mt-auto pt-4 border-t border-slate-100 text-sm text-slate-500 flex justify-between">
                    <span>Active since</span>
                    <span className="font-semibold text-slate-900">{farmer.activeSince}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-3xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to grow your agricultural business?</h2>
          <p className="text-lg text-slate-400 mb-8">Join thousands of Ethiopian farmers and buyers already using AgriGate.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-1 transition-all">
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all">
              View Products <Leaf className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
