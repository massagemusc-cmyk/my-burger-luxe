import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="relative min-h-[92svh] flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Background photo */}
      <img
        src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&h=900&fit=crop&q=85"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        fetchPriority="high"
      />

      {/* Dark overlay — assure un contraste impeccable sur le texte */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/50"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent"
      />

      {/* Amber glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/6 blur-[140px] pointer-events-none"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        <motion.p
          variants={item}
          className="text-amber-500 text-sm font-semibold tracking-[0.22em] uppercase mb-5"
        >
          Fast-Food Premium
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl xs:text-6xl sm:text-7xl font-black tracking-tight leading-[0.92] mb-6"
        >
          <span className="text-zinc-100">LE GOÛT</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            DU VRAI.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-zinc-50 text-base xs:text-lg leading-relaxed max-w-sm mx-auto mb-10"
        >
          Burgers artisanaux, viandes sélectionnées,&nbsp;
          recettes qui font la différence.
        </motion.p>

        <motion.a
          variants={item}
          href="#menu"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-bold text-base transition-all duration-150 shadow-xl shadow-amber-500/30"
        >
          Découvrir la carte
          <ChevronDown className="w-4 h-4" />
        </motion.a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
