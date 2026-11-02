import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { preferenceLabels, preferenceNames } from './data'
import { formatMoney, poolSignal, prettyTime } from './matching'
import type { Preference, Request } from './types'
import { AnimatedNumber, Arrow, Reveal } from './ui'

type PoolProps = {
  request: Request
  setRequest: (request: Request) => void
  goMatches: () => void
  goBoard: () => void
}

const choices = Object.keys(preferenceLabels) as Preference[]
const windows = ['19:00–20:00', '20:00–21:00', '20:30–21:30']

export function Pool({ request, setRequest, goMatches, goBoard }: PoolProps) {
  const reduce = useReducedMotion()
  const [errors, setErrors] = useState<string[]>([])
  const signal = poolSignal(request)
  const update = <K extends keyof Request>(key: K, value: Request[K]) => setRequest({ ...request, [key]: value })

  const submit = () => {
    const next: string[] = []
    if (request.budget < 5000) next.push('Choose a budget of at least ₹50 so a kitchen can make a useful offer.')
    if (!windows.includes(request.time)) next.push('Choose a pickup window.')
    setErrors(next)
    if (!next.length) goMatches()
  }

  return (
    <div className="app-page">
      <Reveal className="sheet pool-sheet">
        <div className="sheet-head">
          <h1>What would you pick up?</h1>
          <p>
            Four answers, one local signal. No account, no payment and no personal details. Just enough for a kitchen
            to make a useful batch.
          </p>
        </div>

        <div className="pool-grid">
          <form
            className="demand-form"
            onSubmit={(event) => {
              event.preventDefault()
              submit()
            }}
          >
            <fieldset>
              <legend>What sounds good?</legend>
              <div className="choice-row">
                {choices.map((choice) => (
                  <button
                    type="button"
                    key={choice}
                    className="choice"
                    aria-pressed={request.preference === choice}
                    onClick={() => update('preference', choice)}
                  >
                    {preferenceLabels[choice]}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="field" htmlFor="budget">
              <span className="field-line">
                <span>Your maximum spend</span>
                <strong>{formatMoney(request.budget)}</strong>
              </span>
              <input
                id="budget"
                type="range"
                min="5000"
                max="30000"
                step="1000"
                value={request.budget}
                aria-valuetext={formatMoney(request.budget)}
                onChange={(event) => update('budget', Number(event.target.value))}
              />
              <span className="field-range" aria-hidden="true">
                <span>₹50</span>
                <span>₹300</span>
              </span>
              <small>Only batches at or below this amount can appear.</small>
            </label>

            <fieldset>
              <legend>When can you collect?</legend>
              <div className="choice-row">
                {windows.map((window) => (
                  <button
                    type="button"
                    key={window}
                    className="choice"
                    aria-pressed={request.time === window}
                    onClick={() => update('time', window)}
                  >
                    {prettyTime(window)}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="field" htmlFor="radius">
              <span className="field-line">
                <span>How far is practical?</span>
                <strong>{request.radius} km</strong>
              </span>
              <input
                id="radius"
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={request.radius}
                aria-valuetext={`${request.radius} kilometres`}
                onChange={(event) => update('radius', Number(event.target.value))}
              />
              <span className="field-range" aria-hidden="true">
                <span>1 km</span>
                <span>5 km</span>
              </span>
              <small>We only show batches inside this radius.</small>
            </label>

            {errors.length > 0 && (
              <div className="form-error" role="alert">
                <strong>One thing to fix</strong>
                {errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}

            <motion.button className="btn btn-ink btn-submit" type="submit" whileTap={reduce ? undefined : { scale: 0.99 }}>
              Add me to the pool <Arrow />
            </motion.button>
            <p className="fine-print">
              This is a prototype. Your request stays in this browser and is shown only as an anonymous summary.
            </p>
          </form>

          <aside className="pool-preview" aria-labelledby="pool-preview-title">
            <h2 id="pool-preview-title">
              <AnimatedNumber value={signal.sameCrowd} className="preview-number" /> neighbours
              <br />
              are pooling too.
            </h2>

            <div className="pool-dots" aria-hidden="true">
              {Array.from({ length: signal.total }).map((_, index) => (
                <motion.span
                  key={index}
                  className={index < signal.sameCrowd ? 'pool-dot is-wanted' : 'pool-dot'}
                  initial={reduce ? false : { scale: 0.55, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25, delay: reduce ? 0 : index * 0.012 }}
                />
              ))}
            </div>

            <p className="preview-lede">
              {signal.sameCrowd} of {signal.total} nearby requests want {preferenceNames[request.preference].toLowerCase()}.
              The rest are open to other kinds of dinner.
            </p>

            <dl className="preview-rows">
              <div>
                <dt>Your cap</dt>
                <dd>{formatMoney(request.budget)}</dd>
              </div>
              <div>
                <dt>Pickup window</dt>
                <dd>{prettyTime(request.time)}</dd>
              </div>
              <div>
                <dt>Practical radius</dt>
                <dd>{request.radius} km</dd>
              </div>
              <div>
                <dt>What a kitchen sees</dt>
                <dd>An anonymous summary</dd>
              </div>
            </dl>

            <div className="preview-lines">
              <p>“A veg dinner · up to ₹150 · 8–9 PM”</p>
              <p>“Anything good · under ₹120 · 8:30–9:30 PM”</p>
              <span>Two sample requests from the demo pool</span>
            </div>

            <button className="link-arrow light" onClick={goBoard}>
              Skip ahead and see the board <Arrow size={16} />
            </button>
          </aside>
        </div>
      </Reveal>
    </div>
  )
}
