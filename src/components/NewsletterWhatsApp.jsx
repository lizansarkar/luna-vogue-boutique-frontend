import React, { useState } from 'react';

export default function NewsletterWhatsApp() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-20 bg-white font-sans border-t border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Column 1: Newsletter Signup */}
          <div className="bg-brand-ivory p-8 lg:p-12 border border-brand-charcoal/5 flex flex-col justify-center">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
              Private Invitations
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-brand-charcoal mb-4 tracking-wide">
              The Vogue Guild
            </h3>
            <p className="text-xs lg:text-sm text-brand-charcoal/70 leading-relaxed font-light mb-8 max-w-md">
              Unlock early access to pre-a-porter capsules, exclusive private collections, and complimentary priority packaging.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white border border-brand-charcoal/15 text-brand-charcoal placeholder-brand-charcoal/40 text-xs px-4 py-3.5 flex-grow focus:outline-none focus:border-brand-gold rounded-none"
              />
              <button
                type="submit"
                className="btn bg-brand-charcoal hover:bg-brand-gold text-white hover:text-white rounded-none border-none py-3.5 px-8 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer"
              >
                Join List
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-brand-gold font-medium mt-3 animate-fade-in">
                Welcome to the Guild. A verification letter has been dispatched.
              </p>
            )}
          </div>

          {/* Column 2: WhatsApp Consultation */}
          <div className="bg-[#FAF8F5] p-8 lg:p-12 border border-brand-charcoal/5 flex flex-col justify-center items-start">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
              Direct Assistance
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-brand-charcoal mb-4 tracking-wide">
              Concierge Service
            </h3>
            <p className="text-xs lg:text-sm text-brand-charcoal/70 leading-relaxed font-light mb-8 max-w-md">
              Need advice on sizing, colors, or direct delivery tracking? Message our in-house stylist on WhatsApp for a swift consultation.
            </p>
            
            <a
              href="https://wa.me/1234567890?text=Hello%20Luna%20Vogue!%20I%20have%20some%20questions%20regarding%20fitting%20and%20sizes."
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25D366] hover:bg-[#128C7E] text-white border-none rounded-none py-3.5 px-8 text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center space-x-3 transition-colors duration-300 shadow-md cursor-pointer w-full sm:w-auto text-center justify-center"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>Stylist Direct Chat</span>
            </a>
            <span className="text-[10px] text-brand-charcoal/40 mt-3.5 tracking-wide">
              Typically responds within 15 minutes • Mon - Sat 9am - 6pm EST
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
