import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Plus, Minus, X, Star } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** --- CLEAN CODE: UTILS --- */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** --- DATA --- */
const products = [
  // SIGNATURES
  {
    id: 1,
    name: "L'Original",
    price: 8.00,
    description: "Potato bun, steak 90g, cheddar affiné, oignons caramélisés, salade croquante, sauce signature.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    category: "Signatures"
  },
  {
    id: 2,
    name: "Le Gourmet",
    price: 10.00,
    description: "Pain burger artisanal, steak façon bouchère 120g, cheddar, bacon fumé au bois de hêtre, oignons caramélisés, sauce secrète.",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800",
    category: "Signatures"
  },
  {
    id: 3,
    name: "Le Sucré-Salé",
    price: 9.50,
    description: "Pain Foccacia, steak façon bouchère 120g, miel, fromage de chèvre, oignons caramélisés, salade, sauce signature.",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=800",
    category: "Signatures"
  },
  {
    id: 4,
    name: "Le Nordiste",
    price: 10.50,
    description: "Pain Foccacia, steak façon bouchère 120g, raclette ou maroilles, bacon, oignons caramélisés, salade, sauce signature.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    category: "Signatures"
  },
  {
    id: 5,
    name: "Le Duo Gourmet",
    price: 12.00,
    description: "Pain burger rose, filet de poulet maison mariné, steak 90g, cheddar, oignons caramélisés, salade, sauce signature.",
    image: "/duo-gourmet-3.jpg",
    category: "Signatures"
  },
  {
    id: 6,
    name: "Le Sweet Poulet",
    price: 9.50,
    description: "Pain burger, filet de poulet mariné, oignons caramélisés, poivrons grillés, gouda, salade, sauce signature.",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800",
    category: "Signatures"
  },
  {
    id: 7,
    name: "Le Crousty Poulet",
    price: 10.50,
    description: "Potato bun, patty de poulet frais pané maison, cheddar, oignons caramélisés, cornichons, salade, sauce mayo-fumée.",
    image: "/crousty-poulet-perfect.jpg",
    category: "Signatures"
  },
  {
    id: 8,
    name: "Le Garden Poulet",
    price: 9.50,
    description: "Bun's sésame blanc, filet de poulet, oignons caramélisés, oignons frits, salade, sauce garden.",
    image: "/garden-poulet-final-clean.jpg",
    category: "Signatures",
    isNew: true
  },
  {
    id: 9,
    name: "Le Suprême Poulet",
    price: 9.50,
    description: "Bun's sésame blanc, filet de poulet, oignons caramélisés, oignons frits, salade, sauce dynamite.",
    image: "/supreme-poulet.jpg",
    category: "Signatures",
    isNew: true
  },
  {
    id: 10,
    name: "Le Veggie",
    price: 10.50,
    description: "Pain burger betterave, aubergine grillée, poivrons grillés, oignons caramélisés, fromage feta, pesto.",
    image: "/veggie-burger-3.jpg",
    category: "Signatures"
  },
  // SMASHS
  {
    id: 11,
    name: "L'Original Smash",
    price: 7.50,
    priceDouble: 9.50,
    description: "Potato bun ultra-moelleux, steak smashé avec croûte caramélisée, cheddar fondu, oignons, sauce signature.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800",
    category: "Smashs"
  },
  {
    id: 12,
    name: "Le Spicy Smash",
    price: 8.00,
    priceDouble: 10.00,
    description: "Potato bun, steak smashé sauce chili-thaï, cheddar, poivrons grillés, salade, sauce signature.",
    image: "/spicy-smash-final-clean.jpg",
    category: "Smashs"
  },
  {
    id: 13,
    name: "Le Bacon Smash",
    price: 8.50,
    priceDouble: 10.50,
    description: "Le classique smashé sublimé par un bacon croustillant et notre cheddar maturé 12 mois.",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800",
    category: "Smashs"
  },
  {
    id: 14,
    name: "Le Mc Smash",
    price: 8.50,
    priceDouble: 10.50,
    description: "Bun's sésame blanc, steak smashé, cheddar, oignons ciselés, cornichons, salade, sauce emblématique.",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800",
    category: "Smashs",
    isNew: true
  },
  {
    id: 15,
    name: "Le Smash Maroilles",
    price: 9.00,
    priceDouble: 11.00,
    description: "Bun's sésame blanc, steak smashé, maroilles bien coulant, oignons caramélisés, oignons frits, salade, sauce creamy BBQ.",
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=800",
    category: "Smashs"
  },
  {
    id: 16,
    name: "Le Smash Raclette",
    price: 9.00,
    priceDouble: 11.00,
    description: "Bun's sésame blanc, steak smashé, raclette, oignons caramélisés, oignons frits, salade, sauce creamy BBQ.",
    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=800",
    category: "Smashs"
  },
  {
    id: 17,
    name: "Le Smash Chèvre",
    price: 9.00,
    priceDouble: 11.00,
    description: "Bun's sésame blanc, steak smashé, chèvre, miel, oignons caramélisés, oignons frits, salade, sauce moutarde-miel.",
    image: "/smash-chevre-recadre.jpg",
    category: "Smashs"
  }
];

