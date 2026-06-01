import React, { useState } from 'react';

export default function CartPage({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  setActivePage 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState('');
  const [promoError, setPromoError] = useState('');

  // Cart Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingThreshold = 150;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 15.00;
  
  // Promo code check
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'LUNAVOGUE10') {
      setDiscountPercent(10);
      setPromoApplied('LUNAVOGUE10');
      setPromoCode('');
    } else {
      setPromoError('Invalid promotional voucher code.');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const taxPercent = 8;
  const taxableSubtotal = subtotal - discountAmount;
  const taxAmount = (taxableSubtotal * taxPercent) / 100;
  const finalTotal = taxableSubtotal + shippingCost + taxAmount;

  // WhatsApp Order Text formatting
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `Hello Luna Vogue Boutique! 🌟\n`;
    message += `I would like to place an order for the following pret-a-porter pieces:\n`;
    message += `-------------------------------------------\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Size: ${item.size} | Color: ${item.color}\n`;
      message += `   Qty: ${item.quantity} x $${item.product.price.toFixed(2)} = $${(item.product.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `-------------------------------------------\n`;
    message += `Subtotal: $${subtotal.toFixed(2)}\n`;
    if (discountPercent > 0) {
      message += `Promo Discount (${promoApplied} -${discountPercent}%): -$${discountAmount.toFixed(2)}\n`;
    }
    message += `Shipping: ${shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}\n`;
    message += `Taxes (${taxPercent}%): $${taxAmount.toFixed(2)}\n`;
    message += `ESTIMATED TOTAL: $${finalTotal.toFixed(2)}\n`;
    message += `-------------------------------------------\n`;
    message += `Please verify item size availability and coordinate payment options. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-16 bg-[#F8F5F2] font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Page Header */}
        <div className="border-b border-brand-charcoal/10 pb-6 mb-12">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold block mb-1">Your Selection</span>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal">
            Shopping Bag
          </h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: SHOPPING BAG ITEMS (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Desktop Headers */}
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-brand-charcoal/10 pb-3 text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50">
                <div className="col-span-6">Garment Detail</div>
                <div className="col-span-2 text-center">Size / Color</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-brand-charcoal/10 bg-white p-6 border border-brand-charcoal/5">
                {cart.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 first:pt-0 last:pb-0 items-center">
                    
                    {/* Column 1: Image & Name */}
                    <div className="col-span-12 md:col-span-6 flex items-center space-x-4">
                      <div 
                        onClick={() => { setActivePage('product-details'); }}
                        className="relative aspect-[3/4] w-16 md:w-20 overflow-hidden bg-brand-ivory cursor-pointer shrink-0 border border-brand-charcoal/5"
                      >
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-brand-charcoal/40 font-semibold mb-0.5">
                          {item.product.category}
                        </span>
                        <h3 
                          onClick={() => { setActivePage('product-details'); }}
                          className="font-serif text-sm font-semibold tracking-wide text-brand-charcoal hover:text-brand-gold cursor-pointer transition-colors"
                        >
                          {item.product.name}
                        </h3>
                        <span className="text-xs text-brand-charcoal/60 mt-1 font-semibold">
                          ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Column 2: Size & Color */}
                    <div className="col-span-6 md:col-span-2 text-left md:text-center flex md:flex-col md:items-center space-x-2 md:space-x-0">
                      <span className="md:hidden text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/40">Details:</span>
                      <span className="text-xs text-brand-charcoal font-medium font-sans">
                        {item.size} / {item.color}
                      </span>
                    </div>

                    {/* Column 3: Quantity Controls */}
                    <div className="col-span-6 md:col-span-2 flex items-center justify-between md:justify-center">
                      <span className="md:hidden text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/40">Quantity:</span>
                      <div className="flex items-center border border-brand-charcoal/15 bg-[#F8F5F2]">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-3 py-1.5 text-brand-charcoal hover:text-brand-gold transition-colors text-xs font-semibold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="px-3 text-xs font-bold font-sans text-brand-charcoal w-6 text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-3 py-1.5 text-brand-charcoal hover:text-brand-gold transition-colors text-xs font-semibold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    {/* Column 4: Subtotal & Delete */}
                    <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-end space-x-4">
                      <span className="md:hidden text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/40">Total:</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-brand-charcoal">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-brand-charcoal/30 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <i className="fa-regular fa-trash-can text-sm"></i>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Continue Shopping button */}
              <button
                onClick={() => setActivePage('shop')}
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-charcoal hover:text-brand-gold transition-colors duration-300 group cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left-long transition-transform duration-300 group-hover:-translate-x-1.5 text-xs text-brand-gold"></i>
                <span>Continue Shopping Catalog</span>
              </button>

            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 border border-brand-charcoal/5 space-y-6">
                
                <h3 className="font-serif text-base font-semibold tracking-wider text-brand-charcoal uppercase border-b border-brand-charcoal/10 pb-3.5">
                  Order Summary
                </h3>

                {/* Promo Code Input Module */}
                <form onSubmit={handleApplyPromo} className="space-y-2 border-b border-brand-charcoal/10 pb-4">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/50 block">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. LUNAVOGUE10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-brand-ivory border border-brand-charcoal/10 text-xs px-3 py-2 w-full focus:outline-none focus:border-brand-gold uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-brand-charcoal text-white hover:bg-brand-gold text-[10px] uppercase font-bold tracking-widest px-4 py-2 cursor-pointer transition-colors duration-300"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[10px] text-green-600 font-semibold animate-fade-in">
                      Promo voucher applied: 10% discount!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[10px] text-red-500 font-semibold animate-fade-in">
                      {promoError}
                    </p>
                  )}
                </form>

                {/* Pricing Table Invoice */}
                <div className="space-y-3.5 text-xs text-brand-charcoal/70 border-b border-brand-charcoal/10 pb-4">
                  
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount ({promoApplied})</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-brand-gold uppercase text-[10px] font-bold">Complimentary</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax ({taxPercent}%)</span>
                    <span className="font-semibold">${taxAmount.toFixed(2)}</span>
                  </div>

                  {shippingCost > 0 && (
                    <div className="bg-brand-ivory/50 p-2.5 border border-brand-charcoal/5 text-[10px] leading-relaxed italic text-brand-charcoal/50">
                      <span className="font-bold text-brand-gold block not-italic uppercase mb-0.5">Vogue Guild Tip:</span>
                      Add just <span className="font-bold">${(shippingThreshold - subtotal).toFixed(2)}</span> more to receive complimentary premium delivery!
                    </div>
                  )}

                </div>

                {/* Final Checkout Pricing total */}
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase font-bold tracking-widest text-brand-charcoal">Total Amount</span>
                  <span className="text-lg font-bold text-brand-charcoal font-sans">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                {/* Funnel Checkout Buttons */}
                <div className="space-y-3 pt-4">
                  
                  {/* Standard Checkout */}
                  <button
                    onClick={onCheckout}
                    className="w-full bg-brand-charcoal text-white hover:bg-brand-gold text-xs uppercase font-bold tracking-[0.2em] py-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer text-center block rounded-none"
                  >
                    Secure Checkout
                  </button>

                  {/* WhatsApp Order direct option */}
                  <button
                    onClick={handleWhatsAppWhatsAppOrderCheckout}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-xs uppercase font-bold tracking-[0.2em] py-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2.5 rounded-none"
                  >
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                    <span>Checkout via WhatsApp</span>
                  </button>

                  <p className="text-[9px] text-brand-charcoal/40 text-center leading-relaxed mt-2.5">
                    Orders placed via WhatsApp are processed by a personal stylist. Payment is handled securely via custom credit link.
                  </p>

                </div>

              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white border border-brand-charcoal/5 p-16 text-center max-w-2xl mx-auto">
            <i className="fa-solid fa-bag-shopping text-brand-gold/30 text-5xl mb-4 animate-bounce"></i>
            <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-2">
              Your Bag is Empty
            </h3>
            <p className="text-xs text-brand-charcoal/50 max-w-sm mx-auto mb-8 leading-relaxed font-light">
              Explore the Luna Vogue catalog to secure premium pret-a-porter dresses, tailored blazers, and knitwear staples.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="bg-brand-charcoal text-white text-[10px] uppercase font-bold tracking-widest py-3.5 px-8 hover:bg-brand-gold transition-colors duration-300 cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );

  // Fallback support for misspelled wrapper
  function handleWhatsAppWhatsAppOrderCheckout() {
    handleWhatsAppCheckout();
  }
}
