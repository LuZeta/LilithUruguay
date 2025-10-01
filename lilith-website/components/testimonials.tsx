"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "¿Cómo funcionan las bombachas LILITH?",
    a: (
      <div className="space-y-3">
        <p>
          Como cualquier bombacha clásica. La diferencia está en el interior: un sistema de capas de diferentes tejidos
          absorbentes e impermeables se encarga de captar el flujo sin dejar sensación de humedad ni olores.
        </p>
        <p>Su gran funcionalidad está en absorber leves pérdidas de orina.</p>
      </div>
    ),
  },
  {
    q: "¿Cuánto tiempo se pueden llevar las bombachas LILITH?",
    a: (
      <p>
        Están diseñadas para usarse como cualquier otra bombacha de uso cotidiano. El tiempo máximo dependerá de factores
        personales como la humedad y la comodidad.
      </p>
    ),
  },
  {
    q: "¿Cuándo usarlas?",
    a: (
      <div className="space-y-3">
        <p>Para absorber la orina y distintos tipos de flujo. Dependerá de cada mujer y de cada situación.</p>
        <p>
          Lo importante es que te hará sentir más segura: puedes eliminar los protectores y compresas descartables.
          También son el mejor aliado para complementar copas menstruales o tampones, especialmente si temes manchar el
          pantalón o el vestido.
        </p>
      </div>
    ),
  },
  {
    q: "¿Cuánto absorben?",
    a: <p>Hasta 20 cc.</p>,
  },
  {
    q: "¿Cómo lavarlas?",
    a: (
      <p>
        A mano o en lavadora, máximo a 30 °C, con jabones o detergentes habituales. Mantenelas alejadas de la secadora y
        la plancha, reducí al mínimo el suavizante porque puede afectar la absorción y evitá cloros o blanqueadores.
      </p>
    ),
  },
  {
    q: "¿Cuánto duran?",
    a: (
      <div className="space-y-3">
        <p>
          Uno de los motivos más importantes para considerar las bombachas LILITH es su bajo impacto en el medio ambiente
          y en tu salud: duran lo mismo que la ropa interior de calidad superior.
        </p>
        <p>Nuestras LILITH duran hasta 300 lavados y cuanto mejor las trates, más conservarán sus fibras naturales.</p>
      </div>
    ),
  },
  {
    q: "¿Cuántas LILITH tengo que tener?",
    a: (
      <div className="space-y-3">
        <p>
          El ahorro es otro de los muchos motivos por los que este producto de higiene íntima merece la pena: su vida útil
          se mide en decenas de lavados, muy superior a la de los productos de un solo uso.
        </p>
        <p>
          Si quieres tus LILITH para uso diario te recomendamos entre 5 y 7 unidades; así siempre tendrás una disponible,
          prolongarás la vida útil de cada pieza y conseguirás años de protección con una sola inversión inicial.
        </p>
      </div>
    ),
  },
  {
    q: "Ventajas de LILITH",
    a: (
      <div className="space-y-3">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>No manchan la ropa:</strong> funcionan a la perfección, absorben pérdidas de orina leves y moderadas.
          </li>
          <li>
            <strong>No tienes sensación de humedad:</strong> su sistema de capas te mantiene seca.
          </li>
          <li>
            <strong>No hay malos olores:</strong> evitan la proliferación bacteriana.
          </li>
          <li>
            <strong>Son muy cómodas:</strong> diseñadas para el uso cotidiano, durante el día y la noche. Puedes usarlas
            mientras duermes.
          </li>
          <li>
            <strong>Son fáciles de limpiar:</strong> basta con enjuagarlas un poco con agua fría antes de meterlas en la
            lavadora.
          </li>
          <li>
            <strong>Para dormir:</strong> la mayor comodidad, suavidad y confort.
          </li>
          <li>
            <strong>Para los primeros y los últimos días del ciclo:</strong> en lugar de llevar compresa o protectores,
            puedes usarlas para flujo ligero o moderado.
          </li>
          <li>
            <strong>Cuando vas a pasar muchas horas fuera de casa:</strong> será tu mejor protección.
          </li>
          <li>
            <strong>Basura CERO:</strong> cada mujer al año produce 8 kilos de basura en protectores y compresas
            descartables de un solo uso.
          </li>
        </ul>
      </div>
    ),
  },
  {
    q: "¿Dónde se fabrican las bombachas LILITH?",
    a: <p>Son hechas en Uruguay.</p>,
  },
  {
    q: "¿Cómo se componen?",
    a: (
      <div className="space-y-2">
        <p>Diseñadas con textiles especialmente seleccionados, de alta gama, libres de tóxicos y de origen orgánico.</p>
        <p>
          <strong>LILITH es única.</strong>
        </p>
      </div>
    ),
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
