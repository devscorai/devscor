import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Términos de uso del sitio de ${siteConfig.name}.`,
}

const lastUpdated = "23 de septiembre de 2026"

const email = siteConfig.links.email.replace("mailto:", "")

export default function TerminosPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Términos y{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              condiciones
            </span>
          </>
        }
        lead="Estas reglas aplican al uso de este sitio."
      />

      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            Última actualización: {lastUpdated}
          </p>

          <Section title="1. Quiénes somos">
            <p>
              {siteConfig.name} es una compañía de productos de software con
              sede en {siteConfig.location}. Diseña, construye y desarrolla sus
              propios productos. Este sitio presenta a la compañía y a esos
              productos.
            </p>
          </Section>

          <Section title="2. Uso del sitio">
            <p>
              Puedes consultar el sitio para conocer a {siteConfig.name} y sus
              productos. No está permitido usar el sitio de forma que afecte su
              funcionamiento, su seguridad o los derechos de terceros.
            </p>
          </Section>

          <Section title="3. Propiedad intelectual">
            <p>
              El nombre {siteConfig.name}, su identidad visual, los nombres de
              sus productos y el contenido de este sitio pertenecen a{" "}
              {siteConfig.name}, salvo que se indique otra cosa. Queda reservado
              el derecho de uso sobre ese material.
            </p>
          </Section>

          <Section title="4. Productos">
            <p>
              La información publicada sobre un producto describe su existencia
              y su relación con {siteConfig.name}. El uso de cada producto se
              rige por las condiciones propias de ese producto, cuando existan.
            </p>
          </Section>

          <Section title="5. Ley aplicable">
            <p>
              Estos términos se rigen por las leyes de la República del Perú.
            </p>
          </Section>

          <Section title="6. Contacto">
            <p>
              Para consultas sobre estos términos, escribe a{" "}
              <a
                href={siteConfig.links.email}
                className="text-foreground underline-offset-4 hover:underline"
              >
                {email}
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}
