import { useEffect, useState } from 'react'
import type { ReviewModel } from '../../types'
import { getHomeReviews } from '../../api/review'
import { getImageUrl } from '../../api/client'
import './ReviewSection.css'

export default function ReviewSection() {
  const [reviews, setReviews] = useState<ReviewModel[]>([])
  const [loading, setLoading] = useState(true)
  const [popupReview, setPopupReview] = useState<ReviewModel | null>(null)

  useEffect(() => {
    getHomeReviews()
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function renderStars(rating: number, size: number = 18) {
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className="review-star" style={{ fontSize: size }}>★</span>
    ))
  }

  if (!loading && !reviews.length) return null

  return (
    <section className="review-section">
      <div className="review-header">
        <h2 className="review-title">Reviews</h2>
      </div>

      {loading ? (
        <div className="review-scroll">
          {[1, 2, 3].map(i => (
            <div key={i} className="review-card skeleton" style={{ height: 380 }} />
          ))}
        </div>
      ) : (
        <div className="review-scroll">
          {reviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              renderStars={renderStars}
              onReadMore={() => setPopupReview(review)}
            />
          ))}
        </div>
      )}

      {popupReview && (
        <div className="review-popup-overlay" onClick={() => setPopupReview(null)}>
          <div className="review-popup" onClick={e => e.stopPropagation()}>
            <div className="review-popup-header">
              <div className="review-popup-avatar">
                {popupReview.imagePath
                  ? <img src={getImageUrl(popupReview.imagePath)} alt={popupReview.name} loading="lazy" />
                  : <span>{popupReview.name[0]?.toUpperCase() || '?'}</span>
                }
              </div>
              <div className="review-popup-info">
                <h4>{popupReview.name}</h4>
                <span className="review-popup-trip">{popupReview.trip}</span>
              </div>
              <button className="review-popup-close" onClick={() => setPopupReview(null)}>✕</button>
            </div>
            <div className="review-popup-stars">
              {renderStars(popupReview.rating, 20)}
            </div>
            <div className="review-popup-body">
              <p>{popupReview.review}</p>
            </div>
            {popupReview.images.length > 0 && (
              <div className="review-popup-gallery">
                {popupReview.images.slice(0, 5).map((img, i) => (
                  <img key={i} src={getImageUrl(img)} alt="" className="review-popup-gallery-img" loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function ReviewCard({
  review,
  renderStars,
  onReadMore,
}: {
  review: ReviewModel
  renderStars: (rating: number, size?: number) => React.ReactNode[]
  onReadMore: () => void
}) {
  const imgSrc = review.images[0] ? getImageUrl(review.images[0]) : null
  const avatarSrc = review.imagePath ? getImageUrl(review.imagePath) : null

  return (
    <div className="review-card">
      <div className="review-card-image-wrap">
        {imgSrc ? (
          <img src={imgSrc} alt="" className="review-card-image" loading="lazy"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <div className="review-card-image-placeholder">
            <span className="material-icons" style={{ fontSize: 46, color: 'rgba(255,122,0,0.5)' }}>image</span>
          </div>
        )}
      </div>

      <div className="review-card-body">
        <div className="review-stars">{renderStars(review.rating)}</div>

        <p className="review-text">{review.review}</p>

        <span className="review-read-more" onClick={onReadMore}>Read more...</span>

        <div className="review-author">
          <div className="review-avatar-wrap">
            {avatarSrc ? (
              <img src={avatarSrc} alt={review.name} className="review-avatar" loading="lazy" />
            ) : (
              <div className="review-avatar-placeholder">
                {review.name[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>
          <div className="review-author-info">
            <div className="review-author-name">{review.name}</div>
            <div className="review-author-trip">{review.trip}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
