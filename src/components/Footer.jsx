import React, { useState } from 'react';

export default function Footer({ setActivePage }) {
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
    <footer className="bg-brand-charcoal text-white/90 pt-16 pb-8 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        
        {/* Editorial Brand Story Column */}
        <div className="flex flex-col space-y-4">
          <span className="font-serif text-lg lg:text-xl font-bold tracking-[0.2em] text-white">
            LUNA VOGUE
          </span>
          <span className="text-[10px] tracking-[0.3em] text-brand-gold uppercase -mt-2">
            Pret-A-Porter
          </span>
          <p className="text-xs text-white/60 leading-relaxed pt-2">
            Curated wardrobe concepts for the modern woman. Embracing sustainable elegance, high-caliber craftsmanship, and clean design aesthetics.
          </p>
          {/* Social Links */}
          <div className="flex space-x-4 pt-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-gold transition-colors duration-300" aria-label="Luna Vogue Instagram">
              <i className="fa-brands fa-instagram text-base"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-gold transition-colors duration-300" aria-label="Luna Vogue Pinterest">
              <i className="fa-brands fa-pinterest text-base"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-gold transition-colors duration-300" aria-label="Luna Vogue Facebook">
              <i className="fa-brands fa-facebook text-base"></i>
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-gold transition-colors duration-300" aria-label="Luna Vogue WhatsApp Support">
              <i className="fa-brands fa-whatsapp text-base"></i>
            </a>
          </div>
        </div>

        {/* Customer Care Links */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-brand-gold uppercase pb-2">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <button onClick={() => setActivePage('shop')} className="hover:text-brand-gold transition-colors duration-300 text-left cursor-pointer">
                Online Catalog
              </button>
            </li>
            <li>
              <a href="#delivery-returns" className="hover:text-brand-gold transition-colors duration-300">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#size-guide" className="hover:text-brand-gold transition-colors duration-300">
                Size Guidelines
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-brand-gold transition-colors duration-300">
                Boutique FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* The Boutique Story */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-brand-gold uppercase pb-2">
            The House
          </h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <a href="#about" className="hover:text-brand-gold transition-colors duration-300">
                Our Heritage
              </a>
            </li>
            <li>
              <a href="#sustainability" className="hover:text-brand-gold transition-colors duration-300">
                Sustainability Code
              </a>
            </li>
            <li>
              <a href="#press" className="hover:text-brand-gold transition-colors duration-300">
                Press & Editorial
              </a>
            </li>
            <li>
              <a href="#careers" className="hover:text-brand-gold transition-colors duration-300">
                Careers at Vogue
              </a>
            </li>
          </ul>
        </div>

        {/* The Vogue Guild Newsletter */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-brand-gold uppercase pb-1">
            The Vogue Guild
          </h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Join our mailing list to receive private invitations to new collections, editorial lookbooks, and VIP events.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2 pt-2">
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white/5 border border-white/20 text-white placeholder-white/40 text-xs px-4 py-3 pr-12 w-full rounded-none focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 text-brand-gold hover:text-white transition-colors duration-300 cursor-pointer"
                aria-label="Subscribe"
              >
                <i className="fa-solid fa-arrow-right-long text-sm"></i>
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-brand-gold font-medium animate-fade-in">
                Thank you. You have been added to the Vogue Guild list.
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Footer Bottom Credentials */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-white/40 space-y-4 md:space-y-0">
        <div>
          <span>© {new Date().getFullYear()} Luna Vogue Boutique. All rights reserved.</span>
          <span className="mx-2">•</span>
          <a href="#privacy" className="hover:text-brand-gold transition-colors duration-300">Privacy Policy</a>
          <span className="mx-2">•</span>
          <a href="#terms" className="hover:text-brand-gold transition-colors duration-300">Terms of Use</a>
        </div>
        
        {/* Payment Methods */}
        <div className="flex items-center space-x-4 text-lg">
          <i className="fa-brands fa-cc-visa hover:text-white/60 transition-colors" title="Visa"></i>
          <i className="fa-brands fa-cc-mastercard hover:text-white/60 transition-colors" title="Mastercard"></i>
          <i className="fa-brands fa-cc-amex hover:text-white/60 transition-colors" title="American Express"></i>
          <i className="fa-brands fa-cc-paypal hover:text-white/60 transition-colors" title="Paypal"></i>
          <i className="fa-brands fa-cc-apple-pay hover:text-white/60 transition-colors" title="Apple Pay"></i>
        </div>
      </div>
    </footer>
  );
}
