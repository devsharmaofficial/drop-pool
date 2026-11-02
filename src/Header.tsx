import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Page } from './types'
import { Arrow, BrandMark } from './ui'

type NavProps = {
  page: Page
  nav: (page: Page) => void
  goSection: (id: string) => void
}

export function Header({ page, nav, goSection }: NavProps) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  const go = (action: () => void) => {
    setOpen(false)
    action()
  }

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="site-header">
      <button className="brand" onClick={() => go(() => nav('home'))} aria-label="DropPool, home">
        <BrandMark />
        <span>DROPPOOL</span>
      </button>

      <nav className="desktop-nav" aria-label="Main">
        <button onClick={() => go(() => goSection('board'))}>Tonight’s board</button>
        <button onClick={() => go(() => goSection('how'))}>How it works</button>
        <button onClick={() => go(() => nav('merchant'))}>For kitchens</button>
      </nav>

      <div className="header-actions">
        <button className="header-cta" onClick={() => go(() => nav('pool'))} aria-current={page === 'pool' ? 'page' : undefined}>
          Build my pool <Arrow size={16} />
        </button>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button onClick={() => go(() => goSection('board'))}>Tonight’s board</button>
            <button onClick={() => go(() => goSection('how'))}>How it works</button>
            <button onClick={() => go(() => nav('merchant'))}>For kitchens</button>
            <button onClick={() => go(() => nav('pool'))}>Build my pool</button>
            {page !== 'home' && <button onClick={() => go(() => nav('home'))}>Back to the board</button>}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
