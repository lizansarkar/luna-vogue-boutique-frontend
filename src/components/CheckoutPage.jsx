import React, { useState } from 'react';

export default function CheckoutPage({ 
  cart, 
  onClearCart, 
  setActivePage 
}) {
  // Billing Form Credentials
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [mockOrderNumber, setMockOrderNumber] = useState('');

  // Cart Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 150 ? 0 : 15.00;
  const taxAmount = (subtotal * 8) / 100;
  const finalTotal = subtotal + shippingCost + taxAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces (e.g. 4444 4444 4444 4444)
    if (name === 'cardNumber') {
      const trimmed = value.replace(/\s?/g, '');
      if (trimmed.length > 16) return;
      const formatted = trimmed.replace(/(\d{4})/g, '$1 ').trim();
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    // Format expiry date with slash (e.g. MM/YY)
    if (name === 'cardExpiry') {
      const trimmed = value.replace(/\//g, '');
      if (trimmed.length > 4) return;
      const formatted = trimmed.length >= 2 
        ? `${trimmed.slice(0, 2)}/${trimmed.slice(2, 4)}` 
        : trimmed;
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    if (name === 'cardCvv') {
      if (value.length > 3) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Generate Mock Order ID
    const randomOrderNum = `LV-${Math.floor(100000 + Math.random() * 900000)}`;
    setMockOrderNumber(randomOrderNum);
    setCheckoutComplete(true);
  };

  const handleFinishCheckout = () => {
    onClearCart();
    setActivePage('home');
  };

  if (checkoutComplete) {
    return (
      <div className="py-20 bg-[#F8F5F2] font-sans min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 lg:p-12 border border-brand-charcoal/10 max-w-xl w-full text-center shadow-lg animate-scale-up rounded-none">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 mx-auto mb-6 border border-green-200">
            <i className="fa-solid fa-circle-check text-2xl"></i>
          </div>
          
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold block mb-1">Success</span>
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-4">Order Confirmed</h2>
          <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light mb-8">
            Thank you for purchasing with Luna Vogue. Your luxury pret-a-porter garments are being processed for signature packaging. A confirmation receipt was dispatched to <span className="font-bold">{formData.email}</span>.
          </p>

          {/* Invoice Summary Card */}
          <div className="bg-brand-ivory p-6 border border-brand-charcoal/5 mb-8 text-left space-y-3.5">
            <div className="flex justify-between text-xs text-brand-charcoal/60">
              <span>Order Reference:</span>
              <span className="font-bold text-brand-charcoal">{mockOrderNumber}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-charcoal/60">
              <span>Delivery Recipient:</span>
              <span className="font-bold text-brand-charcoal">{formData.name}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-charcoal/60 border-b border-brand-charcoal/10 pb-3">
              <span>Destination Address:</span>
              <span className="font-bold text-brand-charcoal text-right">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-brand-charcoal pt-1.5">
              <span>Total Paid Amount:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleFinishCheckout}
            className="w-full bg-brand-charcoal text-white hover:bg-brand-gold text-xs uppercase font-bold tracking-widest py-4 transition-colors duration-300 cursor-pointer rounded-none border-none"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-[#F8F5F2] font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Page Header */}
        <div className="border-b border-brand-charcoal/10 pb-6 mb-12">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold block mb-1">Checkout Funnel</span>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal">
            Secure Payment
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: SHIPPING & BILLING FORM (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Delivery Details Block */}
            <div className="bg-white p-6 md:p-8 border border-brand-charcoal/5 space-y-6">
              <h3 className="font-serif text-base font-semibold tracking-wider text-brand-charcoal uppercase border-b border-brand-charcoal/10 pb-3">
                1. Delivery Destination
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5 col-span-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Full Name</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Email Address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@example.com"
                    className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Phone Number</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 000-0000"
                    className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="flex flex-col space-y-1.5 col-span-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Street Address</label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Luxury Way Apt 4B"
                    className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">City</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Postal Code / Zip</label>
                  <input
                    type="text"
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            {/* Billing Payment Selection */}
            <div className="bg-white p-6 md:p-8 border border-brand-charcoal/5 space-y-6">
              <h3 className="font-serif text-base font-semibold tracking-wider text-brand-charcoal uppercase border-b border-brand-charcoal/10 pb-3">
                2. Payment Details
              </h3>

              {/* Toggles */}
              <div className="flex border-b border-brand-charcoal/10 pb-4 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`text-xs uppercase tracking-widest font-semibold pb-1 cursor-pointer transition-colors ${
                    paymentMethod === 'card' 
                      ? 'text-brand-gold border-b-2 border-brand-gold' 
                      : 'text-brand-charcoal/40 border-transparent hover:text-brand-gold'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`text-xs uppercase tracking-widest font-semibold pb-1 cursor-pointer transition-colors ${
                    paymentMethod === 'paypal' 
                      ? 'text-brand-gold border-b-2 border-brand-gold' 
                      : 'text-brand-charcoal/40 border-transparent hover:text-brand-gold'
                  }`}
                >
                  Paypal / Alternative
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-8">
                  
                  {/* PURE CSS PREMIUM LIVE CREDIT CARD VISUALIZER */}
                  <div className="relative w-full max-w-[340px] aspect-[1.586/1] bg-gradient-to-tr from-[#1E293B] to-[#475569] text-white p-6 shadow-xl rounded-xl mx-auto flex flex-col justify-between font-mono select-none overflow-hidden border border-white/10">
                    {/* Visual Card Chip */}
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-7 rounded-sm bg-gradient-to-r from-amber-400 to-amber-200 shadow-sm border border-amber-300/30 flex items-center justify-center">
                        <div className="w-6 h-5 border border-black/10 rounded-sm"></div>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold italic">LUNA</span>
                    </div>

                    {/* Numeric Number (spaces) */}
                    <div className="text-base tracking-[0.18em] py-4 text-center text-white/95">
                      {formData.cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    {/* Cardholder name and Expiry row */}
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col text-left">
                        <span className="text-[7px] uppercase tracking-wider text-white/40 mb-1">Cardholder</span>
                        <span className="text-xs uppercase tracking-widest text-white/90 line-clamp-1 max-w-[180px]">
                          {formData.cardName || 'JANE DOE'}
                        </span>
                      </div>
                      
                      <div className="flex flex-col text-right">
                        <span className="text-[7px] uppercase tracking-wider text-white/40 mb-1">Expiry</span>
                        <span className="text-xs text-white/90">
                          {formData.cardExpiry || 'MM/YY'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Form fields for Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="flex flex-col space-y-1.5 col-span-2">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Cardholder Name</label>
                      <input
                        type="text"
                        required={paymentMethod === 'card'}
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="Jane Doe"
                        className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold uppercase"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5 col-span-2">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Card Number</label>
                      <input
                        type="text"
                        required={paymentMethod === 'card'}
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4111 1111 1111 1111"
                        className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">Expiry Date</label>
                      <input
                        type="text"
                        required={paymentMethod === 'card'}
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-brand-charcoal/50">CVV Security Code</label>
                      <input
                        type="password"
                        required={paymentMethod === 'card'}
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        placeholder="•••"
                        className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3.5 py-3 w-full focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-brand-ivory p-6 border border-brand-charcoal/5 text-center py-10 space-y-4">
                  <i className="fa-brands fa-paypal text-brand-gold text-3xl"></i>
                  <h4 className="font-serif text-sm font-semibold text-brand-charcoal">PayPal One-Touch Active</h4>
                  <p className="text-xs text-brand-charcoal/50 max-w-sm mx-auto leading-relaxed">
                    By choosing PayPal, you will be securely redirected to their visual authorization page to authenticate your credentials upon clicking purchase.
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT SIDE: ORDER SUMMARY RECEIPT (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 border border-brand-charcoal/5 space-y-6">
              <h3 className="font-serif text-base font-semibold tracking-wider text-brand-charcoal uppercase border-b border-brand-charcoal/10 pb-3">
                Order Review
              </h3>

              {/* Tiny items list */}
              <div className="divide-y divide-brand-charcoal/5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3.5 py-3 first:pt-0 last:pb-0">
                    <div className="aspect-[3/4] w-10 overflow-hidden bg-brand-ivory shrink-0 border border-brand-charcoal/5">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-grow flex flex-col min-w-0">
                      <span className="font-serif text-xs font-semibold text-brand-charcoal truncate">{item.product.name}</span>
                      <span className="text-[9px] uppercase tracking-wider text-brand-charcoal/40 mt-0.5">Size: {item.size} | Color: {item.color}</span>
                    </div>
                    <span className="text-xs font-bold text-brand-charcoal shrink-0 font-sans">
                      {item.quantity}x
                    </span>
                  </div>
                ))}
              </div>

              {/* Costs Breakdown */}
              <div className="space-y-3.5 text-xs text-brand-charcoal/70 border-t border-brand-charcoal/10 pt-4 border-b pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-charcoal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Premium Shipping</span>
                  <span className="font-semibold text-brand-charcoal">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-brand-charcoal">${taxAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-end">
                <span className="text-xs uppercase font-bold tracking-widest text-brand-charcoal">Estimated Total</span>
                <span className="text-lg font-bold text-brand-charcoal">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="w-full btn-gold text-xs uppercase font-bold tracking-[0.25em] py-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-center block border-none rounded-none"
              >
                Complete Purchase Order
              </button>

              <div className="flex items-center justify-center space-x-2 text-brand-charcoal/30 text-[9px] uppercase tracking-wider font-semibold">
                <i className="fa-solid fa-lock text-[8px] text-brand-gold"></i>
                <span>SSL Encrypted Transaction Security</span>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
