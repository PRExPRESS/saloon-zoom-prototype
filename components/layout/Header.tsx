'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { ZoomButton } from '@/components/ui/zoom-button'
import { cn } from '@/lib/utils'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useMobileMenu } from '@/hooks/useMobileMenu'

const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/rates', label: 'Rates' },
  { href: '/team', label: 'Team' },
] as const

export function Header() {
  const isScrolled = useScrollPosition(50)
  const { isOpen, toggle, close } = useMobileMenu()

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-[1000]',
        'flex justify-between items-center px-5 md:px-10 lg:px-[10%] xl:px-[20%]',
        'border-b border-white/[0.06] transition-all duration-500',
        isScrolled
          ? 'py-3 bg-bg-dark/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05)]'
          : 'py-1 bg-bg-dark'
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0">
        <Image
          src="/assets/imgs/logo.png"
          alt="ZOOM Unisex Salon"
          width={120}
          height={75}
          className={cn(
            'w-auto object-contain brightness-110 hover:brightness-125 transition-all duration-300',
            isScrolled ? 'h-[52px]' : 'h-[68px]'
          )}
          priority
        />
      </Link>

      {/* Mobile toggle */}
      <button
        onClick={toggle}
        className="flex md:hidden items-center justify-center w-10 h-10 z-[1001] text-white/80 hover:text-white transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-2">
        <ul className="flex items-center gap-1">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-white/55 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-zoom-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="w-px h-5 bg-white/10 mx-3" />

        <ZoomButton asChild zoomSize="lg" className="tracking-[2px]">
          <Link href="/booking">Book Appointment</Link>
        </ZoomButton>
      </nav>

      {/* Mobile nav drawer */}
      <div
        className={cn(
          'fixed inset-0 bg-bg-dark/95 backdrop-blur-xl z-999 flex flex-col justify-center px-10',
          'transition-all duration-400 md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <ul className="flex flex-col gap-2 mb-10">
          {NAVIGATION_LINKS.map((link, i) => (
            <li
              key={link.href}
              className={cn(
                'transition-all duration-300',
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              )}
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : '0ms' }}
            >
              <Link
                href={link.href}
                onClick={close}
                className="block text-3xl font-bold uppercase tracking-widest text-white/50 hover:text-white py-3 border-b border-white/[0.06] transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ZoomButton asChild zoomSize="lg" className="w-full tracking-[2px]">
          <Link href="/booking" onClick={close}>
            Book Appointment
          </Link>
        </ZoomButton>
      </div>
    </header>
  )
}