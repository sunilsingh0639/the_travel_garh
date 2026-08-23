import fs from 'fs'
import axios from 'axios'

const SITE_URL = 'https://www.thetravelgarh.com'
const API_BASE = 'https://travls.parkensolution.in/api'

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function generateSitemap() {
  const staticUrls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/about', priority: '0.6', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
    { loc: '/tour-packages', priority: '0.9', changefreq: 'weekly' },
    { loc: '/upcoming-trips', priority: '0.7', changefreq: 'weekly' },
    { loc: '/value-for-money', priority: '0.7', changefreq: 'weekly' },
    { loc: '/terms', priority: '0.3', changefreq: 'yearly' },
    { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
  ]

  let packageUrls = []
  let cityUrls = []

  try {
    const { data: xmlText } = await axios.get(`${API_BASE}/sitemap`, {
      headers: { Accept: '*/*' },
      responseType: 'text',
     })

    const urlBlocks = xmlText.match(/<url>[\s\S]*?<\/url>/g) || []

    packageUrls = urlBlocks.map(block => {
      const slugMatch = block.match(/<loc>([\s\S]*?)<\/loc>/)
      const lastmodMatch = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/)
      const slug = slugMatch ? slugMatch[1].trim() : null
      const lastmod = lastmodMatch ? lastmodMatch[1].trim() : null
      if (!slug) return null
      return {
        loc: `/trending/${slug}`,
        priority: '0.8',
        changefreq: 'weekly',
        lastmod,
      }
    }).filter(Boolean)

    console.log(`Fetched ${packageUrls.length} package URLs from backend sitemap feed`)
  } catch (e) {
    console.error('Failed to fetch backend sitemap feed:', e.message)
  }

  try {
    const { data } = await axios.get(`${API_BASE}/cities`)
    const domestic = data?.data?.domestic ?? []
    const international = data?.data?.international ?? []
    cityUrls = [
      ...domestic.map(c => ({ loc: `/domestic/${c.slug}`, priority: '0.7', changefreq: 'weekly' })),
      ...international.map(c => ({ loc: `/international/${c.slug}`, priority: '0.7', changefreq: 'weekly' })),
    ]
    console.log(`Fetched ${cityUrls.length} city URLs`)
  } catch (e) {
    console.error('Failed to fetch cities for sitemap:', e.message)
  }

  const allUrls = [...staticUrls, ...packageUrls, ...cityUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${escapeXml(SITE_URL + u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

  fs.writeFileSync('public/sitemap.xml', xml)
  console.log(`✅ Sitemap generated with ${allUrls.length} total URLs → public/sitemap.xml`)
}

generateSitemap()