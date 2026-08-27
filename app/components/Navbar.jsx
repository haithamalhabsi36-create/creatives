import Image from "next/image";
import logo from "../../assets/Logo.jpeg";

export default function Navbar({
  t,
  lang,
  theme,
  basePath = "",
  menuOpen,
  onToggleMenu,
  onToggleTheme,
  onToggleLang,
}) {
  const themeLabel = theme === "dark" ? t.actions.light : t.actions.dark;
  const langLabel = lang === "ar" ? "EN" : "ع";

  return (
    <nav id="navbar">
      <div className="nav-logo">
        <div className="nav-logo-icon">
          <Image
            src={logo}
            alt={`${t.brand?.name || "Creative Industry"} logo`}
            className="nav-logo-img"
            fill
            sizes="38px"
            priority
          />
        </div>
        <div className="nav-logo-text">{t.brand?.name}</div>
      </div>
      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <a href={`${basePath}#about`}>{t.nav.about}</a>
          </li>
          <li>
            <a href={`${basePath}#services`}>{t.nav.services}</a>
          </li>
          <li>
            <a href={`${basePath}#products`}>{t.nav.products}</a>
          </li>
          <li>
            <a href={`${basePath}#vision`}>{t.nav.vision}</a>
          </li>
          <li>
            <a href={`${basePath}#goals`}>{t.nav.goals}</a>
          </li>
          <li>
            <a href={`${basePath}#clients`}>{t.nav.clients}</a>
          </li>
          <li>
            <a href={`${basePath}#contact`}>{t.nav.contact}</a>
          </li>
        </ul>
        <div className="nav-actions">
          <button
            className="toggle-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            className="toggle-btn lang-btn"
            type="button"
            onClick={onToggleLang}
            aria-label={t.actions.language}
            title={t.actions.language}
          >
            {langLabel}
          </button>
        </div>
        <a href={`${basePath}#contact`} className="nav-cta">
          {t.nav.cta}
        </a>
        <button
          className="hamburger"
          id="hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobileMenu"
          onClick={onToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
