import type { Metadata } from "next"

import { CTA } from "@/components/sections/cta"
import { PageHero } from "@/components/page-hero"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo ${siteConfig.name} recolecta, usa y protege la información personal de sus clientes y visitantes.`,
}

const lastUpdated = "1 de mayo de 2026"

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
        lead="Tu información es tuya. Aquí explicamos qué recolectamos, para qué y cómo la protegemos."
      />

      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            Última actualización: {lastUpdated}
          </p>

          <Section title="1. Quiénes somos">
            <p>
              {siteConfig.name} es una agencia digital con sede en{" "}
              {siteConfig.location}. Somos los responsables del tratamiento de
              los datos personales recolectados a través de nuestro sitio web y
              de los canales de contacto que ponemos a disposición.
            </p>
          </Section>

          <Section title="2. Qué información recolectamos">
            <p>
              Recolectamos únicamente la información que tú nos compartes
              voluntariamente, principalmente cuando nos contactas para
              cotizar un proyecto. Esto puede incluir:
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>Nombre y apellido</li>
              <li>Correo electrónico</li>
              <li>Número de WhatsApp o teléfono</li>
              <li>Nombre del negocio o empresa</li>
              <li>
                Información sobre el proyecto que necesitas (rubro, objetivos,
                referencias)
              </li>
            </ul>
            <p>
              Adicionalmente, nuestro sitio puede recolectar información
              técnica anónima de navegación (tipo de dispositivo, navegador,
              páginas visitadas) con fines analíticos.
            </p>
          </Section>

          <Section title="3. Para qué usamos tu información">
            <p>Usamos tu información personal exclusivamente para:</p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>Responder tus consultas y enviarte propuestas</li>
              <li>Coordinar y ejecutar proyectos contratados</li>
              <li>Enviar comunicaciones operativas relacionadas a tu proyecto</li>
              <li>
                Mejorar nuestro sitio y nuestros servicios mediante análisis
                agregados
              </li>
            </ul>
            <p>
              No usamos tu información para enviar publicidad invasiva ni la
              compartimos con terceros para fines comerciales.
            </p>
          </Section>

          <Section title="4. Con quién compartimos tu información">
            <p>
              Tu información se mantiene dentro de {siteConfig.name}. Solo se
              comparte con terceros en los siguientes casos puntuales:
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                Proveedores de servicios técnicos que necesitamos para operar
                (hosting, herramientas de email, analítica), siempre bajo
                acuerdos de confidencialidad
              </li>
              <li>
                Cuando exista una obligación legal de hacerlo ante una autoridad
                competente
              </li>
            </ul>
          </Section>

          <Section title="5. Cookies y tecnologías similares">
            <p>
              Nuestro sitio puede usar cookies estrictamente necesarias para su
              funcionamiento (por ejemplo, para recordar tu preferencia de tema
              claro/oscuro) y cookies analíticas anónimas que nos ayudan a
              entender cómo se usa el sitio.
            </p>
            <p>
              Puedes configurar tu navegador para rechazar cookies o eliminarlas
              en cualquier momento. Algunas funcionalidades del sitio podrían
              verse afectadas si lo haces.
            </p>
          </Section>

          <Section title="6. Cuánto tiempo conservamos tus datos">
            <p>
              Conservamos tus datos personales solo el tiempo necesario para los
              fines descritos: durante la atención de tu consulta, durante toda
              la ejecución del proyecto y por un periodo razonable adicional
              para fines fiscales y legales (típicamente 5 años, según la
              normativa peruana).
            </p>
          </Section>

          <Section title="7. Tus derechos">
            <p>
              De acuerdo con la Ley de Protección de Datos Personales del Perú
              (Ley N° 29733), tienes derecho a:
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>Acceder a la información personal que tenemos sobre ti</li>
              <li>Solicitar la corrección o actualización de datos inexactos</li>
              <li>Solicitar la eliminación de tus datos personales</li>
              <li>Oponerte al tratamiento de tus datos para fines específicos</li>
              <li>Revocar el consentimiento que nos hayas dado previamente</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a
                href={siteConfig.links.email}
                className="text-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.links.email.replace("mailto:", "")}
              </a>{" "}
              y responderemos en un plazo máximo de 20 días hábiles.
            </p>
          </Section>

          <Section title="8. Seguridad">
            <p>
              Aplicamos medidas razonables para proteger tu información:
              hosting con HTTPS, contraseñas seguras en herramientas internas,
              acceso restringido a información sensible y eliminación periódica
              de datos que ya no son necesarios.
            </p>
            <p>
              Aún así, ningún sistema digital es 100% infalible. En caso de
              detectar un incidente que afecte tus datos, te notificaremos a la
              brevedad.
            </p>
          </Section>

          <Section title="9. Menores de edad">
            <p>
              Nuestros servicios están dirigidos a personas mayores de edad
              (negocios, emprendedores, profesionales). No recolectamos
              intencionadamente información de menores de 18 años.
            </p>
          </Section>

          <Section title="10. Cambios a esta política">
            <p>
              Esta política puede actualizarse para reflejar cambios en nuestras
              prácticas o en la regulación aplicable. La fecha de última
              actualización se indica al inicio del documento.
            </p>
          </Section>

          <Section title="11. Contacto">
            <p>
              Para cualquier duda sobre esta política o sobre el tratamiento de
              tus datos, escríbenos a{" "}
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
