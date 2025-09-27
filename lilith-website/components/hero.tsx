"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Slide = {
  src: string
  alt: string
  text: string
}

const slides: Slide[] = [
  {
    src: "/images/bombacha.jpg",
    alt: "Cuidado íntimo, natural y consciente",
    text: "Cuidado íntimo, natural y consciente",
  },
  {
    src: "/images/bombachayabsor.jpg",
    alt: "Algodón y bambú: suavidad que respira",
    text: "Algodón y bambú: suavidad que respira",
  },
  {
    src: "/images/detalletela.jpg",
    alt: "Hechas a mano, pensadas para vos",
    text: "Hechas a mano, pensadas para vos",
  },
  {
    src: "/images/tela.jpg",
    alt: "Bienestar que empieza en tu piel",
    text: "Bienestar que empieza en tu piel",
  },
  {
    src: "/images/manotela.jpg",
    alt: "Lilith: confort que abraza tu esencia",
    text: "Lilith: confort que abraza tu esencia",
  },
]

export function Hero() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  // Optional auto-advance (every 6s). Comment out to disable.
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden" aria-label="Hero carousel">
      {/* Slides */}
      <div className="relative min-h-[80vh] w-full">
        {slides.map((slide, i) => (
          <div
            key={slide.src + i}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover pointer-events-none"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            {/* Content centered, shifted slightly below midline: logo → frase → puntos */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-end text-center px-4 pb-8 sm:pb-10 md:pb-12 lg:pb-14">
              <Link href="/" className="mb-3 sm:mb-4">
                <Image src="/images/logobackground.png" alt="Lilith" width={240} height={72} className="h-auto w-44 sm:w-60 md:w-72" />
              </Link>
              <h2 className="text-white drop-shadow-md text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold max-w-4xl text-balance">
                {slide.text}
              </h2>
              {/* Dots directly under the phrase */}
              <div className="mt-4 sm:mt-6 flex gap-2">
                {slides.map((_, di) => (
                  <button
                    key={di}
                    aria-label={`Ir al slide ${di + 1}`}
                    onClick={() => setIndex(di)}
                    className={`h-2.5 w-2.5 rounded-full transition ${di === index ? "bg-white" : "bg-white/50 hover:bg-white/70"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute z-20 left-3 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 transition"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        aria-label="Siguiente"
        onClick={next}
        className="absolute z-20 right-3 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 transition"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dots moved under the phrase on each slide */}
    </section>
  )
}
