import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { defaultRequest, offers as seedOffers } from './data'
import { matches } from './matching'
import type { Offer, Page, Request } from './types'
import { Footer } from './Footer'
import { Header } from './Header'
import { Home } from './Home'
import { Matches } from './Matches'
import { Merchant } from './Merchant'
import { Pool } from './Pool'
import { DealSheet, Reservation } from './Sheets'

const pageFromHash = (): Page => {
  const value = window.location.hash.replace(/^#\/?/, '')
  return value === 'pool' || value === 'matches' || value === 'merchant' ? value : 'home'
}

export default function App() {
  const reduce = useReducedMotion()
  const [page, setPage] = useState<Page>(pageFromHash)
  const [request, setRequest] = useState<Request>(defaultRequest)
  const [offers, setOffers] = useState<Offer[]>(seedOffers)
  const [selected, setSelected] = useState<Offer | null>(null)
  const [reserved, setReserved] = useState<Offer | null>(null)
  const [pendingSection, setPendingSection] = useState<string | null>(null)
  const results = useMemo(() => matches(request, offers), [request, offers])

  useEffect(() => {
    const sync = () => setPage(pageFromHash())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  useEffect(() => {
    if (page !== 'home' || !pendingSection) return
    const timer = window.setTimeout(() => {
      document.getElementById(pendingSection)?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      })
      setPendingSection(null)
    }, 90)
    return () => window.clearTimeout(timer)
  }, [page, pendingSection, reduce])

  const nav = (next: Page) => {
    setPage(next)
    if (next === 'home') history.pushState({}, '', window.location.pathname + window.location.search)
    else history.pushState({}, '', `#${next}`)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const goSection = (id: string) => {
    if (page !== 'home') {
      setPage('home')
      history.pushState({}, '', window.location.pathname + window.location.search)
      setPendingSection(id)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  const reserve = (id: string) => {
    const offer = offers.find((item) => item.id === id)
    if (!offer) return
    setOffers((current) => current.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item)))
    setReserved(offer)
    setSelected(null)
  }

  const reset = () => {
    setOffers(seedOffers)
    setRequest(defaultRequest)
    setReserved(null)
    setSelected(null)
    nav('home')
  }

  return (
    <div className={`app ${page === 'home' ? 'is-home' : 'is-inner'}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header page={page} nav={nav} goSection={goSection} />

      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          {page === 'home' && (
            <motion.div
              key="home"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
            >
              <Home
                request={request}
                setRequest={setRequest}
                nav={nav}
                goSection={goSection}
                choose={setSelected}
              />
            </motion.div>
          )}
          {page === 'pool' && (
            <motion.div
              key="pool"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Pool
                request={request}
                setRequest={setRequest}
                goMatches={() => nav('matches')}
                goBoard={() => {
                  nav('home')
                  setPendingSection('board')
                }}
              />
            </motion.div>
          )}
          {page === 'matches' && (
            <motion.div
              key="matches"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Matches
                request={request}
                results={results}
                choose={setSelected}
                reserved={reserved}
                edit={() => nav('pool')}
                goBoard={() => {
                  nav('home')
                  setPendingSection('board')
                }}
              />
            </motion.div>
          )}
          {page === 'merchant' && (
            <motion.div
              key="merchant"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Merchant offers={offers} setOffers={setOffers} request={request} goPool={() => nav('pool')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer nav={nav} goSection={goSection} reset={reset} />

      <AnimatePresence>
        {selected && (
          <DealSheet
            key={selected.id}
            offer={selected}
            request={request}
            close={() => {
              document.body.dataset.closeCalls = String(Number(document.body.dataset.closeCalls ?? 0) + 1)
              setSelected(null)
            }}
            reserve={() => reserve(selected.id)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reserved && <Reservation key="reservation" offer={reserved} close={() => setReserved(null)} />}
      </AnimatePresence>
    </div>
  )
}
