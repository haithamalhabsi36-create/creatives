import Image from "next/image";
import success1 from "../../assets/Partners in Success/Success1.JPG";
import success2 from "../../assets/Partners in Success/Success2.JPG";
import success3 from "../../assets/Partners in Success/Success3.JPG";
import success4 from "../../assets/Partners in Success/Success4.JPG";
import success5 from "../../assets/Partners in Success/Success5.JPG";
import success6 from "../../assets/Partners in Success/Success6.jpg";
import success7 from "../../assets/Partners in Success/Success7.jpeg";

const successImages = [
  success1,
  success2,
  success3,
  success4,
  success5,
  success6,
  success7,
];

export default function Clients({ t }) {
  const altTexts = t.images || [];
  const items = successImages.map((src, index) => ({
    src,
    alt: altTexts[index] || `Partner ${index + 1}`,
  }));

  return (
    <section id="clients">
      <div className="clients-header reveal">
        <div className="section-tag">{t.tag}</div>
        <h2 className="section-title">
          {t.titleMain} <span>{t.titleHighlight}</span>
        </h2>
      </div>
      <div className="clients-track-wrapper">
        <div className="clients-track" id="clientsTrack">
          {[...items, ...items].map((item, index) => (
            <div className="client-logo" key={`${item.alt}-${index}`}>
              <Image
                src={item.src}
                alt={item.alt}
                className="client-image"
                quality={95}
                sizes="(max-width: 768px) 120px, 160px"
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
