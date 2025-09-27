"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "¿Cómo funcionan las bombachas LILITH?",
    a: (
      <p>
        Parecen una bombacha clásica, pero dentro tienen varias capas: absorbentes (sin efecto esponja), impermeables y
        antifugas. Absorben pérdidas de orina sin dejar humedad, olores ni filtraciones.
      </p>
    ),
  },
  {
    q: "¿Cuánto tiempo se pueden usar?",
    a: <p>Hasta 12 horas sin problema.</p>,
  },
  {
    q: "¿Cuándo usarlas?",
    a: (
      <p>
        Para absorber orina, flujo o sangre. Podés dejar de usar protectores y compresas descartables o combinarlas con
        copa o tampón. Ideales para sentirte segura todo el día.
      </p>
    ),
  },
  {
    q: "¿Cómo lavarlas?",
    a: (
      <p>
        Lavá a máx. 30 °C con jabón o detergente común. No uses secadora, plancha, cloro ni blanqueadores. Evitá
        suavizante porque reduce la absorción.
      </p>
    ),
  },
  {
    q: "¿Cuánto duran?",
    a: (
      <p>
        Hasta 300 lavados, como una bombacha de calidad superior. Cuanto mejor el cuidado, más larga su vida útil.
      </p>
    ),
  },
  {
    q: "¿Cuántas necesito?",
    a: (
      <p>
        Para uso diario recomendamos 5 a 7 unidades: siempre tendrás una lista y pueden durarte hasta 5 años.
      </p>
    ),
  },
  {
    q: "Ventajas de LILITH",
    a: (
      <div className="space-y-3">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Sin manchas:</strong> absorben pérdidas leves y moderadas.
          </li>
          <li>
            <strong>Secas y sin olores:</strong> sistema de capas que evita humedad y bacterias.
          </li>
          <li>
            <strong>Cómodas día y noche:</strong> incluso para dormir.
          </li>
          <li>
            <strong>Fáciles de limpiar:</strong> solo enjuague en agua fría antes de lavar.
          </li>
        </ul>
        <p>
          Perfectas para dormir, para los primeros o últimos días del ciclo y para jornadas largas fuera de casa.
        </p>
      </div>
    ),
  },
  {
    q: "¿Dónde se fabrican?",
    a: <p>En Uruguay.</p>,
  },
  {
    q: "¿De qué están hechas?",
    a: <p>Textiles de alta gama, orgánicos y libres de tóxicos. LILITH es única.</p>,
  },
]

export function Testimonials() {
  return (
    <section id="preguntas-frecuentes" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-card border border-accent/20 rounded-2xl shadow-sm p-6 md:p-10">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">Preguntas frecuentes</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Resolvemos tus dudas sobre cómo usar, cuidar y aprovechar al máximo tus Lilith.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-lg md:text-xl text-foreground">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
