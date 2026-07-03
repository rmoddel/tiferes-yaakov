import { FormEvent, useEffect, useRef, useState } from "react";
import { sendMessage } from "./emailService";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { TurnstileWidget } from "./TurnstileWidget";

const partnerOrganizations = [
  {
    fadeId: "partner-1",
    category: "Yom Tov Essentials",
    badge: "",
    name: "Aniyei Kiryat Sefer",
    lead: "",
    description:
      "Providing food support to families from the diverse communities of Kiryat Sefer, which has the highest concentration of Torah scholars in Eretz Yisroel. Every dollar is multiplied 6x through strategic partnerships and bulk purchasing. Your support goes toward alleviating food insecurity and enabling the celebration of Shabbosos and Yomim Tovim",
    stats: [
      { value: "56,000+", label: "People Supported" },
      { value: "$14M", label: "Annual Budget" },
      { value: "6,000+", label: "Families Served" },
      { value: "6x", label: "Your Impact" },
    ],
  },
  {
    fadeId: "partner-2",
    category: "Protein & Nutrition",
    badge: "",
    name: "Lihasbia Chicken Project",
    lead: "",
    description:
      "Addressing food insecurity among kollel families with healthy, diverse, and nutrition-rich meal options. With a goal of two chickens per child monthly, your donation helps promote balanced nutrition for growing families who would otherwise remain food insecure.",
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
    badge: "",
    name: "Malbushei Kavod",
    lead: "Dressed with Dignity",
    description:
      "Ensuring families are helped with obtaining dignified and culturally appropriate clothing throughout the year and during important holiday seasons. Through strategic purchasing, $15M in donations creates $40M of value for Klal Yisroel.",
    stats: [
      { value: "31,000+", label: "Families Served" },
      { value: "160,000+", label: "Children Clothed" },
      { value: "900,000+", label: "Clothing Items" },
      { value: "1,100+", label: "Neighborhoods Across Eretz Yisroel" },
    ],
  },
  {
    fadeId: "partner-4",
    category: "Torah Support",
    badge: "",
    name: "Keren Olam HaTorah",
    lead: "",
    description:
      "Supporting Torah scholars and their families throughout Eretz Yisroel, enabling those engaged in study can continue their sacred work without being a financial burden.",
    stats: [
      { value: "120,000+", label: "Torah Scholars" },
      { value: "233", label: "Cities Across Eretz Yisroel" },
      { value: "1500+", label: "Torah Institutions" },
      { value: "1M nis", label: "Avg. Daily Distribution" },
    ],
  },
  {
    fadeId: "partner-5",
    category: "Basic Needs",
    badge: "",
    name: "Kupas Bet Shemesh",
    lead: "",
    description:
      "Providing weekly assistance to hundreds of impoverished families in Bet Shemesh with basic necessities, food support, utilities subsidies, medical expenses, and emergency support when needed most.",
    stats: [
      { value: "1300+", label: "Families Weekly" },
      { value: "$10M+", label: "Yearly Aid" },
    ],
  },
  {
    fadeId: "partner-6",
    category: "Crisis Prevention",
    badge: "",
    name: "Tova U'Vracha",
    lead: "",
    description:
      "Providing financial relief by serving overlooked families across Eretz Yisroel ensuring families don't have to give up one necessity to afford another.",
    stats: [
      { value: "41,428", label: "Families Served" },
      { value: "89", label: "Cities" },
      
    ],
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
  "partner-6",
  "donate-box",
  "contact-head",
  "contact-form",
] as const;

function ParnasHayom() {
  return (
    <section className="parnas-hayom" aria-label="Parnas Hayom sponsor">
      <div className="parnas-card">
        <div>
          <div className="eyebrow">Parnas Hayom</div>
          <h2>
            Sponsored by
            <span>Pomerantz and Pomerantz, PLLC</span>
          </h2>
          <p>Attorney at Law</p>
        </div>
        <a href="tel:8455472600" className="parnas-phone">
          845-547-2600
        </a>
      </div>
    </section>
  );
}

function App() {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set(["hero-content"]));
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    optIn: "no" as "yes" | "no",
  });
  const [submitState, setSubmitState] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState("");

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

  useEffect(() => {
    const scrollToHashTarget = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        return;
      }

      window.requestAnimationFrame(() => {
        const element = document.getElementById(hash);
        if (!element) {
          return;
        }

        const top = element.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: "smooth" });
      });
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => window.removeEventListener("hashchange", scrollToHashTarget);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!turnstileToken) {
      setSubmitState({
        status: "error",
        message: "Please complete the captcha before sending your message.",
      });
      return;
    }

    setSubmitState({ status: "submitting", message: "" });

    const result = await sendMessage(contactForm);

    if (!result.ok) {
      setSubmitState({
        status: "error",
        message: result.error,
      });
      return;
    }

    setSubmitState({
      status: "success",
      message: "Your message was sent successfully. We will get back to you soon.",
    });
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      optIn: "no",
    });
    setTurnstileToken("");
  };

  const fadeClassName = (id: (typeof fadeUpTargets)[number]) =>
    visibleIds.has(id) ? "fade-up visible" : "fade-up";

  return (
    <div className="page">
      <SiteHeader
        sectionLinks={[
          { href: "#mission", label: "Mission" },
          { href: "#partners", label: "Partners" },
          { href: "#contact", label: "Contact" },
        ]}
      />

      <header className="hero">
        <div className={fadeClassName("hero-content")} data-fade-id="hero-content">
          <h1>Bringing Light to Those in Need.</h1>
          <p className="hero-text">
            Congregation Tiferes Yaakov is a community-driven Orthodox Jewish congregation dedicated 
            to helping families in need, strengthening Torah and Jewish education, and supporting 
            meaningful charitable initiatives through trusted partnerships and responsible stewardship.
          </p>
          <div className="hero-actions">
            <a href="/donate/" className="btn filled">
              Make a Donation
            </a>
            <a href="#partners" className="btn">
              Our Partners
            </a>
          </div>
        </div>
        <div className="scroll-note">Scroll</div>
      </header>

      <ParnasHayom />

      <section className="mission" id="mission">
        <div className="mission-grid">
          <div className={fadeClassName("mission-head")} data-fade-id="mission-head">
            <div className="section-head">
              <div className="eyebrow">Our Mission</div>
              <h2>Who We Are</h2>
              <p>
                Congregation Tiferes Yaakov is an Orthodox Jewish congregation dedicated to strengthening Torah, 
                supporting families in need, and advancing meaningful charitable initiatives through direct assistance 
                to families in need and trusted partnerships.
                <br />
                <br />
                Through our work with Rabbonim, community leaders, and established programs, we help provide food support, 
                educational assistance, medical relief, emergency aid, and other essential services to families and communities worldwide.
                <br />
                <br />
                Our congregation is committed to ensuring that charitable funds are distributed responsibly, compliantly, and with meaningful impact.
              </p>
              <br />
              <ul>
                <li>Supporting families with daily living and Yom Tov needs</li>
                <li>Assisting educational and nutrition initiatives benefiting thousands</li>
                <li>Partnering with trusted organizations and community programs</li>
                <li>Strengthening Torah and community support systems worldwide</li>
              </ul>
            </div>

            <div className="stats-mini">
              <div className="mini-stat">
                <AnimatedMetric value="25,000+" />
                <span>Families Helped</span>
              </div>
            </div>
          </div>

          <div className={`quote-card ${fadeClassName("mission-quote")}`} data-fade-id="mission-quote">
            <div className="hebrew">עולם חסד יבנה</div>
            <div className="hebrew-translation">Building our world through kindness</div>
            {/* <img
              src="/hero-radiant-family.png"
              alt="Acts of kindness strengthening the world"
              className="mission-art"
            /> */}
            <p>“The beauty of giving is found not in what we give, but in the lives we touch.”</p>
          </div>
        </div>
      </section>

      <section className="partners" id="partners">
        <div className={`section-head ${fadeClassName("partners-head")}`} data-fade-id="partners-head">
          <div className="eyebrow">Featured Partners</div>
          <h2>Trusted Organizations, Proven Impact</h2>
          <p>
            We partner with organizations that share our commitment to transparency, efficiency, and compassionate
            service.
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
                    <AnimatedMetric value={stat.value} />
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <a href="/donate/" className="learn-more">
                Support This Work
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="donate" id="donate">
        <div className={`donate-box ${fadeClassName("donate-box")}`} data-fade-id="donate-box">
          <div className="eyebrow">Support Our Mission</div>
          <h2>Your Gift Changes Lives</h2>
          <p>
            Every donation goes directly toward helping families in need. Support food, clothing, weddings, holiday
            assistance, and educational programming through the congregation’s charitable work.
          </p>

          <div className="gift-grid">
            <div className="gift-card">
               <strong>$3600</strong>
              <span>Feeds 100 families for one week with essential groceries.</span>
            </div>
            <div className="gift-card">
              <strong>$18,000</strong>
              <span>Provides clothing for an entire neighborhood.</span>
            </div>
            <div className="gift-card">
              <strong>$36,000</strong>
              <span>Sponsors 10 weddings for struggling families.</span>
            </div>
          </div>

          <div className="donate-actions">
            <a href="/donate/" className="btn filled">
              Donate
            </a>
          </div>
          <p className="donate-footnote">
            Congregation Tiferes Yaakov is a registered 501(c)(3) organization. 
            <br/> EIN: 83-4411630. 
            <br/> All donations are tax-deductible.
          </p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid">
          <div className={fadeClassName("contact-head")} data-fade-id="contact-head">
            <div className="section-head">
              <div className="eyebrow" id="#contact">Get In Touch</div>
              <h2>Questions? We’re Here to Help</h2>
              <p>
                Whether you have questions about our work, want to learn more about our partner organizations, or are
                interested in supporting the congregation, we would love to hear from you.
              </p>
            </div>

            <div className="contact-card contact-info-card">
              <div className="contact-line">
                <strong>Email</strong>
                info@tiferesyaakov.org
              </div>
              <div className="talmud-quote">
                “Tzedakah is equal in importance to all the other commandments combined.”
                <br />
                <span>— Talmud, Bava Batra 9a</span>
              </div>
            </div>
          </div>

          <div
            className={`contact-card ${fadeClassName("contact-form")}`}
            data-fade-id="contact-form"
            id="contact-form"
          >
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(event) => setContactForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={contactForm.email}
                onChange={(event) => setContactForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={contactForm.phone}
                onChange={(event) => setContactForm((current) => ({ ...current, phone: event.target.value }))}
              />
              <textarea
                placeholder="How can we help you?"
                value={contactForm.message}
                onChange={(event) => setContactForm((current) => ({ ...current, message: event.target.value }))}
                required
              />
              <TurnstileWidget onTokenChange={setTurnstileToken} />
              <button className="btn filled" type="submit" disabled={submitState.status === "submitting"}>
                {submitState.status === "submitting" ? "Sending..." : "Send Message"}
              </button>
              {submitState.status !== "idle" ? (
                <p className={`form-status ${submitState.status}`}>{submitState.message}</p>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

type AnimatedMetricProps = {
  value: string;
  className?: string;
};

function AnimatedMetric({ value, className }: AnimatedMetricProps) {
  const [displayValue, setDisplayValue] = useState(() => formatAnimatedMetric(value, 0));
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      return;
    }

    const target = parseAnimatedMetric(value);
    const duration = 1400;
    let frameId = 0;

    const animate = () => {
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        setDisplayValue(formatAnimatedMetric(value, target * eased));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.cancelAnimationFrame(frameId);

        if (entry.isIntersecting) {
          setDisplayValue(formatAnimatedMetric(value, 0));
          animate();
        } else {
          setDisplayValue(formatAnimatedMetric(value, 0));
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <strong className={className} ref={elementRef}>
      {displayValue}
    </strong>
  );
}

function parseAnimatedMetric(rawValue: string) {
  if (rawValue.includes("M")) {
    return Number(rawValue.replace(/[^\d.]/g, "")) * 1_000_000;
  }

  if (rawValue.includes("x")) {
    return Number(rawValue.replace(/[^\d.]/g, ""));
  }

  return Number(rawValue.replace(/[^\d]/g, ""));
}

function formatAnimatedMetric(template: string, amount: number) {
  const rounded = Math.round(amount);

  if (template.includes("M")) {
    const prefix = template.trim().startsWith("$") ? "$" : "";
    const suffix = `${template.includes("+") ? "+" : ""}${template.includes("nis") ? " nis" : ""}`;
    const millions = Math.max(0, Math.round((rounded / 1_000_000) * 10) / 10);
    const compact = Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1);
    return `${prefix}${compact}M${suffix}`;
  }

  if (template.includes("x")) {
    const multiplier = Math.round(amount * 10) / 10;
    return `${Number.isInteger(multiplier) ? multiplier.toFixed(0) : multiplier.toFixed(1)}x`;
  }

  const prefix = template.trim().startsWith("$") ? "$" : "";
  const suffix = template.includes("+") ? "+" : "";
  return `${prefix}${rounded.toLocaleString()}${suffix}`;
}

export default App;
