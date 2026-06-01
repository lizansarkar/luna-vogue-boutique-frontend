import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page and subcomponent views
import Hero from './components/Hero';
import FeaturedSlider from './components/FeaturedSlider';
import WhyChooseUs from './components/WhyChooseUs';
import InstagramGallery from './components/InstagramGallery';
import Testimonials from './components/Testimonials';
import NewsletterWhatsApp from './components/NewsletterWhatsApp';
import ShopPage from './components/ShopPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';

import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // Mock Products Database
  const products = [
    {
      id: 1,
      name: 'Silk Slip Dress',
      price: 180.00,
      category: 'Dresses',
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Ivory', 'Charcoal', 'Caramel'],
      fabric: '100% Organic Mulberry Silk (22 Momme)',
      care: 'Professional dry clean highly recommended. Alternatively, hand wash cold with silk detergent and dry flat in shade.',
      description: 'An editorial classic cut from premium 22-momme weight mulberry silk. Features a clean scoop cowl back, adjustable fine straps, and a liquid-like drape that moves fluidly with every stride.',
      inStock: true
    },
    {
      id: 2,
      name: 'Tailored Wool Blazer',
      price: 240.00,
      category: 'Blazers',
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Charcoal', 'Black', 'Caramel'],
      fabric: '80% Certified Virgin Wool, 20% Organic Flax Cotton; Lining: 100% Viscose Silk',
      care: 'Dry clean only. Steam gently between wearings. Brush lightly with a soft suede brush to remove loose dust.',
      description: 'Sharp, double-breasted structure crafted from structured virgin wool. Features clean padded shoulders, elegant horn buttons, dual front flap pockets, and a luxurious fully silk-lined interior.',
      inStock: true
    },
    {
      id: 3,
      name: 'Linen Summer Dress',
      price: 150.00,
      category: 'Dresses',
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Ivory', 'Olive', 'Sage'],
      fabric: '100% Certified Organic Belgian Flax Linen',
      care: 'Delicate machine wash cold inside out. Hang dry immediately. Iron damp on high heat to smooth structured folds.',
      description: 'Breathable, structured organic linen tailored for mid-summer editorial silhouettes. Includes discrete side seam pockets, a matching self-tie waist sash, and fine hand-finished hems.',
      inStock: true
    },
    {
      id: 4,
      name: 'Cashmere Chunky Sweater',
      price: 210.00,
      category: 'Knitwear',
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1574164904299-3a102b110380?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['S', 'M', 'L'],
      colors: ['Caramel', 'Ivory', 'Sage'],
      fabric: '100% Grade-A Mongolian Long-Staple Cashmere',
      care: 'Hand wash cold flat. Lay flat to dry on dry towel to avoid structural stretching. Never hang wool sweaters.',
      description: 'Enveloping warmth knitted from grade-A long-staple cashmere. Boasts a soft mock turtleneck collar, premium rib-knit borders, and a relaxed, comfortable silhouette ideal for transition seasons.',
      inStock: true
    },
    {
      id: 5,
      name: 'Cotton Trench Coat',
      price: 280.00,
      category: 'Coats',
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Caramel', 'Black', 'Sage'],
      fabric: '100% Compact Cotton Twill (Water-Repellent); Lining: Polyester Satin',
      care: 'Wipe off small soils with damp microfiber cloth. Dry clean periodically to re-wax and lock in water-repellent shell.',
      description: 'Bespoke double-breasted trench coat silhouette featuring wind-resistant cotton twill. Detailed with functional storm flaps, adjustable wrist straps, and elegant tortoiseshell belt closures.',
      inStock: true
    },
    {
      id: 6,
      name: 'Oversized Linen Shirt',
      price: 95.00,
      category: 'Shirts',
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Ivory', 'Charcoal', 'Sage'],
      fabric: '100% Certified Organic Medium-Weight Linen',
      care: 'Wash cold with similar shades. Tumble dry low to enhance natural linen textures, or hang damp to iron crisp.',
      description: 'A relaxed, comfortable staple. Loose silhouette tailored from premium Belgian linen, finished with refined mother-of-pearl buttons, single chest pocket, and elegant double-button barrel cuffs.',
      inStock: true
    },
    {
      id: 7,
      name: 'Pleated Midi Skirt',
      price: 110.00,
      category: 'Dresses',
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['S', 'M', 'L'],
      colors: ['Charcoal', 'Black', 'Caramel'],
      fabric: '95% Recycled Structured Polyester, 5% Elastane Twill',
      care: 'Wash cold inside out on delicate cycle. Hang to dry. Do not press with heavy iron to maintain pleat structure.',
      description: 'Sharp sunburst pleating that moves fluidly with every step. Sits comfortably at the natural waist with a discrete hidden elasticized band, draping to an elegant mid-calf hemline.',
      inStock: true
    },
    {
      id: 8,
      name: 'Leather Ankle Boots',
      price: 260.00,
      category: 'Footwear',
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Caramel'],
      fabric: '100% Italian Full-Grain Calf Leather; Heel: Treated Solid Oak Block',
      care: 'Wipe dirt with clean damp cloth. Use premium neutral leather conditioner every 3 months. Buff with dry flannel.',
      description: 'Refined ankle silhouette structured in buttery Italian full-grain calf leather. Complete with a walkable wood-block heel, discrete side zippers, and custom cushioned orthotic insoles.',
      inStock: true
    },
    {
      id: 9,
      name: 'Silk Camisole Top',
      price: 85.00,
      category: 'Shirts',
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Ivory', 'Black', 'Caramel'],
      fabric: '100% Pure Mulberry Silk Crepe',
      care: 'Hand wash cold with delicate silk detergent or dry clean. Do not wring or twist. Iron low on damp reverse.',
      description: 'A lightweight layering staple. Features a subtle, flattering V-neckline, bias-cut silk weave that wraps contours, and delicate adjustable shoulder straps for a customized chest drape.',
      inStock: true
    },
    {
      id: 10,
      name: 'Suede Editorial Mule',
      price: 195.00,
      category: 'Footwear',
      rating: 4.4,
      images: [
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80'
      ],
      sizes: ['S', 'M', 'L'],
      colors: ['Caramel', 'Charcoal'],
      fabric: '100% Italian Kid Suede Leather; Sole: Genuine Leather',
      care: 'Spray with suede protective coating prior to first wear. Suede brush occasionally to revive fiber textures.',
      description: 'Pointed slide-on mule mule crafted in exceptionally soft Italian kid suede. Features minimalist interior cushioning, solid leather outsoles, and a micro block heel for comfortable pret-a-porter wear.',
      inStock: false
    }
  ];

  // Scroll to top on page switches to improve UX
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage, selectedProductId]);

  // Cart Interactions
  const handleAddToCart = (product, size, color, quantity) => {
    setCart((prev) => {
      // Check if exact same item configuration already exists in shopping bag
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, size, color, quantity }];
      }
    });
  };

  const handleUpdateCartQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (index) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Toggles
  const handleAddToWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Navigation callbacks
  const handleProductCardClick = (productId) => {
    setSelectedProductId(productId);
    setActivePage('product-details');
  };

  const handleNavbarCartClick = () => {
    setActivePage('cart');
  };

  const handleCheckoutNav = () => {
    setActivePage('checkout');
  };

  // Cart quantity count helper
  const cartQuantityCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F5F2] font-sans">
      
      {/* Sticky header navbar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        cartCount={cartQuantityCount}
        wishlistCount={wishlist.length}
        user={user}
        setUser={setUser}
      />

      {/* Main content viewport switching */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <Hero setActivePage={setActivePage} />
            <FeaturedSlider 
              products={products}
              onProductClick={handleProductCardClick}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
            />
            <WhyChooseUs />
            <InstagramGallery setActivePage={setActivePage} />
            <Testimonials />
            <NewsletterWhatsApp />
          </>
        )}

        {activePage === 'shop' && (
          <ShopPage 
            products={products}
            onProductClick={handleProductCardClick}
            onAddToWishlist={handleAddToWishlist}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
          />
        )}

        {activePage === 'product-details' && (
          <ProductDetailsPage 
            productId={selectedProductId}
            products={products}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'cart' && (
          <CartPage 
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onCheckout={handleCheckoutNav}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage 
            cart={cart}
            onClearCart={handleClearCart}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'auth' && (
          <AuthPage 
            user={user}
            setUser={setUser}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'admin' && (
          <AdminDashboard products={products} />
        )}
      </main>

      {/* Premium Footer */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}
