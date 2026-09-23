# devscor

Sitio de **devscor**, compañía independiente de productos de software.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) sobre [Base UI](https://base-ui.com)
- [Motion](https://motion.dev) para animaciones
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
  ├─ page.tsx           Compañía
  ├─ products/          Productos y páginas de cada producto
  ├─ about/             Nosotros
  └─ legal/             Términos y privacidad
components/             Componentes UI
config/                 Datos del sitio y de los productos
public/                 Assets estáticos
lib/                    Utilidades
```

## Licencia

Código y diseño © devscor. Todos los derechos reservados.
