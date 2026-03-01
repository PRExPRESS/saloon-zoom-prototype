import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

// ─── Constants ────────────────────────────────────────────────────────────────

const FEATURED_TEAM = [
  {
    name: 'Sarah Fernando',
    designation: 'Creative Director',
    specialty: 'Master Hairdresser',
    credential: 'City & Guilds UK · NVQ Level 4',
    bio: '15+ years across Dubai & Singapore. Specialist in structural styling and total hair recovery.',
    image: 'https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1287&auto=format&fit=crop',
    bookHref: '/booking',
  },
  {
    name: 'Malik Silva',
    designation: 'Senior Hairdresser',
    specialty: "Men's Grooming Specialist",
    credential: 'City & Guilds UK · London Barbering Masterclass',
    bio: '5 years at luxury Maldives resort salons. Renowned for precision fading and superior grooming.',
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=1336&auto=format&fit=crop',
    bookHref: '/booking',
  },
  {
    name: 'Natasha Perera',
    designation: 'Pro Colour Maestro',
    specialty: 'Advanced Colorimetry',
    credential: 'Olaplex Specialist · Official Colour Educator',
    bio: '12 years of elite colour expertise. Trusted for flawless balayage and corrective colour work.',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1469&auto=format&fit=crop',
    bookHref: '/booking',
  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function TeamSection() {
  return (
    <section className="py-24 px-5 md:px-10 lg:px-[10%] xl:px-[20%] bg-bg-section">
      <div>

        {/* Section header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-zoom-orange font-[--font-montserrat] uppercase tracking-[3px] font-bold text-xs mb-3">
                The Professionals
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[--font-montserrat] font-extrabold tracking-tight">
                Meet Your Stylists
              </h2>
            </div>
            <Link
              href="/team"
              className="hidden md:inline-flex items-center gap-2 text-xs font-[--font-montserrat] font-semibold uppercase tracking-widest text-[--color-text-muted] hover:text-zoom-orange transition-colors group"
            >
              Full Team
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {FEATURED_TEAM.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 0.12}>
              <TeamCard member={member} />
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile view all */}
        <AnimatedSection delay={0.4} className="mt-10 flex justify-center md:hidden">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-[--font-montserrat] font-semibold uppercase tracking-widest text-[--color-text-muted] hover:text-zoom-orange transition-colors group"
          >
            Meet the Full Team
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface TeamMember {
  name: string
  designation: string
  specialty: string
  credential: string
  bio: string
  image: string
  bookHref: string
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="group overflow-hidden border-[--color-border] hover:border-zoom-orange/30 hover:shadow-[0_8px_40px_rgba(243,112,33,0.08)] transition-all duration-500">
      {/* Portrait */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        <Badge
          variant="secondary"
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-zinc-800 border-0 font-[--font-montserrat] text-[10px] font-bold uppercase tracking-[1.5px]"
        >
          {member.specialty}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-6">
        <h3 className="font-[--font-montserrat] text-lg font-extrabold tracking-tight mb-0.5">
          {member.name}
        </h3>
        <p className="text-xs font-semibold text-zoom-orange uppercase tracking-[1.5px] mb-3">
          {member.designation}
        </p>
        <p className="text-sm text-[--color-text-muted] font-[--font-inter] leading-relaxed mb-4">
          {member.bio}
        </p>
        <Separator className="mb-4" />
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-[--color-text-muted] font-medium max-w-[60%] leading-relaxed">
            {member.credential}
          </p>
          <Link
            href={member.bookHref}
            className="text-[10px] font-[--font-montserrat] font-bold uppercase tracking-widest text-zoom-orange hover:text-zoom-orange-hover transition-colors inline-flex items-center gap-1 group/link"
          >
            Book
            <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
