import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { preferenceNames } from './data'
import { draftFitsSignal, formatMoney, poolSignal, prettyTime, timeOverlap } from './matching'
import type { Offer, Preference, Request } from './types'
import { AnimatedNumber, Arrow, BrandMark, Modal } from './ui'

type MerchantProps = {
  offers: Offer[]
  setOffers: (offers: Offer[]) => void
  request: Request
  goPool: () => void
}

type MerchantCategory = Exclude<Preference, 'any'>

const categories: MerchantCategory[] = ['vegetarian', 'vegan', 'bakery']
const pickupWindows = ['19:00–20:00', '20:00–21:00', '20:30–21:30']
const categoryImages: Record<MerchantCategory, string> = {
  vegetarian: '/images/garden-bowl.jpg',
  vegan: '/images/curry.jpg',
  bakery: '/images/bread.jpg',
}
const pickupBy: Record<string, string> = {
  '19:00–20:00': 'Pickup by 8:00 PM',
  '20:00–21:00': 'Pickup by 9:00 PM',
  '20:30–21:30': 'Pickup by 9:30 PM',
}

export function Merchant({ offers, setOffers, request, goPool }: MerchantProps) {
  const reduce = useReducedMotion()
  const signal = poolSignal(request)
  const [editing, setEditing] = useState(false)
  const [published, setPublished] = useState<string | null>(null)
  const [form, setForm] = useState({
    item: 'Herbed lentil supper',
    category: 'vegetarian' as MerchantCategory,
    price: 135,
    qty: 5,
    time: '20:00–21:00',
  })
  const [error, setError] = useState('')

  const fit = useMemo(
    () =>
      draftFitsSignal(
        { price: Math.round(form.price * 100), time: form.time, category: form.category, distance: 1.4 },
        request,
      ),
    [form.category, form.price, form.time, request],
  )

  const fitNote = () => {
    const categoryFits =
      request.preference === 'any' ||
      form.category === request.preference ||
      (request.preference === 'vegetarian' && form.category === 'vegan')
    if (!categoryFits) {
      return `A ${preferenceNames[form.category].toLowerCase()} batch sits outside the pool’s ${preferenceNames[request.preference].toLowerCase()} ask.`
    }
    if (form.price * 100 > request.budget) return `Above the demo pool’s ${formatMoney(request.budget)} median cap.`
    if (1.4 > request.radius) return `1.4 km sits outside the pool’s ${request.radius} km radius.`
    if (!timeOverlap(form.time, request.time)) return `This pickup window misses the pool’s ${prettyTime(request.time)} window.`
    return `Fits the ${signal.sameCrowd}-request ${preferenceNames[request.preference].toLowerCase()} signal.`
  }

  const publish = () => {
    if (!form.item.trim()) return setError('Give the batch a clear name.')
    if (!Number.isFinite(form.price) || form.price < 1) return setError('Set a price of at least ₹1.')
    if (!Number.isFinite(form.qty) || form.qty < 1) return setError('Add at least one portion.')
    const price = Math.round(form.price * 100)
    const next: Offer = {
      id: `new-${Date.now()}`,
      merchant: 'Field & Fork',
      area: 'Civil Lines',
      item: form.item.trim(),
      category: form.category,
      price,
      original: Math.round(price * 1.8),
      qty: Math.round(form.qty),
      distance: 1.4,
      pickup: pickupBy[form.time],
      time: form.time,
      notes: ['Created in this demo session'],
      allergens: ['Ask the kitchen'],
      image: categoryImages[form.category],
      available: true,
    }
    setOffers([next, ...offers])
    setEditing(false)
    setError('')
    setPublished(`${next.item} · ${next.qty} portions · ${formatMoney(next.price)} · pickup ${prettyTime(next.time)}`)
  }

  const openDialog = () => {
    setError('')
    setEditing(true)
  }

  return (
    <div className="console-page">
      <div className="console">
        <aside className="console-side">
          <div className="console-brand">
            <BrandMark size={24} />
            <span>DROPPOOL</span>
          </div>
          <div className="workspace">
            <span>Field &amp; Fork</span>
            <small>Demo kitchen · Civil Lines</small>
          </div>
          <nav className="console-nav" aria-label="Merchant console">
            <button onClick={() => document.getElementById('merchant-overview')?.scrollIntoView({ behavior: 'smooth' })}>
              Overview
            </button>
            <button onClick={() => document.getElementById('published-batches')?.scrollIntoView({ behavior: 'smooth' })}>
              Published batches <span>{offers.length}</span>
            </button>
            <button onClick={goPool}>Customer view</button>
          </nav>
          <p className="side-note">
            Every request, batch and kitchen in this workspace is simulated for the prototype.
          </p>
        </aside>

        <div className="console-sheet" id="merchant-overview">
          <header className="console-head">
            <div>
              <h1>Tonight’s demand.</h1>
              <p>
                A {preferenceNames[request.preference].toLowerCase()} dinner under {formatMoney(request.budget)},
                collected between {prettyTime(request.time)}, is the clearest ask near you.
              </p>
            </div>
            <button className="btn btn-ink" onClick={openDialog}>
              Publish a batch <span aria-hidden="true">+</span>
            </button>
          </header>

          {published && (
            <motion.div
              className="publish-notice"
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <strong>Batch published.</strong>
                <p>{published} · visible to the demo pool.</p>
              </div>
              <button onClick={() => setPublished(null)}>Dismiss</button>
            </motion.div>
          )}

          <div className="kpi-strip" aria-label="Tonight at a glance">
            <div className="kpi">
              <span>Nearby requests</span>
              <strong>
                <AnimatedNumber value={signal.total} />
              </strong>
              <small>within {request.radius} km · simulated</small>
            </div>
            <div className="kpi">
              <span>Median spend cap</span>
              <strong>{formatMoney(request.budget)}</strong>
              <small>on the strongest ask</small>
            </div>
            <div className="kpi">
              <span>Peak pickup</span>
              <strong>{prettyTime(request.time)}</strong>
              <small>overlaps the current window</small>
            </div>
          </div>

          <div className="console-grid">
            <section className="signal-panel" aria-labelledby="signal-title">
              <h2 id="signal-title">
                {signal.sameCrowd} of {signal.total} nearby requests want{' '}
                {preferenceNames[request.preference].toLowerCase()}.
              </h2>
              <p>
                No names, contact details or individual requests are shared. This is an aggregated demo view of the
                local pool.
              </p>

              <div className="pool-dots console-dots" aria-hidden="true">
                {Array.from({ length: signal.total }).map((_, index) => (
                  <span key={index} className={index < signal.sameCrowd ? 'pool-dot is-wanted' : 'pool-dot'} />
                ))}
              </div>
              <div className="dot-legend">
                <span>
                  <i className="legend-dot wanted" /> {signal.sameCrowd} matching requests
                </span>
                <span>
                  <i className="legend-dot" /> {signal.total - signal.sameCrowd} other requests
                </span>
              </div>

              <button className="btn btn-light" onClick={openDialog}>
                Offer a small batch <Arrow size={16} />
              </button>
            </section>

            <section className="inventory-panel" id="published-batches" aria-labelledby="inventory-title">
              <div className="panel-head">
                <h2 id="inventory-title">Your published batches</h2>
                <span>Live in this demo</span>
              </div>
              <div className="table-wrap">
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th scope="col">Batch</th>
                      <th scope="col">Left</th>
                      <th scope="col">Price</th>
                      <th scope="col">Pickup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer) => (
                      <tr key={offer.id}>
                        <td>
                          <div className="table-batch">
                            <img src={offer.image} alt="" width="1400" height="933" loading="lazy" />
                            <div>
                              <strong>{offer.item}</strong>
                              <span>{offer.merchant} · {offer.area}</span>
                            </div>
                          </div>
                        </td>
                        <td className="num">{offer.qty}</td>
                        <td className="num">
                          {formatMoney(offer.price)}
                          <span className="table-sub">{formatMoney(offer.original)}</span>
                        </td>
                        <td>{prettyTime(offer.time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="fine-print">
                Quantities fall when a customer reserves a demo portion. No real inventory is connected.
              </p>
            </section>

            <aside className="console-rail">
              <section>
                <h2>Your customer demo</h2>
                <dl className="rail-list">
                  <div>
                    <dt>Food</dt>
                    <dd>{preferenceNames[request.preference]}</dd>
                  </div>
                  <div>
                    <dt>Cap</dt>
                    <dd>{formatMoney(request.budget)}</dd>
                  </div>
                  <div>
                    <dt>Radius</dt>
                    <dd>{request.radius} km</dd>
                  </div>
                  <div>
                    <dt>Window</dt>
                    <dd>{prettyTime(request.time)}</dd>
                  </div>
                </dl>
                <button className="link-arrow" onClick={goPool}>
                  Change the demo request <Arrow size={15} />
                </button>
              </section>

              <section>
                <h2>Before you publish</h2>
                <ul className="rail-checklist">
                  <li>Only list food that is still eligible to sell.</li>
                  <li>Set an honest quantity and a pickup deadline.</li>
                  <li>Add known allergens; do not guess.</li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </div>

      {editing && (
        <Modal onClose={() => setEditing(false)} labelledBy="publish-title" className="offer-dialog">
          <button className="modal-close" onClick={() => setEditing(false)} aria-label="Close publish dialog">
            Close
          </button>
          <h2 id="publish-title">
            Offer what’s
            <br />
            genuinely ready.
          </h2>
          <p className="dialog-lede">
            A small, honest batch beats a big guess. This appears in the demo workspace only.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              publish()
            }}
          >
            <label className="field field-input" htmlFor="batch-name">
              <span className="field-line">
                <span>Batch name</span>
              </span>
              <input
                id="batch-name"
                value={form.item}
                onChange={(event) => setForm({ ...form, item: event.target.value })}
                autoComplete="off"
              />
            </label>

            <fieldset>
              <legend>What kind of food?</legend>
              <div className="choice-row">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    className="choice"
                    aria-pressed={form.category === category}
                    onClick={() => setForm({ ...form, category })}
                  >
                    {preferenceNames[category]}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="dialog-row">
              <label className="field field-input" htmlFor="batch-price">
                <span className="field-line">
                  <span>DropPool price (₹)</span>
                </span>
                <input
                  id="batch-price"
                  type="number"
                  min="1"
                  step="1"
                  value={form.price}
                  onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
                />
              </label>
              <label className="field field-input" htmlFor="batch-qty">
                <span className="field-line">
                  <span>Portions</span>
                </span>
                <input
                  id="batch-qty"
                  type="number"
                  min="1"
                  step="1"
                  value={form.qty}
                  onChange={(event) => setForm({ ...form, qty: Number(event.target.value) })}
                />
              </label>
            </div>

            <fieldset>
              <legend>Pickup window</legend>
              <div className="choice-row">
                {pickupWindows.map((window) => (
                  <button
                    type="button"
                    key={window}
                    className="choice"
                    aria-pressed={form.time === window}
                    onClick={() => setForm({ ...form, time: window })}
                  >
                    {prettyTime(window)}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="offer-preview">
              <p className="preview-label">Preview</p>
              <strong>{form.item || 'Your batch'}</strong>
              <p>
                {form.qty || 0} portions · ₹{form.price || 0} · {prettyTime(form.time)} · {pickupBy[form.time]}
              </p>
              <span className={fit ? 'fit-note fits' : 'fit-note'}>
                {fitNote()}
              </span>
            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button className="btn btn-ink wide" type="submit">
              Publish demo batch <Arrow size={16} />
            </button>
            <p className="fine-print">No payment, delivery or real customer is attached to this batch.</p>
          </form>
        </Modal>
      )}
    </div>
  )
}
