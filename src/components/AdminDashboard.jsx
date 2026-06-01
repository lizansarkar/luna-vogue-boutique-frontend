import React, { useState } from 'react';

export default function AdminDashboard({ products }) {
  // Mock Orders Data
  const [orders, setOrders] = useState([
    { id: 'LV-983103', customer: 'Sarah Jenkins', date: '2026-06-01', total: 330.00, status: 'Shipped', items: 'Silk Slip Dress (1), Silk Cami (1)' },
    { id: 'LV-482012', customer: 'Emma Watson', date: '2026-06-01', total: 180.00, status: 'Processing', items: 'Wool Tailored Blazer (1)' },
    { id: 'LV-729401', customer: 'Clara Oswald', date: '2026-05-31', total: 290.00, status: 'Pending', items: 'Linen Summer Dress (1), Oversized Shirt (1)' },
    { id: 'LV-103984', customer: 'Helena Carter', date: '2026-05-30', total: 420.00, status: 'Shipped', items: 'Cashmere Sweater (2)' },
  ]);

  // Inventory Management State
  const [inventory, setInventory] = useState(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.inStock ? Math.floor(5 + Math.random() * 15) : 0,
    }))
  );

  const handleRestock = (productId) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === productId 
          ? { ...item, stock: item.stock + 5 } 
          : item
      )
    );
  };

  const handleToggleOut = (productId) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === productId 
          ? { ...item, stock: item.stock === 0 ? 10 : 0 } 
          : item
      )
    );
  };

  // High-Level Analytics Calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 13800.00;
  const activeOrdersCount = orders.filter((o) => o.status !== 'Shipped').length;
  const conversionRate = '3.64%';
  const totalStockCount = inventory.reduce((acc, i) => acc + i.stock, 0);

  return (
    <div className="py-12 bg-[#F8F5F2] font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Dashboard Header */}
        <div className="border-b border-brand-charcoal/10 pb-6 mb-10">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold block mb-1">Boutique Backend</span>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal">
            Operational Dashboard
          </h1>
        </div>

        {/* ANALYTICS STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Revenue */}
          <div className="bg-white p-6 border border-brand-charcoal/5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-brand-charcoal/40 font-bold block mb-1">
                Accumulated Revenue
              </span>
              <span className="text-2xl font-bold text-brand-charcoal font-sans">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <span className="text-[10px] text-green-600 mt-4 inline-flex items-center">
              <i className="fa-solid fa-arrow-trend-up mr-1.5"></i>
              <span>+12.4% vs last cycle</span>
            </span>
          </div>

          {/* Card 2: Active Orders */}
          <div className="bg-white p-6 border border-brand-charcoal/5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-brand-charcoal/40 font-bold block mb-1">
                Active Orders Log
              </span>
              <span className="text-2xl font-bold text-brand-charcoal font-sans">
                {activeOrdersCount} Pending
              </span>
            </div>
            <span className="text-[10px] text-brand-gold mt-4">
              Requires packaging dispatch
            </span>
          </div>

          {/* Card 3: Conversion */}
          <div className="bg-white p-6 border border-brand-charcoal/5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-brand-charcoal/40 font-bold block mb-1">
                Bag Conversion Rate
              </span>
              <span className="text-2xl font-bold text-brand-charcoal font-sans">
                {conversionRate}
              </span>
            </div>
            <span className="text-[10px] text-green-600 mt-4 inline-flex items-center">
              <i className="fa-solid fa-arrow-trend-up mr-1.5"></i>
              <span>+0.8% organic growth</span>
            </span>
          </div>

          {/* Card 4: Inventory count */}
          <div className="bg-white p-6 border border-brand-charcoal/5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-brand-charcoal/40 font-bold block mb-1">
                Active Physical Stock
              </span>
              <span className="text-2xl font-bold text-brand-charcoal font-sans">
                {totalStockCount} Garments
              </span>
            </div>
            <span className="text-[10px] text-brand-charcoal/50 mt-4">
              Distributed across {inventory.length} designs
            </span>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: RECENT ORDERS TABLE (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 border border-brand-charcoal/5">
              <h3 className="font-serif text-base font-semibold tracking-wider text-brand-charcoal uppercase border-b border-brand-charcoal/10 pb-4 mb-4">
                Recent Client Purchases
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-sans text-brand-charcoal/80 border-collapse">
                  <thead>
                    <tr className="bg-brand-ivory border-b border-brand-charcoal/15 text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/50">
                      <th className="py-3 px-4 text-left">Order ID</th>
                      <th className="py-3 px-4 text-left">Recipient</th>
                      <th className="py-3 px-4 text-center">Amount</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-charcoal/5">
                    {orders.map((order) => {
                      const badgeColor = 
                        order.status === 'Shipped' ? 'bg-green-50 text-green-700 border-green-200' :
                        order.status === 'Processing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-red-50 text-red-700 border-red-200';

                      return (
                        <tr key={order.id} className="hover:bg-brand-ivory/20 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-left text-brand-charcoal">{order.id}</td>
                          <td className="py-3.5 px-4 text-left">
                            <div className="flex flex-col">
                              <span className="font-semibold text-brand-charcoal">{order.customer}</span>
                              <span className="text-[9px] text-brand-charcoal/40 mt-0.5 max-w-[180px] truncate">{order.items}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center font-semibold font-sans text-brand-charcoal">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`inline-block px-2.5 py-0.5 border text-[9px] uppercase tracking-wide font-bold rounded-none ${badgeColor}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* RIGHT: INVENTORY STOCK MANAGER (lg:col-span-1) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 border border-brand-charcoal/5">
              <h3 className="font-serif text-base font-semibold tracking-wider text-brand-charcoal uppercase border-b border-brand-charcoal/10 pb-4 mb-4">
                Active Catalog Inventory
              </h3>
              
              <div className="divide-y divide-brand-charcoal/5 space-y-3.5 max-h-[340px] overflow-y-auto pr-1 no-scrollbar">
                {inventory.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div className="flex flex-col min-w-0 max-w-[160px]">
                      <span className="font-serif text-xs font-semibold text-brand-charcoal truncate">{item.name}</span>
                      <span className="text-[9px] uppercase tracking-wider text-brand-charcoal/40 mt-0.5">{item.category}</span>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {/* Stock Count with low warning styling */}
                      <span className={`text-xs font-bold font-sans ${item.stock === 0 ? 'text-red-500' : item.stock < 5 ? 'text-amber-600' : 'text-brand-charcoal'}`}>
                        {item.stock} in stock
                      </span>
                      
                      {/* Restock trigger action button */}
                      <button
                        onClick={() => handleRestock(item.id)}
                        className="bg-brand-ivory border border-brand-charcoal/15 text-brand-charcoal hover:border-brand-gold hover:text-brand-gold p-1.5 transition-colors cursor-pointer text-[10px]"
                        title="Quick Restock (+5)"
                        aria-label="Quick Restock"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>

                      {/* Stock availability toggle */}
                      <button
                        onClick={() => handleToggleOut(item.id)}
                        className={`p-1.5 border transition-colors cursor-pointer text-[10px] ${
                          item.stock === 0
                            ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
                            : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                        }`}
                        title={item.stock === 0 ? "Mark In Stock" : "Mark Out of Stock"}
                        aria-label="Toggle Out of Stock"
                      >
                        <i className={`fa-solid ${item.stock === 0 ? 'fa-check' : 'fa-ban'}`}></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
