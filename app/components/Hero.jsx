export default function Hero({ t }) {
  return (
    <section id="hero">
      <canvas id="hero-canvas" />
      <div className="hero-content">
        <div className="hero-tag">{t.tag}</div>
        <h1 className="hero-title">
          {t.titleMain}
          <br />
          <span>{t.titleHighlight}</span>
        </h1>
        <p className="hero-subtitle">{t.subtitle}</p>
        <div className="hero-btns">
          <a href="#products" className="btn-primary">
            {t.primary}
          </a>
          <a href="#contact" className="btn-outline">
            {t.secondary}
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>{t.scroll}</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
