import type { Metadata } from "next"

import { CTA } from "@/components/sections/cta"
import { PageHero } from "@/components/page-hero"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Términos y condiciones de uso del sitio web de ${siteConfig.name} y de los servicios ofrecidos.`,
}

const lastUpdated = "1 de mayo de 2026"

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
        lead="Las reglas claras que aplican al usar nuestro sitio y contratar nuestros servicios."
      />

      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            Última actualización: {lastUpdated}
          </p>

          <Section title="1. Aceptación de los términos">
            <p>
              Al acceder y utilizar el sitio web de {siteConfig.name} (en
              adelante, &ldquo;el Sitio&rdquo;) y/o contratar cualquiera de
              nuestros servicios, aceptas quedar vinculado por los siguientes
              términos y condiciones. Si no estás de acuerdo con alguno de
              ellos, te pedimos que no utilices nuestros servicios.
            </p>
          </Section>

          <Section title="2. Servicios ofrecidos">
            <p>
              {siteConfig.name} es una agencia digital con sede en{" "}
              {siteConfig.location} que ofrece servicios de diseño y desarrollo
              de páginas web, landing pages, rediseño de sitios existentes y, a
              futuro, automatizaciones con inteligencia artificial.
            </p>
            <p>
              Cada proyecto se confirma mediante una propuesta escrita que
              detalla el alcance, los entregables, los tiempos y el precio
              acordado. Esa propuesta forma parte integral de estos términos.
            </p>
          </Section>

          <Section title="3. Proceso de contratación">
            <p>
              El proceso típico incluye: (1) conversación inicial para entender
              tu negocio, (2) propuesta concreta con alcance y precio, (3) pago
              de adelanto para iniciar el proyecto, (4) diseño y construcción
              con feedback continuo y (5) lanzamiento y entrega.
            </p>
            <p>
              El proyecto se considera oficialmente iniciado al momento de
              recibir el adelanto acordado.
            </p>
          </Section>

          <Section title="4. Pagos">
            <p>
              Los precios se expresan en soles peruanos (S/) y, salvo indicación
              contraria, no incluyen IGV. La estructura de pago estándar es 50%
              al iniciar el proyecto y 50% al entregar, salvo que se acuerde
              algo distinto por escrito.
            </p>
            <p>
              El pago final habilita la publicación del sitio y la transferencia
              de credenciales y archivos al cliente.
            </p>
          </Section>

          <Section title="5. Propiedad intelectual">
            <p>
              Una vez efectuado el pago total, el cliente adquiere los derechos
              de uso del diseño y del código entregado para el proyecto
              específico. {siteConfig.name} se reserva el derecho a reutilizar
              fragmentos de código genéricos, librerías de terceros y
              metodologías propias.
            </p>
            <p>
              Salvo que el cliente indique lo contrario por escrito,{" "}
              {siteConfig.name} podrá mostrar el proyecto terminado en su
              portafolio público con fines promocionales.
            </p>
          </Section>

          <Section title="6. Plazos y entregas">
            <p>
              Los plazos comunicados en la propuesta se calculan en días hábiles
              y dependen del feedback oportuno por parte del cliente. Cualquier
              demora en respuestas, entrega de contenido, imágenes, accesos o
              aprobaciones extiende el plazo de entrega proporcionalmente.
            </p>
          </Section>

          <Section title="7. Cambios y revisiones">
            <p>
              Cada plan incluye una cantidad razonable de rondas de revisión
              indicadas en la propuesta. Cambios de alcance significativos —
              añadir páginas, integraciones o funcionalidades fuera de lo
              acordado — se cotizan por separado.
            </p>
          </Section>

          <Section title="8. Hosting y dominio">
            <p>
              Si el plan contratado incluye hosting y/o dominio por un periodo
              determinado, al finalizar dicho periodo el cliente puede
              renovarlos directamente con nosotros o migrarlos a su propio
              proveedor. {siteConfig.name} entrega todas las credenciales
              necesarias para hacerlo.
            </p>
          </Section>

          <Section title="9. Limitación de responsabilidad">
            <p>
              {siteConfig.name} no se hace responsable por pérdidas indirectas,
              lucro cesante o daños derivados del uso (o imposibilidad de uso)
              del sitio entregado. La responsabilidad máxima se limita al monto
              total pagado por el proyecto en cuestión.
            </p>
            <p>
              No nos hacemos responsables por contenido subido o gestionado por
              el cliente, ni por servicios externos integrados al sitio (pasarelas
              de pago, APIs de terceros, redes sociales, etc.).
            </p>
          </Section>

          <Section title="10. Confidencialidad">
            <p>
              Toda información sensible compartida durante el proyecto
              (estrategia de negocio, datos de clientes, planes futuros) se
              trata con confidencialidad y no se comparte con terceros sin
              autorización expresa.
            </p>
          </Section>

          <Section title="11. Cancelación">
            <p>
              El cliente puede cancelar el proyecto en cualquier momento. Si la
              cancelación ocurre antes de iniciar, se reembolsa el adelanto. Si
              ocurre durante el proyecto, se factura el trabajo realizado hasta
              la fecha y no se reembolsa el adelanto ya consumido.
            </p>
          </Section>

          <Section title="12. Modificaciones a estos términos">
            <p>
              Estos términos pueden actualizarse de tiempo en tiempo. La fecha
              de última actualización se indica al inicio del documento. El uso
              continuado del Sitio o la contratación de nuevos servicios implica
              aceptación de la versión vigente.
            </p>
          </Section>

          <Section title="13. Ley aplicable">
            <p>
              Estos términos se rigen por las leyes de la República del Perú.
              Cualquier controversia se resolverá en los tribunales de Lima,
              Perú.
            </p>
          </Section>

          <Section title="14. Contacto">
            <p>
              Para cualquier consulta sobre estos términos, escríbenos a{" "}
              <a
                href={siteConfig.links.email}
                className="text-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.links.email.replace("mailto:", "")}
              </a>{" "}
              o por{" "}
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-4 hover:underline"
              >
                WhatsApp
              </a>
              .
            </p>
          </Section>
        </div>
      </section>

      <CTA />
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
