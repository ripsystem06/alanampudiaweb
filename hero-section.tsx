'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const HeroCanvas = dynamic(() => import('@/components/hero-canvas'), { ssr: false })

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen overflow-hidden bg-background"
    >
      {/* ── Full-screen WebGL canvas ── */}
      <div className="absolute inset-0">
        <HeroCanvas className="w-full h-full" />
      </div>

      {/* ── Dark vignette — sides & bottom, keeps text legible ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.0) 38%, rgba(5,5,5,0.0) 62%, rgba(5,5,5,0.72) 100%), ' +
            'linear-gradient(to top,   rgba(5,5,5,0.80) 0%, rgba(5,5,5,0.0) 40%)',
        }}
      />

      {/* ── Text overlay ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-between px-6 md:px-12 pt-32 pb-10 pointer-events-none"
        style={{ y: textY, opacity }}
      >
        {/* Top row — eyebrow */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-8 bg-primary" style={{ boxShadow: '0 0 8px oklch(0.93 0.23 128 / 0.8)' }} />
          <span
            className="font-sans text-[10px] tracking-[0.45em] uppercase text-primary"
            style={{ textShadow: '0 0 16px oklch(0.93 0.23 128 / 0.6)' }}
          >
            SCORE Trophy Truck · #1 · Campeón Mundial 2024
          </span>
        </motion.div>

        {/* Bottom section — name + hint */}
        <div className="flex flex-col gap-4">
          {/* Giant split name */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-display font-900 uppercase leading-[0.88] tracking-tight text-foreground"
                style={{ fontSize: 'clamp(4.5rem, 12vw, 13rem)' }}
              >
                <span className="block text-foreground">Alan</span>
                <span
                  className="block text-primary"
                  style={{ textShadow: '0 0 40px oklch(0.93 0.23 128 / 0.4)' }}
                >
                  Ampudia
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Bottom row — location + brush hint */}
          <motion.div
            className="flex items-end justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Ensenada · Baja California · México
            </p>

            {/* Brush hint */}
            <div className="flex items-center gap-3 pointer-events-none">
              <motion.div
                className="w-1.5 h-1.5 bg-primary"
                style={{ boxShadow: '0 0 8px oklch(0.93 0.23 128 / 1)' }}
                animate={{ scale: [1, 2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                Pasa el cursor para revelar
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.2 }}
      >
        <motion.div
          className="w-px h-10 bg-primary/50 origin-top"
          animate={{ scaleY: [1, 0.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
        <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-muted-foreground">Scroll</span>
      </motion.div>

      {/* ── Watermark ── */}
      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-900 leading-none select-none pointer-events-none text-foreground/[0.06] z-0"
        style={{ fontSize: 'clamp(10rem, 22vw, 22rem)' }}
        aria-hidden="true"
      >
        #1
      </div>
    </section>
  )
}
