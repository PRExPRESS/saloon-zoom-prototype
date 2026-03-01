import { Scissors, Palette, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

const SERVICES = [
  {
    icon: Scissors,
    title: 'Precision Cutting',
    description: 'Bespoke haircuts tailored to your face shape, lifestyle, and personal aesthetic by our master stylists.',
  },
  {
    icon: Palette,
    title: 'Color Mastery',
    description: 'From subtle balayage to vibrant transformations, using only the highest quality, damage-free products.',
  },
  {
    icon: Sparkles,
    title: 'Keratin & Botox',
    description: 'Restorative treatments that eliminate frizz, repair damage, and leave hair incredibly glossy and smooth.',
  },
] as const

export function ServicesSection() {
  return (
    <section className="py-24 px-5 md:px-10 lg:px-[10%] xl:px-[20%] bg-bg-section">
      <div>
        <AnimatedSection className="text-center mb-12">
          <p className="text-zoom-orange font-[--font-montserrat] uppercase tracking-[2px] font-bold text-sm mb-2">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[--font-montserrat] font-bold">
            Our Premium Services
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.15}>
              <Card className="hover:-translate-y-1 hover:border-b-[--color-zoom-orange] border-b-[3px] border-b-transparent transition-all">
                <CardContent className="p-10 md:p-11 text-center">
                  <service.icon className="w-10 h-10 text-zoom-orange mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-[--font-montserrat] font-bold mb-3">{service.title}</h3>
                  <p className="text-[--color-text-muted] font-[--font-inter] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
