export default function Footer({ t }) {
  return (
    <footer>
      <div className="footer-copy">{t.copy}</div>
      <div className="footer-social">
        <a href="#" className="social-btn" aria-label={t.social.facebook}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M14.5 8.5V6.8c0-.7.5-1 1-1h1.6V3.3H15c-2.2 0-3.5 1.3-3.5 3.6v1.6H9.5V11h2v8.7h3V11h2.4l.4-2.5h-2.8z" />
          </svg>
        </a>
        <a href="#" className="social-btn" aria-label={t.social.linkedin}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6.8 9H4.3v10.7h2.5V9zM5.5 7.9c.8 0 1.4-.6 1.4-1.4S6.3 5.1 5.5 5.1 4 5.7 4 6.5s.6 1.4 1.5 1.4zM20 13.1c0-2.6-1.4-3.8-3.2-3.8-1.5 0-2.2.8-2.6 1.4V9h-2.4v10.7h2.4v-6c0-1.6.3-3.1 2.2-3.1 1.9 0 2 1.8 2 3.2v5.9H20v-6.6z" />
          </svg>
        </a>
        <a href="#" className="social-btn" aria-label={t.social.instagram}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M7.5 3.8h9c2.1 0 3.7 1.6 3.7 3.7v9c0 2.1-1.6 3.7-3.7 3.7h-9c-2.1 0-3.7-1.6-3.7-3.7v-9c0-2.1 1.6-3.7 3.7-3.7zm0 1.8c-1.1 0-1.9.8-1.9 1.9v9c0 1.1.8 1.9 1.9 1.9h9c1.1 0 1.9-.8 1.9-1.9v-9c0-1.1-.8-1.9-1.9-1.9h-9zm10.1 1.7c.4 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.4-.8.8-.8zM12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6zm0 1.8a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1z" />
          </svg>
        </a>
        <a href="#" className="social-btn" aria-label={t.social.twitter}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M19.9 7.2c.9-.5 1.4-1 1.4-1-.5.2-1.3.5-2.1.6-.6-.6-1.4-1-2.4-1-1.9 0-3.3 1.6-3.3 3.5 0 .3 0 .6.1.8-2.8-.1-5.3-1.5-7-3.6-.3.6-.5 1.2-.5 2 0 1.2.6 2.3 1.6 2.9-.6 0-1.1-.2-1.6-.4v.1c0 1.7 1.2 3.1 2.7 3.4-.3.1-.7.1-1 .1-.2 0-.4 0-.6-.1.4 1.4 1.8 2.3 3.3 2.3-1.2 1-2.7 1.5-4.4 1.5-.3 0-.6 0-.8-.1 1.6 1.1 3.5 1.7 5.5 1.7 6.6 0 10.2-5.6 10.2-10.5v-.5z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
