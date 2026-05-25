import { FormEvent, SyntheticEvent, useMemo, useState } from "react";

const logoSrc = "/congregation-tiferes-yaakov-logo.svg";
const fallbackLogoSrc = "/logo-mark.svg";
const presetAmounts = [18, 36, 72, 180, 360, 500, 1000, 1800] as const;

function DonatePage() {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(180);
  const [customAmount, setCustomAmount] = useState("");

  const handleLogoError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackLogoSrc;
  };

  const effectiveAmount = useMemo(() => {
    if (selectedAmount !== null) {
      return selectedAmount;
    }

    const parsed = Number(customAmount.replace(/[^\d.]/g, ""));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }, [customAmount, selectedAmount]);

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setSelectedAmount(null);
    setCustomAmount(value.replace(/[^\d.]/g, ""));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert("Placeholder donation form — connect this securely to your payment processor.");
  };

  return (
    <div className="donate-page">
      <div className="donate-shell">
        <header className="donate-header">
          <a href="/" className="donate-brand">
            <img src={logoSrc} alt="Congregation Tiferes Yaakov Logo" onError={handleLogoError} />
            <div>
              <span>Congregation</span>
              <strong>Tiferes Yaakov</strong>
            </div>
          </a>
          <a href="/" className="btn donate-back">
            Back to site
          </a>
        </header>

        <main className="donate-layout">
          <section className="donate-intro">
            <div className="eyebrow">Congregation Tiferes Yaakov</div>
            <h1>Make a Donation</h1>
            <p>
              Your support enables us to continue our vital work supporting Torah families across Eretz Yisroel.
            </p>

            <div className="donate-frequency" role="tablist" aria-label="Donation frequency">
              <button
                type="button"
                className={frequency === "one-time" ? "active" : ""}
                onClick={() => setFrequency("one-time")}
              >
                One-Time
              </button>
              <button
                type="button"
                className={frequency === "monthly" ? "active" : ""}
                onClick={() => setFrequency("monthly")}
              >
                Monthly
              </button>
            </div>

            <div className="donate-amount-grid">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={selectedAmount === amount ? "active" : ""}
                  onClick={() => handlePresetClick(amount)}
                >
                  ${amount}
                </button>
              ))}
              <label className={`donate-custom ${selectedAmount === null ? "active" : ""}`}>
                <span>$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Other amount"
                  value={customAmount}
                  onChange={(event) => handleCustomAmountChange(event.target.value)}
                />
              </label>
            </div>

            <div className="donate-summary">
              <span>{frequency === "one-time" ? "One-time donation" : "Monthly donation"}</span>
              <strong>${effectiveAmount.toLocaleString()}</strong>
            </div>

            <ul className="donate-benefits">
              <li>100% of your donation goes directly to helping families</li>
              <li>Tax-deductible under 501(c)(3)</li>
              <li>Receipt sent immediately via email</li>
            </ul>
          </section>

          <section className="donate-panel">
            <form className="donate-form" onSubmit={handleSubmit}>
              <div className="donate-form-block">
                <h2>Donor Information</h2>

                <div className="donate-form-grid two">
                  <label>
                    <span>First Name *</span>
                    <input type="text" required />
                  </label>
                  <label>
                    <span>Last Name *</span>
                    <input type="text" required />
                  </label>
                </div>

                <div className="donate-form-grid two">
                  <label>
                    <span>Email *</span>
                    <input type="email" required />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input type="tel" />
                  </label>
                </div>

                <label>
                  <span>Address</span>
                  <input type="text" />
                </label>

                <div className="donate-form-grid three">
                  <label>
                    <span>City</span>
                    <input type="text" />
                  </label>
                  <label>
                    <span>State</span>
                    <input type="text" />
                  </label>
                  <label>
                    <span>ZIP</span>
                    <input type="text" />
                  </label>
                </div>

                <label>
                  <span>Dedication (optional)</span>
                  <input type="text" placeholder="In honor of... / In memory of... / L'ilui Nishmas..." />
                  <small>Your dedication will appear on the receipt</small>
                </label>
              </div>

              <div className="donate-form-block">
                <h2>Payment Details</h2>

                <label>
                  <span>Card Number *</span>
                  <input type="text" required placeholder="1234 5678 9012 3456" />
                </label>

                <div className="donate-form-grid two">
                  <label>
                    <span>Expiration *</span>
                    <input type="text" required placeholder="MM/YY" />
                  </label>
                  <label>
                    <span>CVV *</span>
                    <input type="text" required placeholder="123" />
                  </label>
                </div>

                <p className="donate-security">
                  Your payment info is secure and encrypted via Cardknox
                </p>

                <button className="btn filled donate-submit" type="submit">
                  Donate ${effectiveAmount.toLocaleString()}
                </button>

                <div className="donate-alt">
                  <span>Or donate via</span>
                  <a href="#" className="btn">
                    PayPal Giving
                  </a>
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DonatePage;
