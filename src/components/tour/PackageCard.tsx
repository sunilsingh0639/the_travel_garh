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

  return (
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
      </div>
    </Link>
  );
}
