export default function Services({ t }) {
  if (!t) return null;
  return (
    <section id="services">
      <div className="services-header">
        <div>
          <div className="section-tag reveal">{t.tag}</div>
          <h2 className="section-title reveal">
            {t.titleMain} <span>{t.titleHighlight}</span>
          </h2>
        </div>
        <p className="section-desc reveal" style={{ maxWidth: "360px" }}>
          {t.desc}
        </p>
      </div>
      <div className="services-grid">
        {t.items.map((item) => (
          <div className="service-card reveal" key={item.title}>
            <div className="service-num">{item.num}</div>
            <div className="service-icon">{item.icon}</div>
            <div className="service-title">{item.title}</div>
            <p className="service-desc">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
