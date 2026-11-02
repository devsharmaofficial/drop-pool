import { motion, useReducedMotion } from 'motion/react'
import { preferenceNames } from './data'
import { discount, formatMoney, prettyTime } from './matching'
import type { Match, Offer, Request } from './types'
import { Arrow, Check, Reveal } from './ui'

type MatchesProps = {
  request: Request
  results: Match[]
  choose: (offer: Offer) => void
  reserved: Offer | null
  edit: () => void
  goBoard: () => void
}

export function Matches({ request, results, choose, reserved, edit, goBoard }: MatchesProps) {
  const reduce = useReducedMotion()

  return (
    <div className="app-page">
      <Reveal className="sheet matches-sheet">
        <div className="matches-head">
          <div>
            <h1>These fit tonight.</h1>
            <p className="match-summary">
              {preferenceNames[request.preference]} · up to {formatMoney(request.budget)} · within {request.radius} km ·{' '}
              {prettyTime(request.time)}
            </p>
          </div>
          <button className="btn btn-outline" onClick={edit}>
            Edit my pool <Arrow size={16} />
          </button>
        </div>

        <div className="rule-band">
          <div>
            <strong>Eligible first.</strong>
            <p>Inside the cap, inside the radius, overlapping your pickup window, with portions left.</p>
          </div>
          <div>
            <strong>Then ranked.</strong>
            <p>Preference, value, distance and pickup fit. The weights are prototype defaults.</p>
          </div>
          <div>
            <strong>Always explained.</strong>
            <p>Every batch prints its practical reasons. There is no opaque match score.</p>
          </div>
        </div>

        {reserved && (
          <motion.div
            className="reservation-notice"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="notice-mark">
              <Check size={16} />
            </span>
            <p>
              <strong>One portion held.</strong> {reserved.item} from {reserved.merchant} now has one fewer portion.
              This is a demo reservation.
            </p>
          </motion.div>
        )}

        <div className="results-head">
          <h2>
            {results.length} {results.length === 1 ? 'batch fits' : 'batches fit'} your pool.
          </h2>
          <p>Offers outside your cap, radius, food choice or pickup window are left out.</p>
        </div>

        {results.length > 0 ? (
          <div className="result-list">
            {results.map(({ offer, reasons }, index) => (
              <motion.article
                className="result-row"
                key={offer.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  className="result-photo"
                  src={offer.image}
                  alt={offer.item}
                  width="1400"
                  height="933"
                  loading="lazy"
                />
                <div className="result-main">
                  <p className="result-merchant">
                    {offer.merchant} · {offer.area} <span>demo kitchen</span>
                  </p>
                  <h3>{offer.item}</h3>
                  <p className="result-meta">
                    {offer.pickup} · {offer.distance} km · {offer.qty} portions left · {offer.allergens.join(', ')}
                  </p>
                  <ul className="reasons">
                    {reasons.map((reason) => (
                      <li key={reason}>
                        <Check size={13} /> {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="result-buy">
                  <p className="result-price">
                    <strong>{formatMoney(offer.price)}</strong>
                    <s>{formatMoney(offer.original)}</s>
                  </p>
                  <p className="result-less">{discount(offer)}% less · demo price</p>
                  <button className="btn btn-ink" onClick={() => choose(offer)}>
                    See this batch <Arrow size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No batch fits that pool yet.</h2>
            <p>
              Widen the radius or choose another pickup window. Kitchens publish through the evening, so a useful
              batch may still be on its way.
            </p>
            <div className="empty-actions">
              <button className="btn btn-ink" onClick={edit}>
                Adjust my pool <Arrow size={16} />
              </button>
              <button className="link-arrow" onClick={goBoard}>
                See tonight’s board
              </button>
            </div>
          </div>
        )}

        <p className="fine-print results-note">
          Matching is deterministic and runs in this browser. Prices, stock and kitchen identities are simulated demo
          data; no real reservation or payment is made.
        </p>
      </Reveal>
    </div>
  )
}
