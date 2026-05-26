import { FormEvent, SyntheticEvent, useEffect, useState } from "react";

const donationAmounts = ["$36", "$72", "$180", "$360", "$500", "$1000"];
const logoSrc = "/congregation-tiferes-yaakov-logo.svg";
const fallbackLogoSrc = "/logo-mark.svg";
const partnerOrganizations = [
  {
    fadeId: "partner-1",
    category: "Food Essentials",
    badge: "$1 = $6 of food essentials",
    name: "Aniyei Kiryat Sefer",
    lead: "Led by Yoely Zupnik",
    description:
      "Providing food essentials to families in Kiryat Sefer, the highest concentration of Torah scholars in Eretz Yisroel. Every dollar is multiplied 6x through strategic partnerships and bulk purchasing.",
    stats: [
      { value: "6,000+", label: "Families Served" },
      { value: "6x", label: "Your Impact" },
    ],
  },
  {
    fadeId: "partner-2",
    category: "Protein & Nutrition",
    badge: "$1 = $2.40 of food value",
    name: "Lihasbia Chicken Project",
    lead: "Led by Sruly Katz",
    description:
      "Nourishing kollel families with protein-rich meals. Two chickens per child monthly ensures proper nutrition for children who would otherwise eat pareve all week.",
    stats: [
      { value: "3,300+", label: "Kollel Families" },
      { value: "27,000+", label: "People Fed" },
      { value: "190+", label: "Kollelim" },
      { value: "$9M+", label: "Yearly Value" },
    ],
  },
  {
    fadeId: "partner-3",
    category: "Clothing & Dignity",
    badge: "$5M creates $40M of value",
    name: "Malbushei Kavod",
    lead: "Dressed with Dignity • Led by Moshe Bodner",
    description:
      "Ensuring every family is dressed in beautiful clothing for Yom Tov. Through strategic purchasing, $5M in donations creates $40M of value for Klal Yisroel.",
    stats: [
      { value: "31,000+", label: "Families Served" },
      { value: "160,000+", label: "Children Clothed" },
      { value: "900,000+", label: "Clothing Items" },
      { value: "1,100+", label: "Neighborhoods" },
    ],
  },
  {
    fadeId: "partner-4",
    category: "Torah Support",
    badge: "",
    name: "Keren Olam HaTorah",
    lead: "Led by Community Leadership",
    description:
      "Supporting Torah scholars and their families throughout Eretz Yisroel, ensuring that those dedicated to learning can continue their sacred work without financial burden.",
    stats: [
      { value: "5,000+", label: "Families Supported" },
      { value: "100%", label: "To Torah Families" },
    ],
  },
  {
    fadeId: "partner-5",
    category: "Basic Needs",
    badge: "",
    name: "Kupas Bet Shemesh",
    lead: "Led by Nachum Cheshin",
    description:
      "Providing weekly assistance to hundreds of impoverished families in Bet Shemesh with basic necessities, food, utilities, medical expenses, and emergency support when needed most.",
    stats: [
      { value: "500+", label: "Families Weekly" },
      { value: "$10M+", label: "Yearly Aid" },
    ],
  },
] as const;
const impactStats = [
  {
    fadeId: "impact-1",
    title: "Food Essentials",
    description: "Aniyei Kiryat Sefer multiplies every donated dollar into large-scale essentials through bulk purchasing.",
    value: "6,000+",
    label: "Families Served",
  },
  {
    fadeId: "impact-2",
    title: "Food Multiplication",
    description: "Strategic partnerships turn basic giving into materially larger food support on the ground.",
    value: "6x",
    label: "Your Impact",
  },
  {
    fadeId: "impact-3",
    title: "Protein & Nutrition",
    description: "The chicken project supports kollel homes with real nourishment rather than a week of pareve meals.",
    value: "27,000+",
    label: "People Fed",
  },
  {
    fadeId: "impact-4",
    title: "Clothing & Dignity",
    description: "Malbushei Kavod equips families for Yom Tov with dignified, beautiful clothing at scale.",
    value: "160,000+",
    label: "Children Clothed",
  },
  {
    fadeId: "impact-5",
    title: "Torah Support",
    description: "Keren Olam HaTorah keeps Torah families supported so learning can continue without crushing strain.",
    value: "5,000+",
    label: "Families Supported",
  },
  {
    fadeId: "impact-6",
    title: "Basic Needs",
    description: "Kupas Bet Shemesh provides weekly relief and year-round emergency aid where the need is immediate.",
    value: "$10M+",
    label: "Yearly Aid",
  },
] as const;

const fadeUpTargets = [
  "hero-content",
  "mission-head",
  "mission-quote",
  "partners-head",
  "partner-1",
  "partner-2",
  "partner-3",
  "partner-4",
  "partner-5",
  "impact-head",
  "impact-1",
  "impact-2",
  "impact-3",
  "impact-4",
  "impact-5",
  "impact-6",
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
          <a href="/donate" className="btn filled" onClick={closeMenu}>
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
            <a href="/donate" className="btn filled">
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
          {partnerOrganizations.map((partner) => (
            <article
              key={partner.fadeId}
              className={`partner-card ${fadeClassName(partner.fadeId)}`}
              data-fade-id={partner.fadeId}
            >
              <div className="partner-top">
                <div className="partner-category">{partner.category}</div>
                {partner.badge ? <div className="partner-badge">{partner.badge}</div> : null}
              </div>
              <h3>{partner.name}</h3>
              <div className="partner-lead">{partner.lead}</div>
              <p>{partner.description}</p>
              <div className={`partner-stats partner-stats-${partner.stats.length}`}>
                {partner.stats.map((stat) => (
                  <div key={`${partner.fadeId}-${stat.label}`} className="partner-stat-box">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <a href="/donate" className="learn-more">
                Support This Work
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="impact" id="impact">
        <div
          className={`section-head center ${fadeClassName("impact-head")}`}
          data-fade-id="impact-head"
        >
          <div className="eyebrow">Our Impact</div>
          <h2>Every Contribution Creates Change</h2>
          <p>Your donations are transformed into measurable support for Torah families across Eretz Yisroel.</p>
        </div>

        <div className="impact-grid">
          {impactStats.map((item) => (
            <div key={item.fadeId} className={`impact-card ${fadeClassName(item.fadeId)}`} data-fade-id={item.fadeId}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
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
            <a href="/donate" className="btn filled">
              Donate with Card
            </a>
            <a href="/donate" className="btn secondary-action">
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
            <a href="/donate">Donate</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="/donate">Donate via Card</a>
            <a href="/donate">PayPal Giving</a>
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
