import Image from "next/image"

import { IndigoLight } from "@/components/indigo-light"
import { SocialLinks } from "@/components/social-links"

export default function Home() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#151515] font-body text-[#F5F3EE]"
      style={{ colorScheme: "dark" }}
    >
      <IndigoLight className="absolute inset-0 -z-10" />

      <main className="flex flex-1 flex-col items-center justify-center px-5 text-center">
        <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          <span className="sr-only">Devscor</span>
          <Image
            src="/logo-marfil.svg"
            alt=""
            width={320}
            height={84}
            priority
            unoptimized
            className="h-auto w-[min(78vw,560px)]"
          />
        </h1>
        <p className="mt-6 max-w-[22ch] text-balance font-display text-[clamp(1.375rem,2.6vw,2rem)] font-medium leading-tight tracking-[-0.02em] animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-150 duration-500 ease-out">
          De la chispa al sistema.
        </p>
        <p className="mt-8 font-label text-xs uppercase tracking-[0.18em] text-[#C9D9F1] animate-in fade-in fill-mode-both delay-300 duration-500">
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
