'use client'

import Link from 'next/link'
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'

// ─── Constants ────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      'Sarah completely transformed my hair. The balayage she did looked like it was from a London editorial shoot. I have never felt this confident walking out of a salon.',
    name: 'Dilini R.',
    detail: 'Balayage & Gloss Treatment',
    rating: 5,
  },
  {
    quote:
      "Malik is in a class of his own when it comes to men's grooming. The fade was surgical. I've been coming every three weeks since my first visit — says everything.",
    name: 'Ashen W.',
    detail: 'Premium Mens Grooming',
    rating: 5,
  },
  {
    quote:
      'The Brazilian Keratin with Natasha was a revelation. My hair has never been this smooth. The studio itself is stunning — it feels like a proper luxury experience.',
    name: 'Priya M.',
    detail: 'Brazilian Keratin Treatment',
    rating: 5,
  },
  {
    quote:
      "I've tried salons across Colombo and nothing compares. The Director's Cut was worth every rupee — my hair has never held shape this well after a cut.",
    name: 'Ravindu K.',
    detail: "Director's Cut & Style",
    rating: 5,
  },
  {
    quote:
      "Natasha's colour work is extraordinary. She corrected two years of DIY damage in a single session. The result was cleaner than anything I've seen in a magazine.",
    name: 'Imesha S.',
    detail: 'Full Colour Correction',
    rating: 5,
  },
] as const

const TRUST_STATS = [
  { value: '10,000+', label: 'Happy Clients' },
  { value: '4.9 / 5',  label: 'Average Rating' },
  { value: '8 Years',  label: 'In Business' },
  { value: '15+',      label: 'Expert Stylists' },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const autoplayPlugin = useCallback(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  )

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    
    // Initialize current slide
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  return (
    <section className="py-24 px-5 md:px-10 lg:px-[10%] xl:px-[20%] overflow-hidden">
      <div className="max-w-300 mx-auto">

        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-zoom-orange font-[--font-montserrat] uppercase tracking-[3px] font-bold text-xs mb-3">
                Client Stories
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[--font-montserrat] font-extrabold tracking-tight">
                Trusted by Thousands
              </h2>
            </div>

            {/* Nav controls + review link */}
            <div className="flex items-center gap-4">
              <Link
                href="/reviews"
                className="hidden md:inline-flex items-center gap-2 text-xs font-[--font-montserrat] font-semibold uppercase tracking-widest text-[--color-text-muted] hover:text-zoom-orange transition-colors group"
              >
                Read All Reviews
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={scrollPrev}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full border border-[--color-border] flex items-center justify-center text-[--color-text-muted] hover:border-zoom-orange hover:text-zoom-orange transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollNext}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full border border-[--color-border] flex items-center justify-center text-[--color-text-muted] hover:border-zoom-orange hover:text-zoom-orange transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <AnimatedSection delay={0.15}>
          <Carousel
            setApi={setApi}
            plugins={[autoplayPlugin()]}
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-5">
              {TESTIMONIALS.map((testimonial) => (
                <CarouselItem
                  key={testimonial.name}
                  className="pl-5 basis-[90%] sm:basis-[70%] md:basis-[45%] lg:basis-[34%]"
                >
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </AnimatedSection>

        {/* Dot indicators + mobile review link */}
        <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === current
                  ? 'w-6 bg-zoom-orange'
                  : 'w-1.5 bg-[--color-border] hover:bg-zoom-orange/40'
              )}
            />
          ))}
        </div>

        <Link
          href="/reviews"
          className="md:hidden inline-flex items-center gap-1.5 text-xs font-[--font-montserrat] font-semibold uppercase tracking-widest text-[--color-text-muted] hover:text-zoom-orange transition-colors group"
        >
          All Reviews
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Trust bar */}
      <AnimatedSection delay={0.3} className="mt-16">
        <Separator className="mb-12" />
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {TRUST_STATS.map((stat) => (
            <TrustStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </AnimatedSection>

      </div>
    </section>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface Testimonial {
  quote: string
  name: string
  detail: string
  rating: number
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full flex flex-col border-[--color-border] hover:border-zoom-orange/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)] transition-all duration-500">
      <CardContent className="p-7 md:p-8 flex flex-col flex-1">
        {/* Stars */}
        <div className="flex gap-1 mb-5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-zoom-orange text-zoom-orange" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm font-[--font-inter] leading-relaxed text-[--color-text-main] flex-1 mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <Separator className="mb-5" />

        {/* Attribution */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zoom-orange/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-[--font-montserrat] font-extrabold text-zoom-orange">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-[--font-montserrat] font-bold text-[--color-text-main]">
              {testimonial.name}
            </p>
            <p className="text-[10px] text-[--color-text-muted] uppercase tracking-[1px] font-medium">
              {testimonial.detail}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-[--font-montserrat] text-3xl md:text-4xl font-extrabold text-[--color-text-main] mb-1">
        {value}
      </p>
      <p className="text-[10px] font-medium text-[--color-text-muted] uppercase tracking-widest">
        {label}
      </p>
    </div>
  )
}
