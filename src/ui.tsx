import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

export function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M16 7.2c3.9 4.9 5.9 7.5 5.9 10.3a5.9 5.9 0 1 1-11.8 0c0-2.8 2-5.4 5.9-10.3Z" fill="var(--tomato-bright)" />
    </svg>
  )
}

export function Arrow({ size = 18, up = false }: { size?: number; up?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      {up ? (
        <>
          <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
        </>
      ) : (
        <>
          <path d="M3 10h14M11 4l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
        </>
      )}
    </svg>
  )
}

export function Check({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="m2.5 8.5 3.4 3.4L13.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

export function Reveal({
  children,
  delay = 0,
  className,
  distance = 22,
}: {
  children: ReactNode
  delay?: number
  className?: string
  distance?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion()
  const count = useMotionValue(reduce ? value : 0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('en-IN'))
  useEffect(() => {
    if (reduce) {
      count.set(value)
      return
    }
    const controls = animate(count, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [count, reduce, value])
  return <motion.span className={className}>{rounded}</motion.span>
}

export function Modal({
  children,
  onClose,
  labelledBy,
  className = '',
}: {
  children: ReactNode
  onClose: () => void
  labelledBy: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        document.body.dataset.escapeCalls = String(Number(document.body.dataset.escapeCalls ?? 0) + 1)
        closeRef.current()
      }
      if (event.key !== 'Tab' || !panel.current) return
      const items = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (!panel.current.contains(active)) {
        event.preventDefault()
        first.focus()
        return
      }

      if (event.shiftKey && (active === first || active === panel.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      } else if (!event.shiftKey && active === panel.current) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])

  return createPortal(
    <motion.div
      className="modal-backdrop"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={panel}
        className={`modal-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        initial={reduce ? false : { y: 34, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 26, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  )
}
