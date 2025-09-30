"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Instagram, MessageCircle } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Send via mailto link
    const to = "bienvenida.lilith@gmail.com"
    const subject = encodeURIComponent("Consulta desde la web")
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )
    if (typeof window !== "undefined") {
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Contacto</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestros productos? Nos encantaría escucharte y acompañarte en tu elección.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="text-foreground">Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border-accent/20">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-accent mr-3" />
                    <a
                      href="mailto:bienvenida.lilith@gmail.com"
                      className="text-card-foreground hover:underline"
                    >
                      bienvenida.lilith@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-accent mr-3" />
                    <a
                      href="https://wa.me/59899256208"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-card-foreground hover:underline whitespace-nowrap"
                    >
                      +598 99 256 208
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Instagram className="h-5 w-5 text-accent mr-3" />
                    <a
                      href="https://www.instagram.com/lilith.care/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-card-foreground hover:underline"
                    >
                      instagram.com/lilith.care
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