const reviews = [
  { id: 1, name: "Thomas L.", rating: 5, text: "Une claque gustative. On sent vraiment le goût de la viande maturée." },
  { id: 2, name: "Sarah B.", rating: 5, text: "Oubliez les fast-foods. C'est de la haute couture." },
  { id: 3, name: "Karim M.", rating: 5, text: "Le Smash Burger est incroyable, la croûte de la viande est parfaite." }
];

/** --- FRAMER MOTION MAGICIAN: THE HOLY TRINITY --- */
const appleEase = [0.22, 1, 0.36, 1];

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 1, ease: appleEase } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

/** --- ATOMIC COMPONENTS --- */

const Button = ({ children, variant = "primary", className, ...props }) => {
  const baseStyles = "flex items-center justify-center min-h-[48px] rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 active:scale-95";
  const variants = {
    primary: "bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-900/50",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/10",
    ghost: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
  };
  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const SmoothReveal = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden">
    <motion.span 
      variants={textRevealVariants} 
      initial="hidden" 
      animate="visible" 
      style={{ display: 'block' }}
      transition={{ delay }}
    >
      {children}
    </motion.span>
  </span>
);

/** --- MAIN APP COMPONENT --- */
export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Signatures');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modal State
  const [isMenuSelected, setIsMenuSelected] = useState(false);
  const [isDoubleSelected, setIsDoubleSelected] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Prevent scroll when modal/cart open
  useEffect(() => {
    if (isCartOpen || selectedProduct) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isCartOpen, selectedProduct]);

  // Parallax Setup
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const handleAddToCart = () => {
    let finalPrice = selectedProduct.category === 'Smashs' && isDoubleSelected ? selectedProduct.priceDouble : selectedProduct.price;
    let suffix = selectedProduct.category === 'Smashs' ? (isDoubleSelected ? " (Double)" : " (Simple)") : "";
    
    if (isMenuSelected) {
      finalPrice += 4;
      suffix += " + Menu";
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === selectedProduct.id && item.isMenu === isMenuSelected && item.isDouble === isDoubleSelected);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...selectedProduct, name: selectedProduct.name + suffix, price: finalPrice, quantity: 1, isMenu: isMenuSelected, isDouble: isDoubleSelected }];
    });
    
    setSelectedProduct(null);
  };

  const updateQuantity = (item, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === item.id && i.isMenu === item.isMenu && i.isDouble === item.isDouble) {
        const newQ = i.quantity + delta;
        return newQ > 0 ? { ...i, quantity: newQ } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const filteredProducts = products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-orange-600/30 pb-safe">
      
      {/* HEADER - MOBILE FIRST STICKY */}
      <header className="fixed top-0 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 z-40 px-4 py-3 md:px-8 flex justify-between items-center transition-all pt-safe">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black tracking-widest text-white uppercase">
          MY BURGER<span className="text-orange-600">.</span>
        </motion.h1>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Ouvrir le panier"
        >
          <ShoppingBag size={20} className="text-white" />
          {totalItems > 0 && (
            <span className="absolute 0 top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#050505]">
              {totalItems}
            </span>
          )}
        </motion.button>
      </header>

      <main>
        {/* HERO SECTION - GTA VI PARALLAX + FOCUS IMPACT */}
        <section ref={heroRef} className="relative h-[90vh] md:h-[100svh] min-h-[550px] overflow-hidden flex items-center justify-center pt-20">
          <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505] z-10" />
            <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600" alt="Burger Gourmet" className="w-full h-full object-cover opacity-60" />
          </motion.div>
          
          <motion.div style={{ opacity: opacityText }} className="relative z-20 px-6 max-w-4xl mx-auto text-center flex flex-col items-center -mt-24 md:mt-0">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              <SmoothReveal>LE PIRE BURGER</SmoothReveal>
              <SmoothReveal delay={0.1}>QUE VOUS PUISSIEZ</SmoothReveal>
              <SmoothReveal delay={0.2}><span className="text-orange-600">MANGER.</span></SmoothReveal>
            </h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1, ease: appleEase }}
              className="space-y-4 max-w-xl flex flex-col items-center"
            >
              <p className="text-lg md:text-xl text-zinc-300 font-medium">
                Oubliez tout ce que vous savez. Ce n'est pas de la restauration rapide. C'est un aller simple vers une véritable addiction.
              </p>
              <Button 
                className="mt-8 px-10 py-4 text-lg rounded-full"
                onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              >
                Prouvez-moi le contraire
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* MENU SECTION */}
        <section id="menu" className="max-w-5xl mx-auto px-4 py-24 scroll-mt-20">
          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-zinc-900/50 backdrop-blur-xl rounded-2xl mb-12 sticky top-20 md:top-24 z-30 border border-white/5 mx-auto max-w-sm">
            {['Signatures', 'Smashs'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex-1 min-h-[48px] rounded-xl font-bold text-sm uppercase tracking-wider relative transition-colors z-10",
                  selectedCategory === cat ? "text-black" : "text-zinc-400"
                )}
              >
                {selectedCategory === cat && (
                  <motion.div layoutId="tab-indicator" className="absolute inset-0 bg-white rounded-xl -z-10" transition={{ ease: appleEase, duration: 0.5 }} />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.article
                  key={product.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { ease: appleEase, duration: 0.8 } }
                  }}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group cursor-pointer flex flex-col bg-zinc-900/30 rounded-[2rem] overflow-hidden border border-white/5 hover:border-orange-500/30 transition-colors"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsMenuSelected(false);
                    setIsDoubleSelected(false);
                  }}
                >
                  <div className="relative h-64 overflow-hidden bg-zinc-800">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <h3 className="text-2xl font-black text-white">{product.name}</h3>
                      <span className="text-orange-500 font-bold text-xl">{product.price.toFixed(2)}€</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">{product.description}</p>
                    <Button variant="outline" className="w-full group-hover:bg-white group-hover:text-black group-hover:border-white">
                      Sélectionner <Plus size={16} className="ml-2" />
                    </Button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* SOCIAL PROOF (REVIEWS) */}
        <section className="bg-zinc-900/20 py-24 border-y border-white/5">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-16 uppercase tracking-widest flex justify-center gap-x-4 flex-wrap">
              <span>L'ADDICTION</span>
              <span>EST</span>
              <span className="text-orange-600">RÉELLE.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((rev, i) => (
                <motion.div 
                  key={rev.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, ease: appleEase }}
                  className="bg-[#050505] p-8 rounded-3xl border border-white/5"
                >
                  <div className="flex gap-1 text-orange-500 mb-4">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-zinc-300 italic mb-6">"{rev.text}"</p>
                  <p className="text-white font-bold text-sm tracking-wider uppercase">— {rev.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 text-center text-zinc-500 text-sm pb-safe">
        <p className="font-bold tracking-widest uppercase">My Burger © 2026. L'excellence a un goût.</p>
      </footer>

      {/* --- MODALS & SIDEBARS --- */}
      
      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full md:w-auto md:min-w-[500px] md:max-w-[600px] bg-[#0A0A0A] rounded-t-[2rem] md:rounded-[2rem] border-t md:border border-white/10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="overflow-y-auto flex flex-col w-full h-full pb-safe">
                <div className="relative w-full h-56 md:h-64 shrink-0 bg-[#050505]">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80" />
                  <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center z-50" aria-label="Fermer">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 md:p-8 shrink-0">
                  <h3 className="text-3xl font-black mb-2">{selectedProduct.name}</h3>
                <p className="text-zinc-400 mb-8">{selectedProduct.description}</p>

                {selectedProduct.category === 'Smashs' && (
                  <div className="mb-6">
                    <p className="font-bold mb-3 uppercase tracking-wider text-xs text-zinc-500">Taille de la bête</p>
                    <div className="flex gap-3">
                      <Button variant={!isDoubleSelected ? 'primary' : 'ghost'} className="flex-1" onClick={() => setIsDoubleSelected(false)}>Simple</Button>
                      <Button variant={isDoubleSelected ? 'primary' : 'ghost'} className="flex-1" onClick={() => setIsDoubleSelected(true)}>Double (+{(selectedProduct.priceDouble - selectedProduct.price).toFixed(2)}€)</Button>
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <p className="font-bold mb-3 uppercase tracking-wider text-xs text-zinc-500">L'Expérience complète</p>
                  <div className="flex gap-3">
                    <Button variant={!isMenuSelected ? 'primary' : 'ghost'} className="flex-1" onClick={() => setIsMenuSelected(false)}>Burger Seul</Button>
                    <Button variant={isMenuSelected ? 'primary' : 'ghost'} className="flex-1" onClick={() => setIsMenuSelected(true)}>Menu (+4.00€)</Button>
                  </div>
                  {isMenuSelected && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 text-orange-500 text-sm font-medium">
                      ✓ Frites fraîches maison & Boisson 33cl incluses.
                    </motion.p>
                  )}
                </div>

                <Button className="w-full py-5 text-lg" onClick={handleAddToCart}>
                  Ajouter au panier — {(
                    (selectedProduct.category === 'Smashs' && isDoubleSelected ? selectedProduct.priceDouble : selectedProduct.price) + 
                    (isMenuSelected ? 4 : 0)
                  ).toFixed(2)}€
                </Button>
              </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.aside 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ ease: appleEase, duration: 0.6 }}
              className="relative w-full md:w-[400px] bg-[#0A0A0A] border-l border-white/5 flex flex-col h-full"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between pt-safe shrink-0">
                <h2 className="text-xl font-black uppercase tracking-widest">Commande</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p className="font-medium text-center">Votre panier a faim.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div layout key={`${item.id}-${item.isMenu}-${item.isDouble}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex gap-4 bg-white/5 p-4 rounded-2xl">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="font-bold text-sm text-white leading-tight">{item.name}</h4>
                            <p className="text-orange-500 font-bold text-sm mt-1">{(item.price * item.quantity).toFixed(2)}€</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <button onClick={() => updateQuantity(item, -1)} className="p-1 bg-white/10 rounded-full hover:bg-white/20 min-h-[32px] min-w-[32px] flex items-center justify-center"><Minus size={14} /></button>
                            <span className="font-bold text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item, 1)} className="p-1 bg-white/10 rounded-full hover:bg-white/20 min-h-[32px] min-w-[32px] flex items-center justify-center"><Plus size={14} /></button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-[#050505] shrink-0 pb-safe">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-zinc-400 font-medium uppercase tracking-wider text-sm">Total</span>
                    <span className="text-3xl font-black text-white">{totalPrice.toFixed(2)}€</span>
                  </div>
                  <Button className="w-full py-5 text-lg">
                    Valider la commande
                  </Button>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
