export default function Vision({ t }) {
  return (
    <section id="vision">
      <div className="vision-grid">
        {t.cards.map((card) => (
          <div className="vision-card reveal" key={card.title}>
            <div className="vision-icon">{card.icon}</div>
            <div className="vision-label">{card.label}</div>
            <h3 className="vision-title">{card.title}</h3>
            <p className="vision-text">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
