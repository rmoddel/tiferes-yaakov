import { FormEvent, SyntheticEvent, useEffect, useState } from "react";

const donationAmounts = ["$36", "$72", "$180", "$360", "$500", "$1000"];
const logoSrc = "/image(13).png";
const fallbackLogoSrc = "/logo-mark.svg";

const fadeUpTargets = [
  "hero-content",
  "mission-head",
  "mission-quote",
  "partners-head",
  "partner-1",
  "partner-2",
  "partner-3",
  "partner-4",
  "impact-head",
  "impact-1",
  "impact-2",
  "impact-3",
  "impact-4",
  "donate-box",
  "contact-head",
  "contact-form",
] as const;

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDonation, setActiveDonation] = useState("$180");
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set(["hero-content"]));

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              next.add(entry.target.dataset.fadeId ?? "");
              observer.unobserve(entry.target);
            }
          });
          return next;
        });
      },
      { threshold: 0.16 },
    );

    const targets = document.querySelectorAll<HTMLElement>("[data-fade-id]");
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert("Placeholder form — connect this to your backend or form service.");
  };

  const fadeClassName = (id: (typeof fadeUpTargets)[number]) =>
    visibleIds.has(id) ? "fade-up visible" : "fade-up";

  const handleLogoError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackLogoSrc;
  };

  return (
    <div className="page">
      <nav className={`nav${isScrolled ? " scrolled" : ""}`} id="nav">
        <a href="#" className="brand" onClick={closeMenu}>
          <div className="brand-mark">
            <img
              src={logoSrc}
              alt="Congregation Tiferes Yaakov Logo"
              onError={handleLogoError}
              style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%", padding: 4 }}
            />
          </div>
          <div>
            <strong>Congregation Tiferes Yaakov</strong>
            <span>Torah • Tzedakah • Chessed</span>
          </div>
        </a>

        <button
          className="mobile-menu"
          id="menuBtn"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="navLinks"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          Menu
        </button>

        <div className={`nav-links${isMenuOpen ? " open" : ""}`} id="navLinks">
          <a href="#mission" onClick={closeMenu}>
            Mission
          </a>
          <a href="#partners" onClick={closeMenu}>
            Partners
          </a>
          <a href="#impact" onClick={closeMenu}>
            Impact
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <a href="#donate" className="btn filled" onClick={closeMenu}>
            Donate Now
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className={fadeClassName("hero-content")} data-fade-id="hero-content">
          <img
            src={logoSrc}
            alt="Congregation Tiferes Yaakov Logo"
            className="hero-logo"
            onError={handleLogoError}
          />
          <div className="eyebrow">Congregation Tiferes Yaakov</div>
          <h1>Bringing Light to Those in Need.</h1>
          <p className="hero-text">
            Partnering with established charitable organizations to channel your generosity where it matters most
            — directly to families facing hardship.
          </p>
          <div className="hero-actions">
            <a href="#donate" className="btn filled">
              Make a Donation
            </a>
            <a href="#partners" className="btn">
              Our Partners
            </a>
          </div>
        </div>
        <div className="scroll-note">Scroll</div>
      </header>

      <section className="mission" id="mission">
        <div className="mission-grid">
          <div className={fadeClassName("mission-head")} data-fade-id="mission-head">
            <div className="section-head">
              <div className="eyebrow">Our Mission</div>
              <h2>A Bridge Between Generosity and Need</h2>
              <p>
                Tiferes Yaakov was founded with a singular purpose: to serve as a trusted conduit between generous
                donors and families in desperate need. We work hand-in-hand with established charitable organizations,
                each with deep community roots and proven track records.
              </p>
              <br />
              <p>
                Every dollar contributed flows directly to vetted programs that provide food, clothing, medical
                assistance, and dignity to those who need it most. Our partnerships ensure that generosity creates
                real, lasting impact.
              </p>
              <br />
              <p>
                We believe in transparency, accountability, and the profound Jewish value of tzedakah — righteous
                giving that uplifts both the giver and the receiver.
              </p>
            </div>

            <div className="stats-mini">
              <div className="mini-stat">
                <strong>4+</strong>
                <span>Partner Organizations</span>
              </div>
              <div className="mini-stat">
                <strong>1000+</strong>
                <span>Families Helped</span>
              </div>
              <div className="mini-stat">
                <strong>100%</strong>
                <span>Transparency</span>
              </div>
            </div>
          </div>

          <div className={`quote-card ${fadeClassName("mission-quote")}`} data-fade-id="mission-quote">
            <div className="hebrew">עולם חסד יבנה</div>
            <p>“The beauty of giving is found not in what we give, but in the lives we touch.”</p>
          </div>
        </div>
      </section>

      <section className="partners" id="partners">
        <div className={`section-head ${fadeClassName("partners-head")}`} data-fade-id="partners-head">
          <div className="eyebrow">Our Partners</div>
          <h2>Trusted Organizations, Proven Impact</h2>
          <p>
            We partner exclusively with organizations that share our commitment to transparency, efficiency, and
            compassionate service.
          </p>
        </div>

        <div className="partner-list">
          <article className={`partner-card ${fadeClassName("partner-1")}`} data-fade-id="partner-1">
            <div className="partner-top">
              <div className="partner-num">01</div>
              <div className="partner-category">Food &amp; Basic Needs</div>
            </div>
            <h3>Aniyei Kiryat Sefer</h3>
            <div className="partner-lead">Led by Yoely Zupnik</div>
            <p>
              Providing essential support to families in Kiryat Sefer, ensuring no one goes without basic necessities.
            </p>
            <a href="#" className="learn-more">
              Learn More
            </a>
          </article>

          <article className={`partner-card ${fadeClassName("partner-2")}`} data-fade-id="partner-2">
            <div className="partner-top">
              <div className="partner-num">02</div>
              <div className="partner-category">Hunger Relief</div>
            </div>
            <h3>Lehasbia</h3>
            <div className="partner-lead">Led by Sruly Katz</div>
            <p>Dedicated to feeding hungry families with dignity, delivering meals and groceries to those in need.</p>
            <a href="#" className="learn-more">
              Learn More
            </a>
          </article>

          <article className={`partner-card ${fadeClassName("partner-3")}`} data-fade-id="partner-3">
            <div className="partner-top">
              <div className="partner-num">03</div>
              <div className="partner-category">Clothing &amp; Dignity</div>
            </div>
            <h3>Dressed with Dignity</h3>
            <div className="partner-lead">Community Led</div>
            <p>
              Ensuring every person has access to clean, quality clothing — because dignity starts with how we dress.
            </p>
            <a href="#" className="learn-more">
              Learn More
            </a>
          </article>

          <article className={`partner-card ${fadeClassName("partner-4")}`} data-fade-id="partner-4">
            <div className="partner-top">
              <div className="partner-num">04</div>
              <div className="partner-category">Various Causes</div>
            </div>
            <h3>Additional Partners</h3>
            <div className="partner-lead">Various Leaders</div>
            <p>
              We continue to expand our network of trusted charitable organizations to maximize our collective impact.
            </p>
            <a href="#" className="learn-more">
              Learn More
            </a>
          </article>
        </div>
      </section>

      <section className="impact" id="impact">
        <div
          className={`section-head center ${fadeClassName("impact-head")}`}
          data-fade-id="impact-head"
        >
          <div className="eyebrow">Our Impact</div>
          <h2>Every Contribution Creates Change</h2>
          <p>Your donations are transformed into tangible support for families facing hardship.</p>
        </div>

        <div className="impact-grid">
          <div className={`impact-card ${fadeClassName("impact-1")}`} data-fade-id="impact-1">
            <h3>Food Security</h3>
            <p>Weekly food packages and hot meals delivered to families who would otherwise go hungry.</p>
            <strong>500+</strong>
            <span>Meals Monthly</span>
          </div>
          <div className={`impact-card ${fadeClassName("impact-2")}`} data-fade-id="impact-2">
            <h3>Clothing &amp; Dignity</h3>
            <p>Quality clothing for adults and children, restoring dignity and confidence.</p>
            <strong>200+</strong>
            <span>Families Clothed</span>
          </div>
          <div className={`impact-card ${fadeClassName("impact-3")}`} data-fade-id="impact-3">
            <h3>Essential Support</h3>
            <p>Rent assistance, utility bills, and emergency funds for families in crisis.</p>
            <strong>$50K+</strong>
            <span>In Support</span>
          </div>
          <div className={`impact-card ${fadeClassName("impact-4")}`} data-fade-id="impact-4">
            <h3>Community Care</h3>
            <p>Holiday assistance, school supplies, and celebration support for special occasions.</p>
            <strong>Year</strong>
            <span>Round Support</span>
          </div>
        </div>
      </section>

      <section className="donate" id="donate">
        <div className={`donate-box ${fadeClassName("donate-box")}`} data-fade-id="donate-box">
          <div className="eyebrow">Support Our Mission</div>
          <h2>Your Gift Changes Lives</h2>
          <p>
            Every donation, regardless of size, goes directly toward helping families in need. Choose an amount that
            is meaningful to you, or set up a recurring gift to provide ongoing support.
          </p>

          <div className="gift-grid">
            <div className="gift-card">
              <strong>$36</strong>
              <span>Feeds a family for one week with essential groceries.</span>
            </div>
            <div className="gift-card">
              <strong>$180</strong>
              <span>Provides clothing for an entire family including children.</span>
            </div>
            <div className="gift-card">
              <strong>$360</strong>
              <span>Covers utility bills for a struggling family for one month.</span>
            </div>
          </div>

          <div className="donate-note">
            <span>Tax Deductible</span>
            <span>Secure Payment</span>
            <span>One-Time Gift</span>
            <span>Monthly Supporter</span>
          </div>

          <div className="donation-options">
            {donationAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className={activeDonation === amount ? "active" : ""}
                onClick={() => setActiveDonation(amount)}
              >
                {amount}
              </button>
            ))}
          </div>

          <p>Your one-time gift</p>
          <div className="donate-actions">
            <a href="#" className="btn filled">
              Donate with Card
            </a>
            <a href="#" className="btn secondary-action">
              PayPal Giving
            </a>
          </div>
          <p className="donate-footnote">
            Tiferes Yaakov is a registered 501(c)(3) organization. All donations are tax-deductible.
          </p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid">
          <div className={fadeClassName("contact-head")} data-fade-id="contact-head">
            <div className="section-head">
              <div className="eyebrow">Get In Touch</div>
              <h2>Questions? We’re Here to Help</h2>
              <p>
                Whether you have questions about our work, want to learn more about our partner organizations, or are
                interested in becoming a regular supporter — we would love to hear from you.
              </p>
            </div>

            <div className="contact-card contact-info-card">
              <div className="contact-line">
                <strong>Email</strong>
                info@tiferesyaakov.org
              </div>
              <div className="contact-line">
                <strong>Phone</strong>
                (123) 456-7890
              </div>
              <div className="talmud-quote">
                “Tzedakah is equal in importance to all the other commandments combined.”
                <br />
                <span>— Talmud, Bava Batra 9a</span>
              </div>
            </div>
          </div>

          <div className={`contact-card ${fadeClassName("contact-form")}`} data-fade-id="contact-form">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email Address" />
              <textarea placeholder="How can we help you?" />
              <button className="btn filled" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <h4>Congregation Tiferes Yaakov</h4>
            <p>
              Partnering with established charitable organizations to bring hope and dignity to families in need.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="#mission">Our Mission</a>
            <a href="#partners">Partners</a>
            <a href="#impact">Impact</a>
            <a href="#donate">Donate</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#donate">Donate via Card</a>
            <a href="#donate">PayPal Giving</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Tiferes Yaakov. All rights reserved.</div>
          <div>Made with care for those in need</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
