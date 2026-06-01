import React from 'react';

export default function InstagramGallery({ setActivePage }) {
  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      likes: '1.2k',
      comments: 48,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
      likes: '942',
      comments: 32,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
      likes: '1.8k',
      comments: 79,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&auto=format&fit=crop&q=80',
      likes: '822',
      comments: 19,
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80',
      likes: '1.5k',
      comments: 54,
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&auto=format&fit=crop&q=80',
      likes: '2.1k',
      comments: 92,
    },
  ];

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Gallery Header */}
        <div className="text-center mb-12">
          <span className="text-brand-gold text-xs uppercase tracking-[0.25em] font-bold block mb-2">
            Social Lookbook
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal">
            Styled by You
          </h2>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-brand-charcoal/50 hover:text-brand-gold mt-2 inline-block tracking-widest uppercase font-medium transition-colors duration-300"
          >
            @LunaVogueBoutique
          </a>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4"></div>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              
              {/* Instagram Image */}
              <img 
                src={item.image} 
                alt="Luna Vogue lookbook visual post" 
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Interactions Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center shop-look-overlay text-white px-4">
                
                {/* Social Metrics */}
                <div className="flex space-x-6 mb-6 text-sm font-sans font-medium">
                  <span className="flex items-center space-x-2">
                    <i className="fa-solid fa-heart text-red-500"></i>
                    <span>{item.likes}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <i className="fa-solid fa-comment text-white"></i>
                    <span>{item.comments}</span>
                  </span>
                </div>

                {/* Shop the Look Button */}
                <button
                  onClick={() => setActivePage('shop')}
                  className="bg-white text-brand-charcoal text-[9px] uppercase tracking-[0.25em] font-bold px-6 py-2.5 hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                >
                  Shop the Look
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
