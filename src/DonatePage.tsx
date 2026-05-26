import { SiteFooter, SiteHeader } from "./SiteChrome";

function DonatePage() {
  return (
    <div className="donate-page">
      <SiteHeader
        sectionLinks={[
          { href: "/#mission", label: "Mission" },
          { href: "/#partners", label: "Partners" },
          { href: "/#contact", label: "Contact" },
        ]}
      />

      <div className="donate-shell">
        <main className="donate-layout donate-layout-simple">
          <section className="donate-intro">
            <div className="eyebrow">Donate</div>
            <h1>Ways to Give</h1>
            <p>
              Donations support Congregation Tiferes Yaakov’s charitable work, community assistance, and Jewish
              education. Please use one of the giving methods below.
            </p>

            <ul className="donate-benefits">
              <li>Online giving</li>
              <li>Mail a check</li>
              <li>Donor-advised funds</li>
            </ul>
            <p>
              If none of these options works for you, please{" "}
              <a href="/#contact-form" className="inline-link">
                reach out to us
              </a>{" "}
              and we will help arrange another way to give.
            </p>
          </section>

          <section className="donate-panel">
            <div className="donate-form donate-methods">
              <div className="donate-form-block">
                <h2>Online giving</h2>
                <p className="donate-method-copy">
                  Use one of the congregation’s external giving pages to make an online contribution.
                </p>
                <div className="donate-action-list">
                  <a href="https://thedonorsfund.org/donate/congregation-tiferes-yaakov/834411630" className="btn filled" target="_blank" rel="noreferrer">
                    via The Donors Fund
                  </a>
                  <a
                    href="https://www.paypal.com/us/fundraiser/charity/3817152"
                    className="btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    via PayPal
                  </a>
                </div>
              </div>

              <div className="donate-form-block">
                <h2>Mail a check</h2>
                <p className="donate-method-copy">
                  Checks can be mailed directly to the congregation. Please make checks payable exactly as shown
                  below.
                </p>
                <div className="donate-instruction-card">
                  <strong>Payable to:</strong>
                  <span>Cong. Tiferes Yaakov</span>
                  <strong>Mail to:</strong>
                  <span>6 Shoshana Drive</span>
                  <span>Lakewood, NJ 08701</span>
                </div>
              </div>

              <div className="donate-form-block">
                <h2>Donor-advised funds</h2>
                <p className="donate-method-copy">
                  DAF grants can be recommended using the congregation’s tax identification number.
                </p>
                <div className="donate-instruction-card">
                  <strong>Organization:</strong>
                  <span>Cong. Tiferes Yaakov</span>
                  <strong>Tax ID / EIN:</strong>
                  <span>83-4411630</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}

export default DonatePage;
