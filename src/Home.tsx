import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { offers, preferenceLabels, preferenceNames } from './data'
import { discount, formatMoney, poolSignal } from './matching'
import type { Offer, Page, Preference, Request } from './types'
import { AnimatedNumber, Arrow, Reveal } from './ui'

type HomeProps = {
  request: Request
  setRequest: (request: Request) => void
  nav: (page: Page) => void
  goSection: (id: string) => void
  choose: (offer: Offer) => void
}

const tilts = ['-1.4deg', '0.9deg', '-0.6deg', '1.2deg', '-0.9deg', '0.5deg']
const choices: Preference[] = ['vegetarian', 'bakery', 'any']

export function Home({ request, setRequest, nav, goSection, choose }: HomeProps) {
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const boardRef = useRef<HTMLElement>(null)
  const heroScroll = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const boardScroll = useScroll({ target: boardRef, offset: ['start end', 'end start'] })
  const heroY = useTransform(heroScroll.scrollYProgress, [0, 1], [0, 54])
  const heroScale = useTransform(heroScroll.scrollYProgress, [0, 1], [1, 1.045])
  const boardY = useTransform(boardScroll.scrollYProgress, [0, 1], [-28, 28])
  const signal = poolSignal(request)
  const example = offers[0]

  return (
    <>
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <motion.div
          className="hero-card"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="line">
                <motion.span
                  initial={reduce ? false : { y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.78, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  Dinner<span className="hero-punct">,</span>
                </motion.span>
              </span>
              <span className="line">
                <motion.span
                  initial={reduce ? false : { y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.78, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  pooled<span className="hero-punct">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="hero-lede"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              Tell your neighbourhood what you’d pick up tonight. Local kitchens answer with the last of their good
              food, priced to go before they close.
            </motion.p>

            <motion.div
              className="hero-live"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pick-row" role="group" aria-label="What I’d pick up">
                {choices.map((choice) => (
                  <button
                    key={choice}
                    className="pick-option"
                    aria-pressed={request.preference === choice}
                    onClick={() => setRequest({ ...request, preference: choice })}
                  >
                    {preferenceLabels[choice]}
                  </button>
                ))}
              </div>
              <div className="hero-tally" aria-live="polite">
                <AnimatedNumber value={signal.sameCrowd} className="tally-number" />
                <p>
                  neighbours want <b>{preferenceNames[request.preference].toLowerCase()}</b> tonight. {signal.total} local
                  requests sit inside {request.radius} km.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="hero-actions"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="btn btn-ink" onClick={() => nav('pool')}>
                Build my food pool <Arrow />
              </button>
              <button className="link-arrow" onClick={() => goSection('board')}>
                See tonight’s board <Arrow size={16} />
              </button>
            </motion.div>

            <motion.p
              className="fine-print"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
            >
              A working MVP · Fictional kitchens · Simulated batches
            </motion.p>
          </div>

          <figure className="hero-plate">
            <div className="hero-plate-img">
              <motion.img
                src={example.image}
                alt={`${example.item} from the demo kitchen ${example.merchant}.`}
                width="1800"
                height="1198"
                fetchPriority="high"
                style={reduce ? undefined : { y: heroY, scale: heroScale }}
              />
            </div>
            <figcaption>
              <strong>{example.item}</strong>
              <span className="plate-label">Tonight’s example · demo batch</span>
              <span>{example.merchant}, {example.area}</span>
              <span className="plate-price">
                <b>{formatMoney(example.price)}</b> <s>{formatMoney(example.original)}</s> · {example.qty} portions ·{' '}
                {discount(example)}% less
              </span>
            </figcaption>
          </figure>
        </motion.div>
      </section>

      <section className="board" id="board" ref={boardRef} aria-labelledby="board-title">
        <div className="board-stage">
          <div className="board-photo-wrap" aria-hidden="true">
            <motion.img
              className="board-photo"
              src="/images/night-service.jpg"
              alt=""
              width="2400"
              height="1600"
              loading="lazy"
              style={reduce ? undefined : { y: boardY }}
            />
          </div>

          <Reveal className="board-panel">
            <h2 id="board-title">Tonight’s board.</h2>
            <p>
              Six kitchens have portions left at closing. Every batch prints its price, pickup window and allergens
              before you decide.
            </p>
            <div className="board-panel-foot">
              <button className="link-arrow light" onClick={() => nav('matches')}>
                See all matches <Arrow size={16} />
              </button>
              <span className="fine-print">Fictional kitchens · simulated stock</span>
            </div>
          </Reveal>

          <div className="slip-row">
            {offers.map((offer, index) => (
              <Reveal key={offer.id} delay={index * 0.055} className="slip-reveal">
                <article className="slip" style={{ '--tilt': tilts[index] } as CSSProperties}>
                  <img src={offer.image} alt={offer.item} width="1400" height="933" loading="lazy" />
                  <p className="slip-merchant">
                    {offer.merchant} · {offer.area}
                  </p>
                  <h3>{offer.item}</h3>
                  <p className="slip-price">
                    <strong>{formatMoney(offer.price)}</strong>
                    <s>{formatMoney(offer.original)}</s>
                    <span>{discount(offer)}% less</span>
                  </p>
                  <p className="slip-meta">
                    {offer.pickup.replace('Pickup by ', 'By ')} · {offer.distance} km
                  </p>
                  <p className="slip-meta">
                    {offer.qty} portions · {offer.allergens.join(', ')}
                  </p>
                  <button className="slip-cta" onClick={() => choose(offer)}>
                    Reserve a portion <Arrow size={15} />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="how" id="how" aria-labelledby="how-title">
        <div className="how-copy">
          <Reveal>
            <h2 id="how-title">
              The pool
              <br />
              moves first.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead">
              Most deals are published first and hoped for later. DropPool gathers the appetite before a kitchen
              portions its last batch.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              No account. No names shared. Just a clear local ask and a smaller batch that fits it. Fit is checked on
              price, distance, stock and pickup overlap. The ranking weights are prototype defaults.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="how-slip-wrap">
          <div className="how-slip">
            <div className="slip-rail">
              <span>How a drop works</span>
              <span>18 demo requests</span>
            </div>

            <ol className="route">
              <li>
                <div>
                  <span className="route-when">Before dinner</span>
                  <strong>You say what you’d pick up.</strong>
                  <p>Food, a cap, a radius and the window you can collect.</p>
                </div>
                <em>30 seconds</em>
              </li>
              <li>
                <div>
                  <span className="route-when">As the kitchen closes</span>
                  <strong>Neighbours pool the ask.</strong>
                  <p>Requests become one anonymous local signal. No names leave the pool.</p>
                </div>
                <em>No names shared</em>
              </li>
              <li>
                <div>
                  <span className="route-when">At the pass</span>
                  <strong>A kitchen answers with a batch.</strong>
                  <p>A small, honest quantity with a price and a pickup deadline.</p>
                </div>
                <em>Price · stock · time</em>
              </li>
              <li>
                <div>
                  <span className="route-when">By pickup</span>
                  <strong>You see why it fits, then reserve.</strong>
                  <p>Reasons are printed in plain words, not an opaque match score.</p>
                </div>
                <em>Demo reservation</em>
              </li>
            </ol>

            <div className="route-result">
              <span>The result</span>
              <strong>Dinner at a lower price, before it becomes waste.</strong>
              <em>Before 9:00 PM</em>
            </div>
            <p className="fine-print slip-fine">Simulated route · eligibility rules are real, numbers are demo data.</p>
          </div>
        </Reveal>
      </section>

      <section className="kitchens" aria-labelledby="kitchens-title">
        <Reveal className="kitchens-card">
          <h2 id="kitchens-title">
            The kitchens
            <br />
            on tonight’s list.
          </h2>
          <p className="kitchens-intro">
            Six fictional local kitchens, each with a different kind of surplus. They see the shape of the demand,
            never your name.
          </p>
          <img
            className="kitchens-photo"
            src="/images/market.jpg"
            alt="Vegetables arranged on shelves at a neighbourhood market."
            width="1600"
            height="1200"
            loading="lazy"
          />
          <ul className="kitchen-list">
            <li>Marigold Canteen · Civil Lines · rice bowls</li>
            <li>Nila Kitchen · Hudson Lane · mezze boxes</li>
            <li>Saffron &amp; Crumb · Kamla Nagar · bakery boxes</li>
            <li>Lemon Leaf · Model Town · pasta bowls</li>
            <li>Evening Table · Punjabi Bagh · supper plates</li>
            <li>Clover Club · Rajouri Garden · curries</li>
          </ul>
          <p className="fine-print">Fictional demo kitchens. No real partnership is implied.</p>
        </Reveal>
      </section>

      <section className="ledger" aria-labelledby="ledger-title">
        <div className="ledger-copy">
          <Reveal>
            <h2 id="ledger-title">
              A ledger,
              <br />
              not a claim.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Every number here is simulated for the prototype. Real impact would need merchant-confirmed batches,
              completed pickups and a stated measurement method.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="fine-print">
              All four figures are simulated demo data. They are not verified meals saved, kilograms diverted or
              emissions avoided.
            </p>
          </Reveal>
        </div>

        <div className="ledger-figures">
          <Reveal className="figure-row">
            <span className="figure-whole accent" aria-hidden="true">64</span>
            <span className="figure-decimal accent" aria-hidden="true" />
            <span className="figure-caption">
              <span className="sr-only">64 </span>demo meals matched across the sample pool
            </span>
          </Reveal>
          <Reveal className="figure-row" delay={0.06}>
            <span className="figure-whole" aria-hidden="true">₹6,480</span>
            <span className="figure-decimal" aria-hidden="true" />
            <span className="figure-caption">
              <span className="sr-only">₹6,480 </span>sample customer savings
            </span>
          </Reveal>
          <Reveal className="figure-row" delay={0.12}>
            <span className="figure-whole" aria-hidden="true">18</span>
            <span className="figure-decimal" aria-hidden="true" />
            <span className="figure-caption">
              <span className="sr-only">18 </span>neighbours in the sample pool
            </span>
          </Reveal>
          <Reveal className="figure-row" delay={0.18}>
            <span className="figure-whole" aria-hidden="true">1</span>
            <span className="figure-decimal" aria-hidden="true">.2</span>
            <span className="figure-caption">
              <span className="sr-only">1.2 </span>km, median distance to a demo batch
            </span>
          </Reveal>
        </div>
      </section>

      <section className="merchant-cta" aria-labelledby="merchant-title">
        <Reveal className="merchant-note">
          <p>Let the neighbourhood ask before you portion what’s left.</p>
          <ul className="merchant-benefits">
            <li>See the anonymised demand before you cook.</li>
            <li>Set the price, quantity and pickup deadline.</li>
            <li>Keep surplus visible until it finds a table.</li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="reply-wrap">
          <div className="reply-card">
            <div className="reply-stamp">
              <img
                src="/images/chef.jpg"
                alt="A cook plating a dish under warm kitchen lights."
                width="1200"
                height="1847"
                loading="lazy"
              />
            </div>
            <h2 id="merchant-title">
              Last call,
              <br />
              planned.
            </h2>
            <p>See the anonymised demand near your kitchen and publish a small batch that fits.</p>
            <button className="btn btn-ink wide" onClick={() => nav('merchant')}>
              Open the merchant view <Arrow />
            </button>
            <p className="fine-print">Demo workspace · Field &amp; Fork</p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
