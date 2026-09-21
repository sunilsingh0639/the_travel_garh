import { useState } from "react";
import { Link } from "react-router-dom";
import type { PackageModel } from "../../types";
import { getImageUrl } from "../../api/client";
import "./PackageCard.css";

interface Props {
  pkg: PackageModel;
  linkPath?: string;
}

export default function PackageCard({ pkg, linkPath }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const path = linkPath || `/trending/${pkg.slug}`;
  const images = pkg.images.length ? pkg.images : [""];

  function handleNav(dir: number, e: React.MouseEvent) {
    e.preventDefault();
    const next = (imgIndex + dir + images.length) % images.length;
    setImgIndex(next);
  }

  function handleWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const priceText = pkg.price > 0 ? `₹${pkg.price.toLocaleString()}` : 'Price on Request';
    const msg = `Hi TravelGarh, I'm interested in the *${pkg.name}* package priced at *${priceText}*. Please share complete details, itinerary, availability, and booking information.`;
    window.open(`https://wa.me/917425833258?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function handleRequestCall(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = 'tel:+917425833258';
  }

  return (
    <>
    <Link
      to={path}
      state={pkg}
      className={`package-card${hover ? " is-hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="package-card-img-wrap">
        {images[0] ? (
          <img
            src={getImageUrl(images[imgIndex] || images[0])}
            alt={pkg.name}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div
            className="package-card-placeholder"
            style={{ height: "100%", background: "#eee" }}
          />
        )}

        {pkg.tag && <span className="package-card-tag-badge">{pkg.tag}</span>}

        {hover && images.length > 1 && (
          <>
            <button
              className="package-card-nav-btn left"
              onClick={(e) => handleNav(-1, e)}
            >
              <span className="package-card-nav-icon">&#10094;</span>
            </button>
            <button
              className="package-card-nav-btn right"
              onClick={(e) => handleNav(1, e)}
            >
              <span className="package-card-nav-icon">&#10095;</span>
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="package-card-page-dots">
            {images.map((_, i) => (
              <div
                key={i}
                className={`package-card-page-dot ${i === imgIndex ? "active" : "inactive"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="package-card-body">
        <div className="package-card-duration">
          {pkg.days} Days {pkg.nights} Nights
        </div>
        <h3 className="package-card-name">{pkg.name}</h3>
        <p className="package-card-desc">{pkg.shortDescription}</p>

        <hr className="package-card-divider" />

        {(pkg.saving > 0 || pkg.easyEmi) && (
          <div className="package-card-save-row">
            {pkg.saving > 0 ? (
              <div className="package-card-save-badge">
                <span className="package-card-save-icon material-icons">
                  check_circle
                </span>
                <span className="package-card-save-text">
                  Save ₹{pkg.saving.toLocaleString()}
                </span>
              </div>
            ) : (
              <span />
            )}
            {pkg.easyEmi && (
              <span className="package-card-emi-badge">EMI Available</span>
            )}
          </div>
        )}

        <div className="package-card-price-row">
          <span className="package-card-price">
            {pkg.price > 0
              ? `₹ ${pkg.price.toLocaleString()}`
              : "Price on Request"}
          </span>

          {pkg.cutPrice > 0 && (
            <span className="package-card-cut-price">
              ₹ {pkg.cutPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="pkg-card-cta-row" onClick={e => e.preventDefault()}>
          <button className="pkg-card-cta-call" onClick={handleRequestCall}>
            <svg className="pkg-card-cta-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            Call Us
          </button>
          <button className="pkg-card-cta-wa" onClick={handleWhatsApp}>
            <svg className="pkg-card-cta-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </button>
        </div>
      </div>
    </Link>
    </>
  );
}
