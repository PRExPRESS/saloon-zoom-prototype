import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

// ─── Constants ────────────────────────────────────────────────────────────────

const EXPLORE_LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About Us' },
  { href: '/rates',   label: 'Services & Rates' },
  { href: '/team',    label: 'Our Team' },
  { href: '/booking', label: 'Book Appointment' },
] as const

const CONTACT_ITEMS = [
  { icon: MapPin, text: '123 Premium Avenue, Colombo 07, Sri Lanka' },
  { icon: Phone,  text: '+94 77 123 4567' },
  { icon: Mail,   text: 'hello@zoomsalon.lk' },
] as const

const HOURS_ITEMS = [
  { label: 'Mon – Sat', hours: '9:00 AM – 8:00 PM' },
  { label: 'Sun & Poya', hours: '10:00 AM – 6:00 PM' },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-dark border-t border-white/[0.06]">
      <div className="px-5 md:px-10 lg:px-[10%] xl:px-[20%] pt-16 pb-6">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.6fr_1.4fr] gap-10 md:gap-12 mb-12">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/assets/imgs/logo.png"
                alt="ZOOM Unisex Salon"
                width={110}
                height={68}
                className="h-14 w-auto object-contain brightness-[1.15]"
              />
            </Link>
            <p className="text-white/40 text-sm font-[--font-inter] leading-relaxed max-w-[260px]">
              Sri Lanka&apos;s premier unisex salon. Defining your signature style with
              uncompromising quality and elegance.
            </p>
          </div>

          {/* Explore column */}
          <div>
            <p className="text-[10px] font-[--font-montserrat] font-bold uppercase tracking-[2.5px] text-white/30 mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 text-sm hover:text-zoom-orange hover:pl-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-[10px] font-[--font-montserrat] font-bold uppercase tracking-[2.5px] text-white/30 mb-5">
              Contact Us
            </p>
            <ul className="space-y-3.5">
              {CONTACT_ITEMS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-zoom-orange shrink-0 mt-0.5" />
                  <span className="text-white/55 text-sm leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours column */}
          <div>
            <p className="text-[10px] font-[--font-montserrat] font-bold uppercase tracking-[2.5px] text-white/30 mb-5">
              Working Hours
            </p>
            <ul className="space-y-3.5">
              {HOURS_ITEMS.map(({ label, hours }) => (
                <li key={label} className="flex items-start gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-zoom-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/55 text-sm leading-snug whitespace-nowrap">{label}</p>
                    <p className="text-white/30 text-xs whitespace-nowrap">{hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <Separator className="bg-white/[0.07] mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs font-[--font-inter]">
            &copy; {currentYear} ZOOM Unisex Salon. All Rights Reserved.
          </p>
          <p className="text-white/20 text-xs font-[--font-inter]">
            Colombo, Sri Lanka
          </p>
        </div>

      </div>
    </footer>
  )
}

