import "./globals.css";

export const metadata = {
  title: "الصناعة الإبداعية | Creative Industry",
  description:
    "الصناعة الإبداعية شركة عمانية متخصصة في خطوط الإنتاج والمنتجات البلاستيكية بأعلى معايير الجودة.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no,email=no,address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Montserrat:wght@300;400;600;800;900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
