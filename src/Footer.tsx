import type { Page } from './types'

export function Footer({
  nav,
  goSection,
  reset,
}: {
  nav: (page: Page) => void
  goSection: (id: string) => void
  reset: () => void
}) {
  return (
    <footer className="site-footer">
      <div className="footer-wrap">
        <svg className="footer-scallop" viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 26V13a50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0 50 13 0 0 1 100 0V26Z"
            fill="var(--paper)"
          />
        </svg>
        <div className="footer-card">
          <div className="footer-message">
            <h2>See you at pickup.</h2>
            <p>
              DropPool is a demand-first prototype for selling surplus food before it goes to waste. Every kitchen,
              batch and reservation in this demo is simulated.
            </p>
            <p className="small">No payments. No real reservations. No fake impact numbers.</p>
            <div className="footer-links">
              <button onClick={() => nav('pool')}>Build my pool</button>
              <button onClick={() => goSection('board')}>Tonight’s board</button>
              <button onClick={() => nav('merchant')}>For kitchens</button>
              <button onClick={reset}>Reset the demo</button>
            </div>
          </div>

          <div className="footer-stamp">
            <div className="stamp-frame">
              <img src="/images/bread-stamp.jpg" alt="A loaf of bread on a bakery counter." width="900" height="599" loading="lazy" />
            </div>
            <p className="stamp-caption">Good food.<br />Better prices.<br />Less waste.</p>
          </div>

          <p className="footer-imprint">
            © 2026 DropPool · A neighbourhood food prototype · Photography from Unsplash, used under the Unsplash
            Licence · All merchants and figures are fictional.
          </p>
        </div>
      </div>
    </footer>
  )
}
