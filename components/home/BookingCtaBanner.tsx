import Link from 'next/link'
import { CalendarCheck, Clock } from 'lucide-react'
import { ZoomButton } from '@/components/ui/zoom-button'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export function BookingCtaBanner() {
  return (
    <section className="py-24 px-5 md:px-10 lg:px-[10%] xl:px-[20%] bg-bg-dark overflow-hidden">
      <div className="max-w-300 mx-auto">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-10">

          {/* Large decorative word */}
          <span
            aria-hidden="true"
            className="absolute -top-8 -left-4 font-[--font-montserrat] font-extrabold text-[clamp(80px,14vw,180px)] text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter"
          >
            BOOK
          </span>

          {/* Left: copy */}
          <AnimatedSection className="relative z-10">
            <p className="text-zoom-orange font-[--font-montserrat] uppercase tracking-[3px] font-bold text-xs mb-4">
              Reserve Your Chair
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-[--font-montserrat] font-extrabold tracking-tight text-white leading-tight mb-4">
              Ready for Your<br />
              <em className="font-light italic text-zoom-orange">Transformation?</em>
            </h2>
            <div className="flex items-center gap-2 text-white/45">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <p className="text-xs font-[--font-inter]">
                Bookings require a minimum 24-hour notice. Walk-ins subject to availability.
              </p>
            </div>
          </AnimatedSection>

          {/* Right: CTAs */}
          <AnimatedSection delay={0.2} className="relative z-10 flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-4 shrink-0">
            <ZoomButton
              variant="primary"
              zoomSize="lg"
              leftIcon={<CalendarCheck className="w-4 h-4" />}
              asChild
            >
              <Link href="/booking">Book Your Transformation</Link>
            </ZoomButton>
            <ZoomButton variant="outline" zoomSize="lg" asChild className="border-white/25 text-white hover:bg-white hover:text-text-main">
              <Link href="/rates">Explore Services</Link>
            </ZoomButton>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
