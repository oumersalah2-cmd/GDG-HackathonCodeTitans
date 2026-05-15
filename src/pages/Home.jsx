import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, TrendingUp, Users, Sparkles, Brain, ChevronRight, Globe, Package, Star, ArrowUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { listings, orders } = useAppContext();

  // Impact stats
  const totalFarmers = new Set(listings.map(l => l.farmerId)).size || 156;
  const totalKgTraded = orders.reduce((sum, order) => sum + order.quantity, 0) + 12500;
  const baseOrderValue = orders.reduce((sum, order) => sum + order.totalPrice, 0) + 450000;
  const totalBirrSaved = Math.floor(baseOrderValue * 0.3);

  // Top Farmers
  const topFarmers = [
    { id: 1, name: 'Abebe Bikila', region: 'Oromia', rating: 4.9, reviews: 124, activeSince: 'Jan 2024', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80' },
    { id: 2, name: 'Tirunesh Dibaba', region: 'SNNPR', rating: 4.8, reviews: 98, activeSince: 'Feb 2024', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf3c4?w=500&q=80' },
    { id: 3, name: 'Haile Gebrselassie', region: 'Amhara', rating: 4.9, reviews: 156, activeSince: 'Nov 2023', image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=500&q=80' }
  ];

  return (
    <div className="flex flex-col">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex items-center pt-24 pb-32 overflow-hidden min-h-[85vh]">
        {/* Animated background */}
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
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all">
                I want to buy produce
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary-500" />
                <span>Verified Farmers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Brain className="h-4 w-4 text-violet-500" />
                <span>AI-Powered Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-emerald-500" />
                <span>All Ethiopian Regions</span>
              </div>
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
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Price Suggestions</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our Claude AI engine analyzes region, season, and demand to suggest the fairest price per kg, ensuring you never undersell.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-violet-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Secure Payments */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Payments</h3>
                <p className="text-slate-600 leading-relaxed">
                  Direct integration with Telebirr and CBE Birr. Payments go straight to your mobile wallet—no cash, no middlemen.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="h-4 w-4" />
                </div>
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
                <p className="text-slate-600 leading-relaxed">
                  Invite other farmers to join using your unique code. Earn 50 ETB rewards when they complete their registration.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ IMPACT STATS ═══════════════ */}
      <section id="impact" className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-medium text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              Real-time Platform Metrics
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Our Impact</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              See how AgriGate is transforming the agricultural supply chain in Ethiopia by eliminating middlemen and empowering farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="h-32 w-32 text-blue-500" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-end gap-3 mb-2">
                  <h3 className="text-5xl font-extrabold text-slate-900">{totalFarmers.toLocaleString()}</h3>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg mb-1.5 flex items-center gap-0.5">
                    <ArrowUp className="h-3 w-3" /> 12%
                  </span>
                </div>
                <p className="text-lg font-semibold text-blue-800">Farmers Connected</p>
                <p className="text-sm text-blue-600 mt-1">Growing their businesses directly.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="h-32 w-32 text-emerald-500" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-end gap-3 mb-2">
                  <h3 className="text-5xl font-extrabold text-slate-900">{totalBirrSaved.toLocaleString()}</h3>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg mb-1.5 flex items-center gap-0.5">
                    <ArrowUp className="h-3 w-3" /> 28%
                  </span>
                </div>
                <p className="text-lg font-semibold text-emerald-800">ETB Saved</p>
                <p className="text-sm text-emerald-600 mt-1">Vs traditional Delala prices.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-100 shadow-sm relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Package className="h-32 w-32 text-amber-500" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-end gap-3 mb-2">
                  <h3 className="text-5xl font-extrabold text-slate-900">{totalKgTraded.toLocaleString()}</h3>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg mb-1.5 flex items-center gap-0.5">
                    <ArrowUp className="h-3 w-3" /> 45%
                  </span>
                </div>
                <p className="text-lg font-semibold text-amber-800">Kg of Produce Traded</p>
                <p className="text-sm text-amber-600 mt-1">Fresh farm-to-table deliveries.</p>
              </div>
            </div>
          </div>

          {/* Top Rated Farmers */}
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Top Rated Farmers</h2>
                <p className="text-slate-500 mt-1">Trust is built on quality and consistency.</p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl font-semibold text-sm border border-emerald-100">
                <ShieldCheck className="h-4 w-4" />
                100% Verified Reviews
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topFarmers.map(farmer => (
                <div key={farmer.id} className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <img src={farmer.image} alt={farmer.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-50" />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center border-2 border-white">
                      <ShieldCheck className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{farmer.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{farmer.region}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                    <span className="text-slate-700 font-bold ml-1.5">{farmer.rating}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">Based on {farmer.reviews} reviews</p>
                  
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

      {/* ═══════════════ FOOTER CTA ═══════════════ */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-3xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to grow your agricultural business?</h2>
          <p className="text-lg text-slate-400 mb-8">Join thousands of Ethiopian farmers and buyers already using AgriGate.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-emerald-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-1 transition-all">
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
