'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Button } from './button'
import { cn } from '@/lib/utils'

const zoomButtonVariants = cva('', {
  variants: {
    variant: {
      // Primary - Zoom Orange with glow effect
      primary:
        'bg-zoom-orange text-white hover:bg-zoom-orange-hover shadow-[0_4px_20px_rgba(243,112,33,0.25)] hover:shadow-[0_6px_28px_rgba(243,112,33,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300',

      // Outline - Border with Zoom Orange
      outline:
        'border-2 border-zoom-orange bg-transparent text-zoom-orange hover:bg-zoom-orange hover:text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300',

      // Gradient - Premium gradient effect
      gradient:
        'bg-gradient-to-r from-zoom-orange via-zoom-orange-hover to-zoom-orange text-white shadow-[0_4px_20px_rgba(243,112,33,0.3)] hover:shadow-[0_8px_32px_rgba(243,112,33,0.5)] hover:-translate-y-1 hover:scale-[1.02] active:scale-100 active:translate-y-0 transition-all duration-300',

      // Ghost - Transparent with orange hover
      ghost: 'hover:bg-zoom-orange/10 hover:text-zoom-orange transition-colors duration-300',

      // Link - Text only
      link: 'text-zoom-orange underline-offset-4 hover:underline hover:text-zoom-orange-hover transition-colors duration-300',
    },
    zoomSize: {
      default: 'h-10 px-6 py-2 text-sm',
      sm: 'h-9 px-4 py-2 text-xs',
      lg: 'h-12 px-8 py-3 text-base',
      xl: 'h-14 px-10 py-4 text-lg',
      icon: 'size-10',
      'icon-sm': 'size-9',
      'icon-lg': 'size-12',
    },
    rounded: {
      default: 'rounded-md',
      none: 'rounded-none',
      sm: 'rounded-sm',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    zoomSize: 'default',
    rounded: 'default',
  },
})

export interface ZoomButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'variant' | 'size'>,
    VariantProps<typeof zoomButtonVariants> {
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const ZoomButton = React.forwardRef<HTMLButtonElement, ZoomButtonProps>(
  (
    {
      className,
      variant = 'primary',
      zoomSize = 'default',
      rounded = 'default',
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      asChild,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {loading ? (
          <>
            <svg
              className="animate-spin size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </>
    )

    return (
      <Button
        ref={ref}
        className={cn(
          zoomButtonVariants({ variant, zoomSize, rounded }),
          'font-bold uppercase tracking-wider',
          className
        )}
        disabled={disabled || loading}
        asChild={asChild}
        {...props}
      >
        {asChild ? children : content}
      </Button>
    )
  }
)

ZoomButton.displayName = 'ZoomButton'

export { ZoomButton, zoomButtonVariants }
