import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, MapPin, Package, Star, ArrowUpDown, Leaf, ShieldCheck, ArrowRight, Filter, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Products() {
  const { user, listings } = useAppContext();
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const activeListings = listings.filter(l => l.status === 'active');

  const filteredListings = useMemo(() => {
    let filtered = activeListings.filter(l => {
      const matchesType = filterType === 'All' || l.cropType === filterType;
      const matchesSearch = l.cropType.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase()) || l.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
    if (sortBy === 'price-low') filtered.sort((a, b) => a.pricePerKg - b.pricePerKg);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.pricePerKg - a.pricePerKg);
    else filtered.sort((a, b) => b.id - a.id);
    return filtered;
  }, [activeListings, filterType, searchQuery, sortBy]);

  const cropTypes = ['All', ...new Set(activeListings.map(l => l.cropType))];

  // Summary stats
  const totalQuantity = activeListings.reduce((s, l) => s + l.quantity, 0);
  const avgPrice = activeListings.length ? Math.round(activeListings.reduce((s, l) => s + l.pricePerKg, 0) / activeListings.length) : 0;
  const totalFarmers = new Set(activeListings.map(l => l.farmerId)).size;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      {/* ═══════ HERO SECTION ═══════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-emerald-900 to-teal-900 pt-16 pb-24 sm:pt-20 sm:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[15%] w-72 h-72 bg-emerald-500/20 rounded-full blur-[120px] float-animation"></div>
          <div className="absolute bottom-0 right-[15%] w-80 h-80 bg-primary-500/15 rounded-full blur-[120px] float-animation" style={{animationDelay:'2s'}}></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-200 font-medium text-sm mb-6">
            <Leaf className="h-4 w-4" /> Fresh from Ethiopian Farms
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Farm-Fresh <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-primary-300 to-teal-300">Products</span>
          </h1>
          <p className="text-lg text-emerald-200/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Browse verified produce listings directly from Ethiopian farmers. Fair prices, fresh quality, zero middlemen.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-3xl font-extrabold text-white">{activeListings.length}</p>
              <p className="text-xs text-emerald-200/70 font-medium mt-1">Products</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-3xl font-extrabold text-white">{totalFarmers}</p>
              <p className="text-xs text-emerald-200/70 font-medium mt-1">Farmers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-3xl font-extrabold text-white">{totalQuantity}<span className="text-lg text-emerald-300/50">kg</span></p>
              <p className="text-xs text-emerald-200/70 font-medium mt-1">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CONTENT ═══════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">

        {/* ── Search & Filters Card ── */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl p-5 sm:p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Search className="h-5 w-5" /></div>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all text-sm" placeholder="Search by crop, location, or farmer name..." />
            </div>
            {/* Sort */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><ArrowUpDown className="h-4 w-4" /></div>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="pl-9 pr-10 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 bg-slate-50 text-slate-900 text-sm font-medium transition-all appearance-none cursor-pointer">
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                </select>
              </div>
            </div>
          </div>
          {/* Crop Filter Pills */}
          <div className="flex items-center gap-2 mt-4">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {cropTypes.map(type => (
                <button key={type} onClick={() => setFilterType(type)} className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all text-sm ${filterType === type ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results Count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredListings.length}</span> of {activeListings.length} products
          </p>
          {filterType !== 'All' && (
            <button onClick={() => setFilterType('All')} className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors">
              Clear filter ×
            </button>
          )}
        </div>

        {/* ── Product Grid ── */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">No products found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing, idx) => (
              <div key={listing.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img
                    src={listing.image}
                    alt={listing.cropType}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md">
                      <span className="text-sm font-extrabold text-primary-700">{listing.pricePerKg}</span>
                      <span className="text-xs text-slate-500 ml-0.5">ETB/kg</span>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </div>
                  </div>

                  {/* Ranking Badge for top items */}
                  {idx === 0 && filterType === 'All' && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                        <Star className="h-3 w-3 fill-current" /> Popular
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-grow flex flex-col">
                  {/* Title & Location */}
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-slate-900 leading-tight">{listing.cropType}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {listing.location}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Package className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-medium">{listing.quantity} kg</span>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-medium text-emerald-600">{listing.pricePerKg} ETB/kg</span>
                  </div>

                  {/* Farmer Info */}
                  <div className="flex items-center gap-2.5 py-3 mt-auto border-t border-slate-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {listing.farmerName?.charAt(0) || 'F'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{listing.farmerName}</p>
                      <p className="text-xs text-slate-400">Verified Farmer</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {user && user.role === 'buyer' ? (
                    <Link to="/marketplace" className="mt-3 w-full py-2.5 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/20 transition-all flex justify-center items-center gap-2">
                      Buy Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : !user ? (
                    <Link to="/register" className="mt-3 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all text-center flex justify-center items-center gap-2">
                      Sign Up to Buy <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="mt-16 bg-gradient-to-br from-primary-50 via-emerald-50 to-teal-50 rounded-3xl border border-primary-100 p-8 sm:p-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 font-medium text-xs mb-4">
            <Sparkles className="h-3.5 w-3.5" /> AI-Powered Platform
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">Are you a farmer?</h3>
          <p className="text-slate-600 max-w-lg mx-auto mb-6">
            List your produce on AgriGate and reach thousands of verified buyers. Get AI-powered fair price suggestions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2">
              Start Selling <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/ai" className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2">
              Try AI Pricing <Sparkles className="h-5 w-5 text-violet-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
