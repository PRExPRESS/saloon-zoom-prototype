import Image from 'next/image'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export function AboutSection() {
  return (
    <section className="py-24 px-5 md:px-10 lg:px-[10%] xl:px-[20%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <AnimatedSection>
          <div className="relative h-[400px] w-full rounded overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2670"
              alt="Salon Styling"
              fill
              className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div>
            <h2 className="text-3xl md:text-4xl font-[--font-montserrat] font-bold mb-5">
              The <span className="text-zoom-orange">ZOOM</span> Experience
            </h2>
            <p className="text-[--color-text-muted] font-[--font-inter] mb-4 leading-relaxed">
              We believe that your hair is your ultimate accessory. Our award-winning stylists combine avant-garde techniques with classic elegance to create a look that is uniquely yours.
            </p>
            <p className="text-[--color-text-muted] font-[--font-inter] mb-8 leading-relaxed">
              Whether you&apos;re looking for a dramatic color transformation, a precision cut, or premium grooming, we deliver uncompromising quality in a luxurious, relaxing environment.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[--color-border]">
              <div>
                <h3 className="text-5xl md:text-6xl font-[--font-montserrat] text-[--color-zoom-orange] mb-2">10k+</h3>
                <p className="text-sm font-[--font-inter] uppercase tracking-wider text-[--color-text-muted]">Happy Clients</p>
              </div>
              <div>
                <h3 className="text-5xl md:text-6xl font-[--font-montserrat] text-[--color-zoom-orange] mb-2">15+</h3>
                <p className="text-sm font-[--font-inter] uppercase tracking-wider text-[--color-text-muted]">Expert Stylists</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
