export default function MobileMenu({
  t,
  lang,
  theme,
  basePath = "",
  open,
  onClose,
  onToggleTheme,
  onToggleLang,
}) {
  const themeLabel = theme === "dark" ? t.actions.light : t.actions.dark;
  const langLabel = lang === "ar" ? "EN" : "ع";

  return (
    <div className={`mobile-menu ${open ? "open" : ""}`} id="mobileMenu">
      <a href={`${basePath}#about`} onClick={onClose}>
        {t.nav.about}
      </a>
      <a href={`${basePath}#services`} onClick={onClose}>
        {t.nav.services}
      </a>
      <a href={`${basePath}#products`} onClick={onClose}>
        {t.nav.products}
      </a>
      <a href={`${basePath}#vision`} onClick={onClose}>
        {t.nav.vision}
      </a>
      <a href={`${basePath}#goals`} onClick={onClose}>
        {t.nav.goals}
      </a>
      <a href={`${basePath}#clients`} onClick={onClose}>
        {t.nav.clients}
      </a>
      <a href={`${basePath}#contact`} onClick={onClose}>
        {t.nav.contact}
      </a>
      <div className="mobile-actions">
        <button
          className="toggle-btn"
          type="button"
          onClick={() => {
            onToggleTheme();
          }}
          aria-label={themeLabel}
          title={themeLabel}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button
          className="toggle-btn lang-btn"
          type="button"
          onClick={() => {
            onToggleLang();
          }}
          aria-label={t.actions.language}
          title={t.actions.language}
        >
          {langLabel}
        </button>
      </div>
    </div>
  );
}
