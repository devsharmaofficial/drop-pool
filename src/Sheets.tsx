import { useReducedMotion, motion } from 'motion/react'
import { discount, eligibility, formatMoney, matches, prettyTime } from './matching'
import type { Offer, Request } from './types'
import { Arrow, Check, Modal } from './ui'

export function DealSheet({
  offer,
  request,
  close,
  reserve,
}: {
  offer: Offer
  request: Request
  close: () => void
  reserve: () => void
}) {
  const fit = matches(request, [offer])[0]
  const miss = eligibility(offer, request)

  return (
    <Modal onClose={close} labelledBy="deal-title" className="deal-dialog">
      <button className="modal-close" onClick={close} aria-label="Close batch details">
        Close
      </button>
      <div className="deal-grid">
        <div className="deal-media">
          <img src={offer.image} alt={offer.item} width="1400" height="933" />
        </div>
        <div className="deal-body">
          <p className="result-merchant">
            {offer.merchant} · {offer.area} <span>demo kitchen</span>
          </p>
          <h2 id="deal-title">{offer.item}</h2>
          <p className="deal-price">
            <strong>{formatMoney(offer.price)}</strong>
            <s>{formatMoney(offer.original)}</s>
            <span>{discount(offer)}% less</span>
          </p>

          <dl className="deal-facts">
            <div>
              <dt>Pickup</dt>
              <dd>
                {offer.pickup} · {prettyTime(offer.time)}
              </dd>
            </div>
            <div>
              <dt>Distance</dt>
              <dd>{offer.distance} km from your area</dd>
            </div>
            <div>
              <dt>Portions</dt>
              <dd>{offer.qty} left in this demo</dd>
            </div>
            <div>
              <dt>Allergens</dt>
              <dd>{offer.allergens.join(', ')}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{offer.notes.join('. ')}</dd>
            </div>
          </dl>

          <div className={fit ? 'fit-box' : 'fit-box outside'}>
            <strong>{fit ? 'Why it fits your pool' : 'Outside your current pool'}</strong>
            <ul>
              {(fit?.reasons ?? [miss ?? 'This batch is not available tonight.']).map((reason) => (
                <li key={reason}>
                  <Check size={13} /> {reason}
                </li>
              ))}
            </ul>
          </div>

          <button className="btn btn-ink wide" onClick={reserve}>
            Reserve one demo portion <Arrow size={16} />
          </button>
          <p className="fine-print">
            No payment or real reservation is made. {offer.qty > 1 ? `${offer.qty - 1} portions would remain.` : 'This is the last portion.'}
          </p>
        </div>
      </div>
    </Modal>
  )
}

export function Reservation({ offer, close }: { offer: Offer; close: () => void }) {
  const reduce = useReducedMotion()

  return (
    <Modal onClose={close} labelledBy="reservation-title" className="reservation-dialog">
      <p className="reservation-status">Demo reservation saved</p>
      <motion.div
        className="reservation-mark"
        initial={reduce ? false : { scale: 0.6, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <Check size={30} />
      </motion.div>
      <h2 id="reservation-title">Your portion is held.</h2>
      <p className="reservation-lede">
        <strong>{offer.item}</strong> from {offer.merchant} is held in this browser session. Collect it by{' '}
        {offer.pickup.replace('Pickup by ', '')} at {offer.area}.
      </p>

      <div className="reservation-ticket">
        <div>
          <span>Amount due at pickup</span>
          <strong>{formatMoney(offer.price)}</strong>
        </div>
        <div>
          <span>Known allergens</span>
          <strong>{offer.allergens.join(', ')}</strong>
        </div>
        <div>
          <span>Pickup window</span>
          <strong>{prettyTime(offer.time)}</strong>
        </div>
      </div>

      <button className="btn btn-ink wide" onClick={close}>
        Continue exploring <Arrow size={16} />
      </button>
      <p className="fine-print">This is a simulated reservation, not a purchase. Nothing has been charged.</p>
    </Modal>
  )
}
