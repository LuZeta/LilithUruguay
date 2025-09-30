"use client"

import { CSSProperties, useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Marcellus, Poppins } from "next/font/google"

import { publicPath } from "@/lib/publicPath"

type HighlightSlide = {
  id: string
  imageUrl: string
  alt: string
  title: string
  text: string
}

type LilithHeroProps = {
  slides: HighlightSlide[]
  logoSrc: string
}

const marcellus = Marcellus({ subsets: ["latin"], weight: "400" })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] })

const clipPathLeft = "path('M 0% 0% H 88% C 96% 20% 92% 36% 86% 48% C 80% 60% 94% 80% 86% 100% H 0% 100% Z')"
const clipPathRight = "path('M 100% 0% H 12% C 4% 20% 8% 36% 14% 48% C 20% 60% 6% 80% 14% 100% H 100% 100% Z')"

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -70 : 70,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  }),
}

const imageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -35 : 35,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  }),
}

const textVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 25 : -25,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.05 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -25 : 25,
    transition: { duration: 0.45, ease: "easeInOut" as const },
  }),
}

function LilithSplitHero({ slides, logoSrc }: LilithHeroProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const total = slides.length
  const activeSlide = slides[index]
  const imageOnLeft = index % 2 === 0

  const clipShape = imageOnLeft ? clipPathLeft : clipPathRight
  const panelClipShape = imageOnLeft ? clipPathRight : clipPathLeft

  const clipStyle = useMemo(
    () => ({ "--clip-shape": clipShape } as CSSProperties),
    [clipShape]
  )

  const panelClipStyle = useMemo(
    () => ({ "--panel-clip": panelClipShape } as CSSProperties),
    [panelClipShape]
  )

  useEffect(() => {
    if (!total || paused) return
    const timer = setInterval(() => {
      setDirection(1)
      setIndex((current) => (current + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [paused, total])

  const handlePrev = useCallback(() => {
    if (!total) return
    setDirection(-1)
    setIndex((current) => (current - 1 + total) % total)
  }, [total])

  const handleNext = useCallback(() => {
    if (!total) return
    setDirection(1)
    setIndex((current) => (current + 1) % total)
  }, [total])

  const handleSelect = useCallback(
    (target: number) => {
      if (target === index || !total) return
      setDirection(target > index ? 1 : -1)
      setIndex((target + total) % total)
    },
    [index, total]
  )

  const handlers = useMemo(
    () => ({
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocusCapture: () => setPaused(true),
      onBlurCapture: () => setPaused(false),
    }),
    []
  )

  return (
    <section
      aria-label="Destacados Lilith"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#f7f4ef] via-[#f5f1ed] to-[#f2ece6]"
      {...handlers}
    >
      <div className="mx-auto w-full px-0 pt-0 pb-12 sm:pb-14 lg:pb-16">
        <div className="relative mx-auto w-full max-w-[min(1200px,95vw)]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative overflow-hidden rounded-[3rem] bg-white shadow-[0_45px_130px_-60px_rgba(17,17,17,0.45)]"
            >
              <div className="flex min-h-[380px] flex-col lg:min-h-[500px] lg:flex-row">
                <motion.div
                  custom={direction}
                  variants={imageVariants}
                  className={`relative flex-1 min-h-[280px] ${imageOnLeft ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div
                    className="relative h-64 w-full overflow-hidden transition-transform duration-500 [clip-path:none] lg:h-full lg:[clip-path:var(--clip-shape)]"
                    style={clipStyle}
                  >
                    <Image
                      src={activeSlide.imageUrl}
                      alt={activeSlide.alt}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 52vw, (min-width: 768px) 70vw, 100vw"
                    />
                  </div>
                </motion.div>

                <motion.div
                  custom={direction}
                  variants={textVariants}
                  className={`flex flex-1 items-center overflow-hidden bg-white [clip-path:none] lg:[clip-path:var(--panel-clip)] ${
                    imageOnLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                  style={panelClipStyle}
                >
                  <div
                    className={`${poppins.className} mx-auto flex w-full max-w-xl flex-col gap-7 px-8 py-12 text-[#111] sm:px-12 lg:px-16`}
                  >
                    <Link
                      href="/"
                      className="inline-flex w-max items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm ring-1 ring-[#111]/10"
                    >
                      <Image src={logoSrc} alt="Lilith" width={150} height={46} className="h-auto w-36" />
                    </Link>
                    <div className="space-y-4">
                      <h2
                        className={`${marcellus.className} text-xl font-semibold leading-tight tracking-tight text-[#111] sm:text-2xl lg:text-[1.75rem]`}
                      >
                        {activeSlide.title}
                      </h2>
                      <p className="text-base leading-relaxed text-[#111]/70 sm:text-lg">
                        {activeSlide.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-6 left-6 flex gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Slide anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#111]/15 bg-white/90 text-[#111] shadow-sm transition hover:border-[#111]/40 hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute bottom-6 right-6 flex gap-3">
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Slide siguiente"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#111]/15 bg-white/90 text-[#111] shadow-sm transition hover:border-[#111]/40 hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 px-6">
          {slides.map((slide, i) => {
            const isActive = i === index
            return (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ir al destacado ${i + 1}`}
                onClick={() => handleSelect(i)}
                className={`relative h-3 rounded-full transition-all duration-300 ${
                  isActive ? "w-12 bg-[#111]" : "w-3 bg-[#111]/35 hover:bg-[#111]/55"
                }`}
              >
                <span className="sr-only">{slide.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const heroSlides: HighlightSlide[] = [
  {
    id: "slide-1",
    imageUrl: publicPath("/images/slide1.png"),
    alt: "Lilith bombacha ecológica",
    title: "Decile adiós a las compresas desechables",
    text: "elige una alternativa reutilizable y amigable con tu cuerpo y el planeta",
  },
  {
    id: "slide-2",
    imageUrl: publicPath("/images/slide2.png"),
    alt: "Bombacha y paño absorbente",
    title: "Lo natural no es tirar",
    text: "productos sostenibles que respetan tu salud y reducen resíduos",
  },
  {
    id: "slide-3",
    imageUrl: publicPath("/images/slide3.png"),
    alt: "Detalle de la tela Lilith",
    title: "Bienestar que cuida tu economía",
    text: "ahorra cada mes sin renunciar a tu comodidad y seguridad",
  },
  {
    id: "slide-4",
    imageUrl: publicPath("/images/slide4.png"),
    alt: "Textura suave de tela",
    title: "Segura y fresca todos los días",
    text: "protección confiable que te mantiene cómoda y libre de preocupaciones",
  },
  {
    id: "slide-5",
    imageUrl: publicPath("/images/slide5.png"),
    alt: "Mano sosteniendo tela Lilith",
    title: "Absorción íntima consciente",
    text: "tecnología pensada para tu cuidado, tu cuerpo y tu equilibrio diario",
  },
]

export function Hero() {
  return <LilithSplitHero slides={heroSlides} logoSrc={publicPath("/images/logobackground.png")} />
}
