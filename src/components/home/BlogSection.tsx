import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { BlogItem } from '../../types'
import { getBlogs } from '../../api/blog'
import { getImageUrl } from '../../api/client'
import './BlogSection.css'

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [loading, setLoading] = useState(true)
  const cardScrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getBlogs()
      .then(data => setBlogs(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const sliderImgs = blogs.map(b => getImageUrl(b.thumbnail))

  return (
    <section className="blog-section">
      <div className="blog-section-bg" />

      <div className="blog-section-inner">
        <div className="blog-slider-wrap">
          {loading ? (
            <div className="blog-slider skeleton" style={{ height: 420 }} />
          ) : sliderImgs.length > 0 ? (
            <AutoSlider images={sliderImgs} />
          ) : null}
        </div>

        <div className="blog-heading-wrap">
          <h2 className="blog-heading">Watch & Read</h2>
        </div>

        <div className="blog-cards-wrap">
          <div className="blog-cards-container">
            <div className="blog-scroll" ref={cardScrollRef}>
              {loading
                ? [1, 2, 3, 4].map(i => (
                    <div key={i} className="blog-card skeleton" style={{ height: 300 }} />
                  ))
                : blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} onClick={() => navigate(`/blog/${blog.slug}`)} />
                  ))}
            </div>

            {!loading && blogs.length > 1 && (
              <>
                <button className="blog-arrow-btn left" onClick={() => cardScrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} aria-label="Left">
                  <span className="blog-arrow-icon">&#10094;</span>
                </button>
                <button className="blog-arrow-btn right" onClick={() => cardScrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} aria-label="Right">
                  <span className="blog-arrow-icon">&#10095;</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


function AutoSlider({ images }: { images: string[] }) {
  const [page, setPage] = useState(0)
  const [prev, setPrev] = useState<string | null>(null)
  const imagesRef = useRef(images)

  imagesRef.current = images

  useEffect(() => {
    if (images.length < 2) return

    const timer = setInterval(() => {
      setPage(prev => (prev + 1) % imagesRef.current.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [images.length])

  useEffect(() => {
    setPrev(images[(page - 1 + images.length) % images.length])
  }, [page, images])

  const current = images[page % images.length]

  if (!current) return null

  return (
    <div
      className="blog-slider"
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {prev && (
        <img
          key={`prev-${page}`}
          src={prev}
          alt="" loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            animation: 'blogFadeOut 0.8s ease forwards',
          }}
          onError={e => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      )}

      <img
        key={`cur-${page}`}
        src={current}
        alt="" loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'blogFadeIn 0.8s ease',
        }}
        onError={e => {
          ;(e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}

// function AutoSlider({ images }: { images: string[] }) {
//   const [page, setPage] = useState(0)
//   const [prev, setPrev] = useState<string | null>(null)
//   const imagesRef = useRef(images)
//   imagesRef.current = images

//   useEffect(() => {
//     if (images.length < 2) return
//     const timer = setInterval(() => {
//       setPage(prev => (prev + 1) % imagesRef.current.length)
//     }, 3000)
//     return () => clearInterval(timer)
//   }, [images.length])

//   useEffect(() => {
//     setPrev(images[(page - 1 + images.length) % images.length])
//   }, [page, images])

//   const current = images[page % images.length]
//   if (!current) return null

//   return (
//     <div className="blog-slider" style={{ height: 420, position: 'relative', overflow: 'hidden' }}>
//       {prev && (
//         <img
//           key={`prev-${page}`}
//           src={prev}
//           alt=""
//           style={{
//             position: 'absolute', inset: 0, width: '100%', height: '100%',
//             objectFit: 'cover',
//             animation: 'blogFadeOut 0.8s ease forwards',
//           }}
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
//         />
//       )}
//       <img
//         key={`cur-${page}`}
//         src={current}
//         alt=""
//         style={{
//           width: '100%', height: '100%', objectFit: 'cover',
//           animation: 'blogFadeIn 0.8s ease',
//         }}
//         onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
//       />
//     </div>
//   )
// }

function BlogCard({ blog, onClick }: { blog: BlogItem; onClick: () => void }) {
  const imgSrc = getImageUrl(blog.thumbnail)
  const avatarSrc = getImageUrl(blog.byImage)

  return (
    <div className="blog-card" onClick={onClick}>
      <div className="blog-card-img-overlay">
        {imgSrc ? (
          <img src={imgSrc} alt={blog.title} className="blog-card-img" loading="lazy"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <div className="blog-card-img" style={{ background: '#eee' }} />
        )}
        <div className="blog-card-book-icon">
          <span className="material-icons" style={{ fontSize: 18 }}>menu_book</span>
        </div>
      </div>
      <div className="blog-card-body">
        <h3 className="blog-card-title">{blog.title}</h3>
        <div className="blog-card-footer">
          {avatarSrc && (
            <img src={avatarSrc} alt="" className="blog-card-avatar" loading="lazy"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          )}
          <span className="blog-card-author-name">by {blog.by}</span>
          <span className="blog-card-read-time">{blog.readTimeMinutes} min read</span>
        </div>
      </div>
    </div>
  )
}
