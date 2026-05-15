import { useAppContext } from '../context/AppContext';
import { Package, ArrowRight, CreditCard, Calendar, Store, TrendingUp, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BuyerDashboard() {
  const { user, orders } = useAppContext();
  
  const buyerOrders = orders.filter(o => o.buyerId === user.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalSpent = buyerOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-1">Dashboard</p>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Buyer Dashboard</h1>
          <p className="text-slate-500 mt-1">
            {user.businessName || user.name}{user.subCity ? ` • ${user.subCity}` : ''}
          </p>
        </div>
        <Link 
          to="/marketplace"
          className="bg-gradient-to-r from-primary-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Store className="h-5 w-5" />
          Browse Marketplace
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Total</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{buyerOrders.length}</p>
          <p className="text-sm text-slate-500 mt-1">Total Orders</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">ETB</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalSpent.toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">Total Spent</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Package className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Goal</span>
          </div>
          <div className="mt-1">
            <div className="overflow-hidden h-2.5 mb-2 flex rounded-full bg-slate-100">
              <div style={{ width: "45%" }} className="rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 transition-all duration-500"></div>
            </div>
            <p className="text-sm text-slate-500">45% of {user.volume || 'your target'}</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
        Transaction History
        <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">{buyerOrders.length}</span>
      </h2>
      {buyerOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-slate-500 mb-2 font-medium">You haven't placed any orders yet.</p>
          <Link to="/marketplace" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors mt-2">
            Go to Marketplace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">Produce</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Total Price</th>
                  <th className="p-4 font-semibold">Payment</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {buyerOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="font-semibold text-slate-900">#{order.id.toString().slice(-6)}</p>
                          <p className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{order.cropType}</p>
                    </td>
                    <td className="p-4 text-slate-700 font-medium">{order.quantity} kg</td>
                    <td className="p-4 font-bold text-slate-900">{order.totalPrice.toLocaleString()} ETB</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 capitalize">
                        <CreditCard className="h-4 w-4" /> {order.paymentMethod}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
