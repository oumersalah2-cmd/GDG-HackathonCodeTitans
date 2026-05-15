import { useAppContext } from '../context/AppContext';
import { Package, ArrowRight, CreditCard, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BuyerDashboard() {
  const { user, orders } = useAppContext();
  
  const buyerOrders = orders.filter(o => o.buyerId === user.id).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Buyer Dashboard</h1>
          <p className="text-slate-500">{user.businessName} • {user.subCity}</p>
        </div>
        <Link 
          to="/marketplace"
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Package className="h-5 w-5" />
          Browse Marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 font-medium mb-1">Total Orders</h3>
          <p className="text-3xl font-bold text-slate-900">{buyerOrders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 font-medium mb-1">Total Spent (ETB)</h3>
          <p className="text-3xl font-bold text-slate-900">
            {buyerOrders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 font-medium mb-1">Monthly Goal</h3>
          <div className="mt-2 relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
              <div style={{ width: "45%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
            </div>
            <p className="text-sm text-slate-500 text-right">45% of {user.volume}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-4">Transaction History</h2>
      {buyerOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 mb-4">You haven't placed any orders yet.</p>
          <Link to="/marketplace" className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700">
            Go to Marketplace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Produce</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Total Price</th>
                  <th className="p-4 font-medium">Payment</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {buyerOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">#{order.id.toString().slice(-6)}</p>
                          <p className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-900">{order.cropType}</p>
                      <p className="text-xs text-slate-500">From Farmer ID: {order.farmerId}</p>
                    </td>
                    <td className="p-4 text-slate-700">{order.quantity} kg</td>
                    <td className="p-4 font-bold text-slate-900">{order.totalPrice.toLocaleString()} ETB</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-slate-600 capitalize">
                        <CreditCard className="h-4 w-4" /> {order.paymentMethod}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
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
