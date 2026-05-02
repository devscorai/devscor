# devscor

Sitio web oficial de **devscor** — agencia digital de Lima, Perú. Diseñamos páginas web modernas para negocios que quieren verse más profesionales y vender mejor.

🌐 [devscor.com](https://devscor.com)

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) sobre [Base UI](https://base-ui.com)
- [Motion](https://motion.dev) (Framer Motion) para animaciones
- [Iconify](https://iconify.design) para iconos
- [next-themes](https://github.com/pacocoursey/next-themes) para light/dark mode
- TypeScript + ESLint

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
app/                    Rutas (App Router)
  ├─ page.tsx           Homepage
  ├─ proceso/           Cómo trabajamos
  ├─ casos/             Portafolio
  ├─ precios/           Planes
  ├─ servicios/         Index + 4 detalles de servicio
  └─ legal/             Términos y privacidad
components/             Componentes UI
  ├─ sections/          Secciones del homepage
  ├─ ui/                Primitivas shadcn
  └─ ...                Componentes propios
config/                 Datos del sitio (nav, precios, FAQ, proyectos)
public/                 Assets estáticos
lib/                    Utilidades
```

## Configuración

Toda la información editable del sitio vive en `config/`:

- `site.ts` — metadata, navegación, links sociales, contacto
- `pricing.ts` — planes y precios
- `projects.ts` — portafolio
- `faq.ts` — preguntas frecuentes

## Licencia

Código y diseño © devscor. Todos los derechos reservados.
