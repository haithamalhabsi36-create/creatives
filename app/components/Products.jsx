"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { products } from "../products/products";

export default function Products({ t, lang }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    const onKey = (event) => {
      if (event.key === "Escape") setSelectedIndex(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [selectedIndex]);

  const selectedProduct = useMemo(
    () => (selectedIndex === null ? null : products[selectedIndex]),
    [selectedIndex]
  );
  const selectedDetails = selectedProduct?.details?.[lang] || {};

  return (
    <section id="products">
      <div className="products-blob" aria-hidden="true">
        <svg viewBox="0 0 480 480" role="presentation">
          <defs>
            <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7ac043" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1a5c2e" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <path
            d="M426.5,320.5Q390,391,315,418Q240,445,165,420Q90,395,58,322Q26,249,60,179Q94,109,167,78Q240,47,312,76Q384,105,424,177Q464,249,426.5,320.5Z"
            fill="url(#blobGradient)"
          />
        </svg>
      </div>
      <div className="products-header">
        <div>
          <div className="section-tag reveal">{t.tag}</div>
          <h2 className="section-title reveal">
            {t.titleMain} <span>{t.titleHighlight}</span>
          </h2>
        </div>
        <p className="section-desc reveal" style={{ maxWidth: "350px" }}>
          {t.desc}
        </p>
      </div>
      <div className="products-grid">
        {products.map((product, index) => (
          <motion.button
            key={product.slug}
            type="button"
            className="product-card"
            layoutId={`product-card-${product.slug}`}
            onClick={() => setSelectedIndex(index)}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <motion.div
              className="product-image-frame"
              layoutId={`product-image-${product.slug}`}
            >
              <Image
                src={product.image}
                alt={product.name[lang]}
                className="product-image"
                fill
                sizes="(max-width: 768px) 90vw, 320px"
                quality={95}
              />
            </motion.div>
            <motion.div
              className="product-name"
              layoutId={`product-title-${product.slug}`}
            >
              {product.name[lang]}
            </motion.div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              className="product-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            />
            <motion.div
              className="product-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="product-modal-card"
                layoutId={`product-card-${selectedProduct.slug}`}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <button
                  type="button"
                  className="product-modal-close"
                  onClick={() => setSelectedIndex(null)}
                  aria-label={lang === "ar" ? "إغلاق" : "Close"}
                >
                  ✕
                </button>
                <motion.div
                  className="product-modal-image"
                  layoutId={`product-image-${selectedProduct.slug}`}
                >
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name[lang]}
                    className="product-image"
                    fill
                    sizes="(max-width: 768px) 90vw, 520px"
                    priority
                  />
                </motion.div>
                <div className="product-modal-content">
                  <motion.h3
                    className="product-modal-title"
                    layoutId={`product-title-${selectedProduct.slug}`}
                  >
                    {selectedProduct.name[lang]}
                  </motion.h3>

                  {selectedProduct.summary?.[lang] && (
                    <p className="product-summary">
                      {selectedProduct.summary[lang]}
                    </p>
                  )}
                  {selectedDetails.usage && (
                    <p className="product-usage">{selectedDetails.usage}</p>
                  )}
                  {selectedDetails.sizes && (
                    <div className="product-chips">
                      {selectedDetails.sizes.map((size) => (
                        <span key={size} className="product-chip">
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                  {selectedDetails.description && (
                    <p className="product-desc">{selectedDetails.description}</p>
                  )}
                  {selectedDetails.description2 && (
                    <p className="product-desc">{selectedDetails.description2}</p>
                  )}
                  {selectedDetails.features && (
                    <div className="product-card-section">
                      <h4>{selectedDetails.featuresTitle}</h4>
                      <ul className="product-list">
                        {selectedDetails.features.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedDetails.uses && (
                    <div className="product-card-section">
                      <h4>{selectedDetails.usesTitle}</h4>
                      <ul className="product-list">
                        {selectedDetails.uses.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedDetails.how && (
                    <div className="product-card-section">
                      <h4>{selectedDetails.howTitle}</h4>
                      <ol className="product-steps">
                        {selectedDetails.how.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <button
                    type="button"
                    className="product-cta"
                    onClick={() => setSelectedIndex(null)}
                  >
                    {lang === "ar" ? "إغلاق التفاصيل" : "Close details"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
