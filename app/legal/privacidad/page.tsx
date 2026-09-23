import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo ${siteConfig.name} trata la información de quienes visitan este sitio.`,
}

const lastUpdated = "23 de septiembre de 2026"

const email = siteConfig.links.email.replace("mailto:", "")

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Política de{" "}
            <span className="font-serif font-normal italic text-foreground/90">
              privacidad
            </span>
          </>
        }
        lead="Qué información puede quedar registrada al visitar este sitio o al escribirnos."
      />

      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            Última actualización: {lastUpdated}
          </p>

          <Section title="1. Responsable">
            <p>
              {siteConfig.name}, con sede en {siteConfig.location}, es
              responsable del tratamiento de los datos personales que se
              recojan a través de este sitio.
            </p>
          </Section>

          <Section title="2. Qué información puede recolectarse">
            <p>El sitio puede registrar:</p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                La información que envías si escribes a {email}
              </li>
              <li>
                Datos técnicos de navegación, como tipo de dispositivo y
                páginas visitadas
              </li>
              <li>
                La preferencia de tema claro u oscuro, guardada en el navegador
              </li>
            </ul>
          </Section>

          <Section title="3. Para qué se usa">
            <p>Esa información se usa para:</p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>Responder mensajes que nos envíes</li>
              <li>Operar y entender el uso del sitio</li>
              <li>Recordar la preferencia de tema</li>
            </ul>
          </Section>

          <Section title="4. Con quién se comparte">
            <p>
              La información se mantiene en {siteConfig.name}. Puede compartirse
              con proveedores técnicos necesarios para operar el sitio, o cuando
              una autoridad competente lo exija.
            </p>
          </Section>

          <Section title="5. Tus derechos">
            <p>
              De acuerdo con la Ley N° 29733 de Protección de Datos Personales
              del Perú, puedes solicitar acceso, corrección, eliminación u
              oposición al tratamiento de tus datos escribiendo a{" "}
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
