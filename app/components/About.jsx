import { Fragment } from "react";

export default function About({ t }) {
  return (
    <section id="about">
      <div className="about-visual reveal">
        <div className="about-card-3d" id="aboutCard3d">
          <div className="about-card-inner">
            {t.stats.map((stat, index) => (
              <Fragment key={stat.label}>
                <div className="about-stat">
                  <div className="about-stat-num">{stat.value}</div>
                  <div className="about-stat-label">{stat.label}</div>
                </div>
                {index < t.stats.length - 1 && <div className="about-divider" />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="about-text reveal">
        <div className="section-tag">{t.tag}</div>
        <h2 className="section-title">
          {t.titleMain} <span>{t.titleHighlight}</span> {t.titleRest}
        </h2>
        <p className="section-desc">{t.desc}</p>
        <div className="about-features">
          {t.features.map((feature) => (
            <div className="feature-item" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
