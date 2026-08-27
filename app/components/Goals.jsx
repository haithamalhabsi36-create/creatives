export default function Goals({ t }) {
  return (
    <section id="goals">
      <div className="section-tag reveal">{t.tag}</div>
      <h2 className="section-title reveal">
        {t.titleMain} <span>{t.titleHighlight}</span>
      </h2>
      <div className="goals-list">
        {t.items.map((item) => (
          <div className="goal-item" key={item}>
            <div className="goal-bullet" />
            <p className="goal-text">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
