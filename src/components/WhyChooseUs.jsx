import React from 'react';

export default function WhyChooseUs() {
  const values = [
    {
      icon: 'fa-gem',
      title: 'Artisanal Craftsmanship',
      description: 'Each silhouette is constructed with meticulous attention to detail, utilizing reinforced seams, hand-finished hems, and bespoke tailoring.'
    },
    {
      icon: 'fa-seedling',
      title: 'Sustainable Pret-A-Porter',
      description: 'We prioritize certified organic linen, cruelty-free silk, and eco-certified wools to minimize materials footprint and respect our ecosystem.'
    },
    {
      icon: 'fa-paper-plane',
      title: 'Complimentary Delivery',
      description: 'Receive complimentary premium shipping and luxury boutique wrapping on all orders worldwide exceeding $150.'
    },
    {
      icon: 'fa-comments',
      title: 'WhatsApp Concierge',
      description: 'Consult with our personal shoppers directly via WhatsApp for swift assistance on size selections, styling tips, and order adjustments.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-brand-ivory font-sans border-y border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          
          {/* Left Column: Editorial Introduction */}
          <div className="lg:col-span-1 flex flex-col space-y-5">
            <span className="text-brand-gold text-xs uppercase tracking-[0.25em] font-bold">
              The House Philosophy
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal leading-tight">
              Wardrobe Pieces Built with Intention
            </h2>
            <p className="text-xs lg:text-sm text-brand-charcoal/70 leading-relaxed font-light">
              Luna Vogue Boutique was established under a single conviction: premium style should never compromise responsible ethics. We reject fast-fashion models, curating instead limited, high-caliber collections designed to transcend fleeting seasons.
            </p>
            <div className="pt-2">
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-charcoal hover:text-brand-gold transition-colors duration-300 group cursor-pointer"
              >
                <span>Consult Our Tailor</span>
                <i className="fa-solid fa-arrow-right-long transition-transform duration-300 group-hover:translate-x-1.5 text-xs text-brand-gold"></i>
              </a>
            </div>
          </div>

          {/* Right Column: Values Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 border border-brand-charcoal/5 shadow-xs hover:shadow-sm hover:border-brand-gold/30 transition-all duration-300 flex flex-col items-start"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-full bg-brand-ivory flex items-center justify-center text-brand-gold mb-6 border border-brand-charcoal/5">
                  <i className={`fa-solid ${item.icon} text-lg`}></i>
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-base font-semibold tracking-wide text-brand-charcoal mb-3">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
