import { SyntheticEvent, useEffect, useState } from "react";

const logoSrc = "/congregation-tiferes-yaakov-logo.svg";
const fallbackLogoSrc = "/logo-mark.svg";

type SiteHeaderProps = {
  sectionLinks?: Array<{ href: string; label: string }>;
};

export function SiteHeader({ sectionLinks = [] }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackLogoSrc;
  };

  return (
    <nav className={`nav${isScrolled ? " scrolled" : ""}`} id="nav">
      <a href="/" className="brand" onClick={closeMenu}>
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
        {sectionLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a href="/donate/" className="btn filled" onClick={closeMenu}>
          Donate
        </a>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const handleLogoError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackLogoSrc;
  };

  return (
    <footer>
      <div className="footer-grid">
        <div>
          <img
            src={logoSrc}
            alt="Congregation Tiferes Yaakov Logo"
            className="footer-logo"
            onError={handleLogoError}
          />
          <div className="eyebrow">Congregation Tiferes Yaakov</div>
          <p>Behind every home we touch is a heart like yours</p>
          <p>6 Shoshana Drive</p>
          <p>Lakewood, NJ 08701</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="/#mission">Our Mission</a>
          <a href="/#partners">Partners</a>
          <a href="/donate/">Donate</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="https://www.paypal.com/us/fundraiser/charity/3817152" target="_blank" rel="noreferrer">
            PayPal Giving
          </a>
          <a href="https://thedonorsfund.org/donate/congregation-tiferes-yaakov/834411630" target="_blank" rel="noreferrer">
            Donors Fund
          </a>
          <a href="/#contact">Contact Us</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} Tiferes Yaakov. All rights reserved.</div>
        <div>EIN: 83-4411630</div>
      </div>
    </footer>
  );
}
