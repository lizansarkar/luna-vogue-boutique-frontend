import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Testimonials() {
  const [swiperInstance, setSwiperInstance] = useState(null);

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
      content: 'The Tailored Wool Blazer has quickly become my go-to statement piece. The shoulder padding is clean, and the interior lining is silk-like. This is my third order from Luna Vogue and the quality remains unmatched. Their pieces truly stand the test of time.',
      author: 'Clara K.',
      location: 'New York, US',
      verified: true
    },
    {
      stars: 5,
      title: 'Exceptional Packaging Experience',
      content: 'Every piece arrived in a gorgeous dust bag with gold-stamped tissue paper. The attention to detail is remarkable. I gifted the Cashmere Wrap to my mother and she was moved by the presentation alone before even trying it on.',
      author: 'Sophie D.',
      location: 'London, UK',
      verified: true
    },
    {
      stars: 5,
      title: 'Worth Every Penny',
      content: 'The Structured Trench Coat is simply impeccable. The belt buckle is solid brass and the cotton gabardine is tightly woven. I have worn it through two seasons already and it looks brand new. Investment dressing at its finest.',
      author: 'Isabelle M.',
      location: 'Vienna, AT',
      verified: true
    },
    {
      stars: 5,
      title: 'Perfect Evening Ensemble',
      content: 'I purchased the Velvet Column Gown for a charity dinner. The colour did not photograph well online but in person the deep emerald is absolutely stunning. Multiple compliments throughout the evening. Will be ordering again.',
      author: 'Natasha B.',
      location: 'Dubai, AE',
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-brand-ivory font-sans border-t border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold text-xs uppercase tracking-[0.25em] font-bold block mb-2">
            The Vogue Guild Voice
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-brand-charcoal">
            Client Reflections
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4"></div>
        </div>

        {/* Swiper wrapper with custom prev/next buttons */}
        <div className="relative">

          {/* Prev Button */}
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 flex items-center justify-center border border-brand-charcoal/15 bg-white hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 shadow-xs group cursor-pointer"
            aria-label="Previous"
          >
            <i className="fa-solid fa-arrow-left text-[11px] text-brand-charcoal group-hover:text-white transition-colors duration-300" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 flex items-center justify-center border border-brand-charcoal/15 bg-white hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 shadow-xs group cursor-pointer"
            aria-label="Next"
          >
            <i className="fa-solid fa-arrow-right text-[11px] text-brand-charcoal group-hover:text-white transition-colors duration-300" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={setSwiperInstance}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            className="px-1 pb-2"
          >
            {reviews.map((rev, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 border border-brand-charcoal/5 shadow-xs flex flex-col justify-between items-start hover:shadow-md transition-all duration-300 relative h-full">

                  {/* Stars + Verified */}
                  <div className="w-full flex items-center justify-between border-b border-brand-charcoal/5 pb-4 mb-6">
                    <div className="flex space-x-1">
                      {[...Array(rev.stars)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-[10px] text-brand-gold" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center space-x-1 text-[9px] uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-none font-semibold">
                        <i className="fa-solid fa-circle-check text-[8px]" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="font-serif text-sm font-semibold tracking-wide text-brand-charcoal mb-3">
                      "{rev.title}"
                    </h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light mb-6">
                      {rev.content}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="w-full flex items-center justify-between pt-4 border-t border-brand-charcoal/5 mt-auto">
                    <span className="text-xs font-bold text-brand-charcoal font-serif">{rev.author}</span>
                    <span className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest">{rev.location}</span>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}