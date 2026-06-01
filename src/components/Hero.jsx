import React from 'react';

export default function Hero({ setActivePage }) {
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] bg-brand-charcoal overflow-hidden flex items-center font-sans">
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80" 
          alt="Luna Vogue pret-a-porter editorial banner" 
          className="w-full h-full object-cover object-center opacity-65 scale-102 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 via-brand-charcoal/45 to-transparent"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-12 z-10 flex flex-col justify-center text-white">
        
        {/* Editorial Sub-Label */}
        <span className="text-brand-gold text-xs lg:text-sm font-bold uppercase tracking-[0.3em] mb-4 animate-fade-in-down">
          Pret-A-Porter • Autumn/Winter Concept
        </span>

        {/* Large Playfair Headline */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white leading-[1.1] max-w-2xl mb-6">
          Effortless Elegance <br />
          <span className="font-serif italic font-normal text-brand-gold">Redefined.</span>
        </h1>

        {/* Brand Tagline */}
        <p className="text-sm md:text-base text-white/80 font-light leading-relaxed max-w-lg mb-10 tracking-wide">
          Curating refined wardrobe designs for the modern visionary. High-caliber sustainable fibers, premium structuring, and timeless neutral profiles.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 max-w-md sm:max-w-none">
          <button
            onClick={() => setActivePage('shop')}
            className="btn bg-brand-gold hover:bg-brand-gold-dark text-white border-none rounded-none px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Explore Collection
          </button>
          
          <button
            onClick={() => {
              const element = document.getElementById('why-choose-us');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white rounded-none px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer"
          >
            Our Story
          </button>
        </div>

      </div>

      {/* Visual Scrolling Indicator Dot */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 text-[9px] uppercase tracking-[0.3em] space-y-2 hidden md:flex">
        <span>Scroll</span>
        <div className="w-1.5 h-6 rounded-full border border-white/30 flex items-start justify-center p-0.5">
          <div className="w-0.5 h-1.5 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>

    </section>
  );
}
