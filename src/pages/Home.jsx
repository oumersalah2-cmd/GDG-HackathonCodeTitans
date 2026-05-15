import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-200/50 blur-[120px] mix-blend-multiply"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-emerald-200/50 blur-[120px] mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium text-sm mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Empowering Ethiopian Farmers
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Connect directly with <br/>
              <span className="gradient-text">verified buyers.</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Skip the middlemen. Get AI-suggested fair prices, secure mobile money payments, and grow your agricultural business with AgriGate.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Join as Farmer
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all">
                I want to buy produce
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24 border-t border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why choose AgriGate?</h2>
            <p className="text-slate-600">Our platform is designed to maximize farmer profits and provide buyers with the freshest, most affordable produce.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 card-hover">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Price Suggestions</h3>
              <p className="text-slate-600 leading-relaxed">
                Our Claude AI engine analyzes region, season, and demand to suggest the fairest price per kg, ensuring you never undersell.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 card-hover">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Payments</h3>
              <p className="text-slate-600 leading-relaxed">
                Direct integration with Telebirr and CBE Birr. Payments go straight to your mobile wallet—no cash, no middlemen.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 card-hover">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Earn with Referrals</h3>
              <p className="text-slate-600 leading-relaxed">
                Invite other farmers to join using your unique code. Earn credit rewards when they complete their first successful sale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
