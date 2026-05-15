import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, MapPin, Check, Star, Package, ArrowRight } from 'lucide-react';

export default function Marketplace() {
  const { user, listings, placeOrder } = useAppContext();
  
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedListing, setSelectedListing] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const activeListings = listings.filter(l => l.status === 'active');

  const filteredListings = useMemo(() => {
    return activeListings.filter(l => {
      const matchesType = filterType === 'All' || l.cropType === filterType;
      const matchesSearch = l.cropType.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            l.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [activeListings, filterType, searchQuery]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!orderQuantity || !selectedListing) return;

    placeOrder({
      buyerId: user.id,
      buyerName: user.name || user.businessName,
      listingId: selectedListing.id,
      farmerId: selectedListing.farmerId,
      cropType: selectedListing.cropType,
      quantity: Number(orderQuantity),
      totalPrice: Number(orderQuantity) * selectedListing.pricePerKg,
      paymentMethod
    });

    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedListing(null);
      setOrderQuantity('');
      setPaymentAccount('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Marketplace</h1>
          <p className="text-slate-500 mt-1">Find the freshest produce directly from verified farmers.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-medium text-sm border border-emerald-100">
          <Package className="h-4 w-4" />
          {activeListings.length} listings available
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm text-slate-900 transition-all"
            placeholder="Search by crop or location..."
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Teff', 'Coffee', 'Wheat', 'Maize'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-5 py-3.5 rounded-2xl font-semibold whitespace-nowrap transition-all text-sm ${
                filterType === type 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredListings.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No listings found matching your criteria.</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter.</p>
          </div>
        ) : (
          filteredListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="h-40 overflow-hidden relative">
                <img src={listing.image} alt={listing.cropType} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900">{listing.cropType}</h3>
                  <span className="font-bold text-primary-600">{listing.pricePerKg} ETB/kg</span>
                </div>
                <div className="text-sm text-slate-500 mb-4 space-y-1">
                  <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {listing.location}</p>
                  <p>Farmer: {listing.farmerName}</p>
                  <p>Qty: {listing.quantity} kg</p>
                </div>
                <button 
                  onClick={() => setSelectedListing(listing)}
                  className="mt-auto w-full py-2.5 bg-slate-100 hover:bg-primary-600 hover:text-white text-slate-700 rounded-xl font-semibold transition-all duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200/50 relative">
            {orderSuccess ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Placed!</h3>
                <p className="text-slate-500">Your payment has been secured and the farmer has been notified.</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Complete Order</h3>
                    <p className="text-sm text-slate-500">Secure payment via mobile money</p>
                  </div>
                  <button onClick={() => setSelectedListing(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors text-xl leading-none">&times;</button>
                </div>
                
                <form onSubmit={handlePlaceOrder} className="p-6 space-y-5">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                    <img src={selectedListing.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="" />
                    <div>
                      <h4 className="font-bold text-slate-900">{selectedListing.cropType}</h4>
                      <p className="text-sm text-slate-500">{selectedListing.pricePerKg} ETB / kg • {selectedListing.farmerName}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quantity (kg) <span className="text-slate-400 font-normal">Max: {selectedListing.quantity}</span></label>
                    <input type="number" required max={selectedListing.quantity} value={orderQuantity} onChange={e => setOrderQuantity(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all" placeholder="Enter quantity" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div onClick={() => setPaymentMethod('telebirr')} className={`border-2 rounded-xl p-3.5 cursor-pointer flex flex-col items-center gap-2 transition-all ${paymentMethod === 'telebirr' ? 'border-primary-500 bg-primary-50 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">TB</div>
                        <span className="text-sm font-semibold">Telebirr</span>
                      </div>
                      <div onClick={() => setPaymentMethod('cbe')} className={`border-2 rounded-xl p-3.5 cursor-pointer flex flex-col items-center gap-2 transition-all ${paymentMethod === 'cbe' ? 'border-primary-500 bg-primary-50 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">CBE</div>
                        <span className="text-sm font-semibold">CBE Birr</span>
                      </div>
                    </div>
                    <input type="text" required value={paymentAccount} onChange={e => setPaymentAccount(e.target.value)} placeholder={paymentMethod === 'telebirr' ? 'Enter Telebirr Number (e.g. 0911...)' : 'Enter CBE Account Number'} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-sm text-slate-900 transition-all" />
                  </div>

                  <div className="border-t border-slate-100 pt-5 flex justify-between items-end">
                    <div>
                      <p className="text-sm text-slate-500">Total Amount</p>
                      <p className="text-3xl font-extrabold text-slate-900">
                        {orderQuantity ? (Number(orderQuantity) * selectedListing.pricePerKg).toLocaleString() : 0} <span className="text-lg font-bold text-slate-400">ETB</span>
                      </p>
                    </div>
                    <button type="submit" disabled={!orderQuantity || Number(orderQuantity) <= 0 || Number(orderQuantity) > selectedListing.quantity || !paymentAccount.trim()} className="px-6 py-3.5 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                      Pay Now
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
