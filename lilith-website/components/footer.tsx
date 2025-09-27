import Link from "next/link"
import Image from "next/image"
import { publicPath } from "@/lib/publicPath"

export function Footer() {
  return (
    <footer className="bg-card border-t border-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={publicPath("/images/logo.png")}
                alt="Lilith"
                width={256}
                height={80}
                className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto"
                priority
              />
            </Link>
          </div>

          {/* Frase */}
          <div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Bombachas saludables, reutilizables y absorbentes creadas para acompañar las necesidades más íntimas de
              las mujeres con respeto y amor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#nosotros" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#preguntas-frecuentes" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="#store" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section removed as requested */}
        </div>

        <div className="border-t border-accent/20 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Lilith. Todos los derechos reservados. Hecho con amor para las mujeres.
          </p>
        </div>
      </div>
    </footer>
  )
}
