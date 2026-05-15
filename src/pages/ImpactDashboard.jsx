import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, TrendingUp, Package, Star, ShieldCheck } from 'lucide-react';

export default function ImpactDashboard() {
  const { listings, orders } = useAppContext();
  
  // Mock Stats calculation
  const totalFarmers = new Set(listings.map(l => l.farmerId)).size || 156;
  const totalKgTraded = orders.reduce((sum, order) => sum + order.quantity, 0) + 12500;
  // Let's assume delala (middleman) takes a 30% cut. So savings = total * 0.3
  const baseOrderValue = orders.reduce((sum, order) => sum + order.totalPrice, 0) + 450000;
  const totalBirrSaved = Math.floor(baseOrderValue * 0.3);

  // Mock Top Farmers for Ratings section
  const topFarmers = [
    { id: 1, name: 'Abebe Bikila', region: 'Oromia', rating: 4.9, reviews: 124, activeSince: 'Jan 2024', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80' },
    { id: 2, name: 'Tirunesh Dibaba', region: 'SNNPR', rating: 4.8, reviews: 98, activeSince: 'Feb 2024', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf3c4?w=500&q=80' },
    { id: 3, name: 'Haile Gebrselassie', region: 'Amhara', rating: 4.9, reviews: 156, activeSince: 'Nov 2023', image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=500&q=80' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Impact</h1>
        <p className="text-xl text-slate-600">
          See how AgriGate is transforming the agricultural supply chain in Ethiopia by eliminating middlemen and empowering farmers.
        </p>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Users className="h-32 w-32 text-blue-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">{totalFarmers.toLocaleString()}</h3>
            <p className="text-lg font-medium text-blue-800">Farmers Connected</p>
            <p className="text-sm text-blue-600 mt-2">Growing their businesses directly.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <TrendingUp className="h-32 w-32 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">{totalBirrSaved.toLocaleString()}</h3>
            <p className="text-lg font-medium text-emerald-800">ETB Saved</p>
            <p className="text-sm text-emerald-600 mt-2">Vs traditional Delala prices.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Package className="h-32 w-32 text-amber-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6 text-amber-600">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="text-5xl font-bold text-slate-900 mb-2">{totalKgTraded.toLocaleString()}</h3>
            <p className="text-lg font-medium text-amber-800">Kg of Produce Traded</p>
            <p className="text-sm text-amber-600 mt-2">Fresh farm-to-table deliveries.</p>
          </div>
        </div>
      </div>

      {/* Top Rated Farmers */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Top Rated Farmers</h2>
            <p className="text-slate-500 mt-1">Trust is built on quality and consistency.</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-medium text-sm border border-emerald-100">
            <ShieldCheck className="h-4 w-4" />
            100% Verified Reviews
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topFarmers.map(farmer => (
            <div key={farmer.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-hover flex flex-col items-center text-center">
              <img src={farmer.image} alt={farmer.name} className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-slate-50" />
              <h3 className="text-xl font-bold text-slate-900">{farmer.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{farmer.region}</p>
              
              <div className="flex items-center gap-1 mb-2 text-amber-400">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <span className="text-slate-700 font-bold ml-1">{farmer.rating}</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">Based on {farmer.reviews} reviews</p>
              
              <div className="w-full mt-auto pt-4 border-t border-slate-100 text-sm text-slate-500 flex justify-between">
                <span>Active since</span>
                <span className="font-medium text-slate-900">{farmer.activeSince}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
