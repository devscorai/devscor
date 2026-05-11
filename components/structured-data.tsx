interface StructuredDataProps {
  /** El objeto schema.org a serializar como JSON-LD */
  data: object
  /** ID opcional del <script> para debugging en DevTools */
  id?: string
}

/**
 * Renderiza un bloque <script type="application/ld+json"> con structured data.
 *
 * Se inyecta directamente en el HTML server-side, así los crawlers de Google,
 * Bing, etc. lo leen sin necesidad de ejecutar JavaScript.
 */
export function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
