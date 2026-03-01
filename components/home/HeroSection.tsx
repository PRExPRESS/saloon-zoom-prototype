'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ZoomButton } from '@/components/ui/zoom-button'

// ─── Constants ────────────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  { name: 'Pramudhini',    role: 'Junior Assistant',   left: '16%', bottom: '44%' },
  { name: 'Malik Silva',   role: 'Senior Hairdresser', left: '32%', bottom: '54%' },
  { name: 'Sarah Fernando',role: 'Creative Director',  left: '50%', bottom: '60%' },
  { name: 'Natasha Perera',role: 'Colour Maestro',     left: '67%', bottom: '53%' },
  { name: 'Amasha',        role: 'Junior Assistant',   left: '83%', bottom: '46%' },
] as const

const HERO_STATS = [
  { value: '15',  suffix: '+', label: 'Expert Stylists' },
  { value: '10k', suffix: '+', label: 'Happy Clients'   },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-end justify-end overflow-hidden">

      {/* Background image with stronger left-side overlay for text contrast */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/imgs/business-team.jpg"
          alt="The ZOOM Team"
          fill
          className="object-cover brightness-[0.78] saturate-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        {/* Stronger left gradient for stats/badge legibility — fixes #6 */}
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/10 to-transparent" />
      </div>

      {/* Team member pins — fixes #5: two-line name/role hierarchy */}
      <div className="absolute inset-0 z-2 pointer-events-none hidden lg:block">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="absolute pointer-events-auto flex flex-col items-center gap-1.5 -translate-x-1/2"
            style={{ left: member.left, bottom: member.bottom }}
          >
            <Badge
              variant="secondary"
              className="bg-white/90 backdrop-blur-md border-white/95 px-3 py-1.5 hover:-translate-y-1 transition-transform flex-col items-start gap-0"
            >
              <span className="font-[--font-montserrat] text-xs font-bold text-zinc-900 leading-tight">
                {member.name}
              </span>
              <span className="text-[9px] font-medium text-zinc-500 leading-tight">
                {member.role}
              </span>
            </Badge>
            <div className="h-3 w-px bg-white/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-zoom-orange border-2 border-white shadow-[0_0_0_3px_rgba(243,112,33,0.35)] hover:scale-125 transition-transform" />
          </div>
        ))}
      </div>

      {/* Hero content card — right-aligned to nav right edge */}
      <Card className="relative z-3 mb-16 mr-5 md:mr-10 lg:mr-[10%] xl:mr-[20%] max-w-[400px] bg-black/45 backdrop-blur-2xl border-white/12">
        <CardContent className="p-8 md:p-10">
          <div className="flex items-center gap-3.5 mb-5">
            <span className="block w-7 h-px bg-zoom-orange" />
            <span className="text-[11px] font-[--font-montserrat] font-semibold uppercase tracking-[3px] text-zoom-orange">
              Premium Unisex Salon
            </span>
          </div>

          <h1 className="text-4xl md:text-[2.6rem] font-[--font-montserrat] font-extrabold leading-tight tracking-tighter text-white mb-3.5">
            Where Style<br />Meets <em className="font-light italic text-zoom-orange">Excellence</em>
          </h1>

          <p className="text-sm font-[--font-inter] leading-relaxed text-white/60 font-light mb-7">
            Experience the artistry of our master stylists. From precision cuts to stunning color transformations — we craft beauty that speaks to your individuality.
          </p>

          {/* CTA row — fixes #9: primary booking action + visible secondary link */}
          <div className="flex items-center gap-5">
            <ZoomButton
              variant="primary"
              size="sm"
              leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
              asChild
            >
              <Link href="/booking">Book Now</Link>
            </ZoomButton>

            <Link
              href="/rates"
              className="inline-flex items-center gap-1.5 text-xs font-[--font-montserrat] font-semibold uppercase tracking-widest text-white/75 hover:text-white transition-colors group"
            >
              View Rates
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Bottom-left anchor zone — left-aligned to nav left edge */}
      <div className="absolute bottom-8 left-5 md:left-10 lg:left-[10%] xl:left-[20%] z-4 flex flex-col gap-4">

        {/* Stats row — fixes #1: bare text, no Card noise; #4: smaller numbers fit naturally; #7: taller separator */}
        <div className="flex items-center gap-7">
          {HERO_STATS.map((stat, index) => (
            <>
              {index > 0 && (
                <Separator
                  key={`sep-${stat.label}`}
                  orientation="vertical"
                  className="h-10 bg-white/20 self-stretch"
                />
              )}
              <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            </>
          ))}
        </div>

        {/* Open today badge — fixes #2: proper breathing room, anchored in layout zone */}
        <Badge className="self-start bg-white/10 backdrop-blur-sm border-white/18 text-white/82">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
          Open Today · 9am – 8pm
        </Badge>
      </div>

    </section>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StatItemProps {
  value: string
  suffix?: string
  label: string
}

function StatItem({ value, suffix, label }: StatItemProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-[--font-montserrat] text-3xl md:text-5xl font-extrabold text-white leading-none">
        {value}
        {suffix && <sup className="text-lg md:text-3xl text-zoom-orange">{suffix}</sup>}
      </span>
      <span className="text-[9px] font-medium text-white/45 uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
