export default function Why({ t }) {
  return (
    <section id="why">
      <div className="section-tag reveal">{t.tag}</div>
      <h2 className="section-title reveal">
        {t.titleMain} <span>{t.titleHighlight}</span>
      </h2>
      <div className="why-grid">
        {t.items.map((item) => (
          <div className="why-card reveal" key={item.title}>
            <div className="why-icon">{item.icon}</div>
            <div className="why-title">{item.title}</div>
            <p className="why-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
