'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { cn } from '@/lib/utils'

// ─── Constants ────────────────────────────────────────────────────────────────

const PRICING_TABS = ['Cut & Styling', 'Colour Studio', 'Treatments'] as const
type PricingTab = (typeof PRICING_TABS)[number]

const PRICING_DATA: Record<PricingTab, PricingItem[]> = {
  'Cut & Styling': [
    { name: "Director's Cut & Style", description: 'Full consultation, precision wash, cut by our Master Stylist, and signature blow-dry.', price: 'Rs. 6,500' },
    { name: 'Senior Stylist Cut', description: 'Consultation, wash, tailored cut and professional styling.', price: 'Rs. 4,500' },
    { name: 'Premium Mens Grooming', description: 'Precision haircut, hot towel beard sculpting, and scalp massage.', price: 'Rs. 3,500' },
    { name: 'Signature Blowout', description: 'Deep cleansing wash followed by a voluminous, long-lasting blow-dry.', price: 'Rs. 3,000' },
  ],
  'Colour Studio': [
    { name: 'Balayage / Ombré (Full)', description: 'Hand-painted highlights for a seamless, sun-kissed gradient. Includes Olaplex bonding.', price: 'From Rs. 18,000', highlight: true },
    { name: 'Full Head Tint / Global Colour', description: 'All-over premium colour application for dramatic transformation or grey coverage.', price: 'From Rs. 12,500' },
    { name: 'Root Retouch', description: 'Precision application to blend regrowth seamlessly with existing colour.', price: 'Rs. 5,500' },
  ],
  'Treatments': [
    { name: 'Brazilian Keratin Treatment', description: 'Frizz-elimination and intense smoothing lasting up to 4 months.', price: 'From Rs. 20,000', highlight: true },
    { name: 'Hair Botox Restoration', description: 'Deep conditioning anti-aging treatment that repairs damaged fibers and adds extreme gloss.', price: 'From Rs. 15,000' },
    { name: 'Luxury Spa & Scalp Detox', description: 'Exfoliating scalp scrub, deep hydration mask, and extended stress-relief massage.', price: 'Rs. 6,000' },
  ],
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FeaturedPricingSection() {
  const [activeTab, setActiveTab] = useState<PricingTab>('Cut & Styling')

  return (
    <section className="py-24 px-5 md:px-10 lg:px-[10%] xl:px-[20%] bg-bg-section">
      <div>

        {/* Section header */}
        <AnimatedSection className="mb-14">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-zoom-orange font-[--font-montserrat] uppercase tracking-[3px] font-bold text-xs mb-3">
                Menu of Services
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[--font-montserrat] font-extrabold tracking-tight">
                Investment in Yourself.
              </h2>
            </div>
            <Link
              href="/rates"
              className="hidden md:inline-flex items-center gap-2 text-xs font-[--font-montserrat] font-semibold uppercase tracking-widest text-[--color-text-muted] hover:text-zoom-orange transition-colors group"
            >
              Full Price List
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="flex gap-1 p-1 bg-bg-card border border-border rounded-lg w-fit">
            {PRICING_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-2 text-xs font-[--font-montserrat] font-bold uppercase tracking-[1.5px] rounded-md transition-all duration-300',
                  activeTab === tab
                    ? 'bg-zoom-orange text-white shadow-[0_2px_12px_rgba(243,112,33,0.3)]'
                    : 'text-[--color-text-muted] hover:text-[--color-text-main]'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Pricing list */}
        <AnimatedSection delay={0.2}>
          <Card className="border-[--color-border]">
            <CardContent className="p-0">
              {PRICING_DATA[activeTab].map((item, index) => (
                <PricingRow
                  key={item.name}
                  item={item}
                  isLast={index === PRICING_DATA[activeTab].length - 1}
                />
              ))}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Mobile view all */}
        <AnimatedSection delay={0.3} className="mt-8 flex justify-center md:hidden">
          <Link
            href="/rates"
            className="inline-flex items-center gap-2 text-sm font-[--font-montserrat] font-semibold uppercase tracking-widest text-[--color-text-muted] hover:text-zoom-orange transition-colors group"
          >
            View Full Price List
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface PricingItem {
  name: string
  description: string
  price: string
  highlight?: boolean
}

function PricingRow({ item, isLast }: { item: PricingItem; isLast: boolean }) {
  return (
    <>
      <div className={cn(
        'flex items-start justify-between gap-6 px-7 py-6 group hover:bg-zoom-orange/[0.03] transition-colors duration-300',
        item.highlight && 'bg-zoom-orange/[0.02]'
      )}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1.5">
            <h3 className="font-[--font-montserrat] font-bold text-sm text-[--color-text-main]">
              {item.name}
            </h3>
            {item.highlight && (
              <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-zoom-orange border border-zoom-orange/30 rounded px-1.5 py-0.5">
                Popular
              </span>
            )}
          </div>
          <p className="text-xs text-[--color-text-muted] font-[--font-inter] leading-relaxed">
            {item.description}
          </p>
        </div>
        <span className="font-[--font-montserrat] font-extrabold text-sm text-[--color-text-main] whitespace-nowrap shrink-0 group-hover:text-zoom-orange transition-colors duration-300">
          {item.price}
        </span>
      </div>
      {!isLast && <Separator />}
    </>
  )
}
