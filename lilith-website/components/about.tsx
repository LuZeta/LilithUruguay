import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function About() {
  return (
    <section id="nosotros" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Nosotros</h2>

          {/* ¿Qué es Lilith? */}
          <Card className="border-accent/20 shadow-lg mb-10">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl md:text-3xl text-foreground">¿Qué es Lilith?</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                {/* Imagen redonda a la izquierda en desktop */}
                <div className="order-1">
                  <div className="aspect-square relative overflow-hidden rounded-full max-w-xs md:max-w-sm mx-auto ring-2 ring-accent/30 shadow-md">
                    <Image
                      src="/images/bombacha.jpg"
                      alt="Bombacha Lilith"
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 40vw, 80vw"
                    />
                  </div>
                </div>
                {/* Texto a la derecha */}
                <div className="order-2">
                  <p className="text-lg leading-relaxed text-card-foreground mb-4">
                    <strong className="text-primary">Lilith</strong> es una bombacha saludable, reutilizable y
                    absorbente, pensada para acompañar las necesidades más íntimas de las mujeres a lo largo de su ciclo
                    de vida. Cada prenda combina confort, salud y sustentabilidad con un diseño cuidado.
                  </p>
                  <p className="text-lg leading-relaxed text-card-foreground">
                    No es solo una prenda: es una elección consciente, un gesto de amor propio y también de
                    responsabilidad.
                    <span className="ml-1 font-semibold text-accent">Una estrategia en salud.</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sobre Rossina */}
          <Card className="border-accent/20 shadow-lg">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl md:text-3xl text-foreground">Sobre Rossina</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                <div className="order-2 md:order-1">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-card-foreground mb-6">
                      Soy <strong className="text-primary">Rossina</strong>, mujer, madre y Partera. Desde mi trayectoria y
                      especialidad en la salud femenina he aprendido a escuchar cuerpos, historias y ciclos. En mi camino
                      fui comprendiendo la importancia de conectar con nuestra naturaleza para devolvernos la dignidad y
                      libertad de ser nosotras mismas.
                    </p>

                    <p className="text-lg leading-relaxed text-card-foreground mb-0">
                      Desde un conocimiento profundo y una fuerte convicción nació Lilith: creada con respeto y amor para
                      acompañarte día a día.
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative w-full">
                    <div className="aspect-square relative overflow-hidden rounded-full max-w-xs mx-auto ring-2 ring-accent/30 shadow-md">
                      <Image
                        src="/images/rossinaPerfil.jpg"
                        alt="Foto de Rossina"
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 30vw, 60vw"
                      />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">Partera y fundadora de Lilith</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
