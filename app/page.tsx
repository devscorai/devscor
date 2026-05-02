import { CTA } from "@/components/sections/cta"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Pricing } from "@/components/sections/pricing"
import { Process } from "@/components/sections/process"
import { Services } from "@/components/sections/services"
import { Showcase } from "@/components/sections/showcase"
import { WhyUs } from "@/components/sections/why-us"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Showcase />
      <Process />
      <WhyUs />
      <Pricing />
      <Faq />
      <CTA />
    </>
  )
}
