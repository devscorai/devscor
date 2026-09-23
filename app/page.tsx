import Image from "next/image"

import { IndigoLight } from "@/components/indigo-light"
import { ParticleMorph } from "@/components/particle-morph"
import { SocialLinks } from "@/components/social-links"

const shapes = [
  { src: "/simbolo-marfil.svg", fit: 0.9, hold: 2500 },
  { src: "/logo-marfil.svg", fit: 0.58, mobileFit: 0.86, hold: 5500 },
]

export default function Home() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#151515] font-body text-[#F5F3EE]"
      style={{ colorScheme: "dark" }}
    >
      <IndigoLight className="absolute inset-0 -z-10" />

      <main className="flex flex-1 flex-col items-center justify-center px-5 text-center">
        <h1>
          <span className="sr-only">Devscor</span>
          <ParticleMorph
            shapes={shapes}
            className="aspect-[760/300] w-[min(92vw,760px)]"
          >
            <Image
              src="/logo-marfil.svg"
              alt=""
              width={254}
              height={64}
              priority
              unoptimized
              className="h-auto w-[86%] min-[520px]:w-[58%]"
            />
          </ParticleMorph>
        </h1>
        <p className="-mt-6 font-label text-xs uppercase tracking-[0.18em] text-[#C9D9F1] animate-in fade-in fill-mode-both delay-300 duration-500">
          Software product studio · Próximamente
        </p>
      </main>

      <footer className="flex flex-col items-center gap-3 px-5 pb-8 font-label text-xs text-[#C9D9F1]">
        <SocialLinks />
        <p>
          made by{" "}
          <a
            href="https://jherry.me"
            target="_blank"
            rel="noreferrer"
            className="text-[#F5F3EE] underline decoration-[#C9D9F1]/40 underline-offset-4 hover:decoration-[#F5F3EE] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F3EE]"
          >
            jherry
          </a>
        </p>
      </footer>
    </div>
  )
}
