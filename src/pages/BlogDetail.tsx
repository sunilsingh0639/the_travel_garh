import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getBlogBySlug } from '../api/blog'
import { getImageUrl } from '../api/client'
import './TrendingDetail.css'

export default function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getBlogBySlug(slug)
      .then(setBlog)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="skeleton" style={{ height: 36, width: '70%', marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 400, borderRadius: 12, marginBottom: 24 }} />
        </div>
      </section>
    )
  }

  if (!blog) {
    return (
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <h1>Blog not found</h1>
        </div>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} -The TravelGarh Blog</title>
      </Helmet>
      <article className="section" style={{ paddingTop: 20 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 className="detail-title" style={{ marginBottom: 16 }}>{blog.title}</h1>
          {blog.thumbnail && (
            <img
              src={getImageUrl(blog.thumbnail)}
              alt={blog.title}
              loading="lazy"
              style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }}
            />
          )}
          <div
            className="detail-description"
            dangerouslySetInnerHTML={{ __html: blog.content || blog.description || '' }}
          />
        </div>
      </article>
    </>
  )
}
