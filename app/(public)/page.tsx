import { HeroSection } from "@/components/home/HeroSection"
import { AboutSection } from "@/components/home/AboutSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { FeaturedPricingSection } from "@/components/home/FeaturedPricingSection"
import { TeamSection } from "@/components/home/TeamSection"

import { BookingCtaBanner } from "@/components/home/BookingCtaBanner"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedPricingSection />
      <TeamSection />
      <TestimonialsSection />
      <BookingCtaBanner />
    </>
  )
}
