import Image from "next/image"
import { publicPath } from "@/lib/publicPath"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function About() {
  return (
    <section id="nosotras" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Nosotras</h2>

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
                      src={publicPath("/images/bombacha.jpg")}
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
                    <strong className="text-primary">Lilith</strong> es la primera bombacha ecológica y reutilizable de
                    Uruguay pensada y diseñada para absorber orina. Lilith te cuida todos los días con confort y
                    frescura.
                  </p>
                  <p className="text-lg leading-relaxed text-card-foreground">
                    Es más que una bombacha, es una elección consciente, un gesto de amor propio y también de
                    responsabilidad. Con Lilith tomas el control de tu salud íntima.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sobre Rossina */}
          <Card className="border-accent/20 shadow-lg">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl md:text-3xl text-foreground">Sobre su fundadora</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                <div className="order-2 md:order-1">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-card-foreground mb-6">
                      Bienvenida a Lilith, mi nombre es <strong className="text-primary">Rossina</strong>. Soy Partera
                      profesional. Mi propósito personal y como partera es cuidar la salud de las mujeres con dignidad,
                      conciencia y autonomía. Lilith es una extensión de ese propósito, transformando una necesidad
                      invisibilizada en una alternativa sostenible, saludable y accesible para miles de mujeres.
                    </p>

                    <p className="text-lg leading-relaxed text-card-foreground mb-6">
                      En los próximos años sueño con que Lilith se convierta en una referencia en innovación íntima
                      femenina para las mujeres de América Latina. Logrando que millones de mujeres dejen atrás los
                      productos descartables y reduciendo juntas toneladas de residuos plásticos que contaminan nuestro
                      hermoso planeta.
                    </p>

                    <p className="text-lg leading-relaxed text-card-foreground mb-0">
                      Gracias por estar aquí y sumarte a este gran propósito. Lilith, todos los días contigo.
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative w-full">
                    <div className="aspect-square relative overflow-hidden rounded-full max-w-xs mx-auto ring-2 ring-accent/30 shadow-md">
                      <Image
                        src={publicPath("/images/rossinaPerfil.jpg")}
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
