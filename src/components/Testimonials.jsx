import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      stars: 5,
      title: 'Flawless Drape & Tailoring',
      content: 'I ordered the Silk Slip Dress in Ivory for an evening gala. The density of the silk is exceptional—it has a beautiful, heavy drape that feels extremely premium. The packaging came scented with a custom botanical blend. Pure luxury.',
      author: 'Margot V.',
      location: 'Paris, FR',
      verified: true
    },
    {
      stars: 5,
      title: 'WhatsApp Size Advice Was Spot On',
      content: 'I was hesitant about ordering the Linen Summer Dress since I fall between sizes. I messaged their WhatsApp support and the assistant asked for my measurements. The fit is absolute perfection. Saved me so much return hassle!',
      author: 'Elena R.',
      location: 'Milan, IT',
      verified: true
    },
    {
      stars: 5,
      title: 'Timeless Quality',
      content: 'The Tailored Wool Blazer has quickly become my go-to statement piece. The shoulder padding is clean, and the interior lining is silk-like. This is my third order from Luna Vogue and the quality remains unmatched.',
      author: 'Clara K.',
      location: 'New York, US',
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-brand-ivory font-sans border-t border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Testimonials Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold text-xs uppercase tracking-[0.25em] font-bold block mb-2">
            The Vogue Guild Voice
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal">
            Client Reflections
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {reviews.map((rev, index) => (
            <div 
              key={index} 
              className="bg-white p-8 border border-brand-charcoal/5 shadow-xs flex flex-col justify-between items-start hover:shadow-md transition-all duration-300 relative"
            >
              
              {/* Star Rating and verified badge */}
              <div className="w-full flex items-center justify-between border-b border-brand-charcoal/5 pb-4 mb-6">
                <div className="flex space-x-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-[10px] text-brand-gold"></i>
                  ))}
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center space-x-1 text-[9px] uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-none font-semibold">
                    <i className="fa-solid fa-circle-check text-[8px]"></i>
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>

              {/* Review Content */}
              <div className="flex-grow">
                <h3 className="font-serif text-sm font-semibold tracking-wide text-brand-charcoal mb-3">
                  "{rev.title}"
                </h3>
                <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light mb-6">
                  {rev.content}
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="w-full flex items-center justify-between pt-4 border-t border-brand-charcoal/5 mt-auto">
                <span className="text-xs font-bold text-brand-charcoal font-serif">{rev.author}</span>
                <span className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest">{rev.location}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
