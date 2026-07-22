import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BlogPost from './BlogPost'
import { loadPosts, getCategories } from '../utils/loadPosts'
import { formatDate } from '../utils/formatDate'

const riseTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] }

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const progressRef = useRef(null)

  const posts = useMemo(
    () => loadPosts().map((post, index) => ({ ...post, num: String(index + 1).padStart(2, '0') })),
    []
  )
  const categories = useMemo(() => getCategories(), [])
  const totalLabel = `${String(posts.length).padStart(2, '0')} ENTRIES`

  // Reader state lives in the URL (?post=slug) so posts are linkable
  const openSlug = searchParams.get('post')
  const activeIndex = posts.findIndex((post) => post.slug === openSlug)
  const activePost = activeIndex >= 0 ? posts[activeIndex] : null
  const nextPost = activePost ? posts[(activeIndex + 1) % posts.length] : null

  const openPost = (slug) => setSearchParams({ post: slug })
  const closePost = () => setSearchParams({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [openSlug])

  // Reading progress — writes width directly to avoid re-renders on scroll
  useEffect(() => {
    const onScroll = () => {
      const bar = progressRef.current
      if (!bar) return
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0
      bar.style.width = activePost ? `${pct}%` : '0%'
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [activePost])

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (!post || !post.title) return false
      const okCategory = category === 'All' || post.category === category
      const okQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
        (Array.isArray(post.tags) && post.tags.some((tag) => tag.toLowerCase().includes(q)))
      return okCategory && okQuery
    })
  }, [posts, query, category])

  const featured = filteredPosts.find((post) => post.featured) || null
  const listPosts = featured
    ? filteredPosts.filter((post) => post.slug !== featured.slug)
    : filteredPosts

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
  }

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div ref={progressRef} className="h-full w-0 bg-accent-br transition-[width] duration-100 ease-linear" />
      </div>

      {activePost ? (
        <BlogPost
          post={activePost}
          totalLabel={totalLabel}
          nextPost={nextPost}
          onOpen={openPost}
          onClose={closePost}
        />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Masthead */}
          <header className="pt-20 pb-10 flex justify-between items-end gap-[30px] flex-wrap">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={riseTransition}
                className="font-mono text-[11px] font-medium tracking-[0.16em] text-accent-br mb-[22px]"
              >
                {'// FIELD NOTES — '}
                {totalLabel}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...riseTransition, delay: 0.08 }}
                className="m-0 font-semibold text-[clamp(46px,8vw,96px)] leading-[0.92] tracking-[-0.045em] text-ink"
              >
                The Log
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...riseTransition, delay: 0.16 }}
              className="m-0 max-w-[340px] text-[15px] leading-[1.6] text-muted"
            >
              Notes, tutorials and lessons learned building production-grade AI systems, cloud
              platforms and developer tooling.
            </motion.p>
          </header>

          {/* Controls */}
          <div className="flex items-center justify-between gap-[18px] flex-wrap py-[18px] border-t border-line-str">
            <div className="flex flex-wrap gap-5">
              {categories.map((cat) => {
                const active = cat === category
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`cursor-pointer bg-transparent border-0 border-b-2 border-solid p-0 pb-[5px] font-mono text-xs font-medium tracking-[0.04em] transition-colors ${
                      active ? 'text-accent-br border-accent' : 'text-muted border-transparent hover:text-accent-br'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
            <div className="relative min-w-[220px]">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[13px] font-medium text-muted">
                /
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search..."
                aria-label="Search blog posts"
                className="w-full bg-transparent border-0 border-b border-solid border-line pl-[18px] pr-1 py-2 text-ink font-mono text-[13px] font-medium transition-colors focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Featured post */}
          {featured && (
            <Link to={`/blog?post=${featured.slug}`} className="block text-inherit no-underline">
              <article className="pf-feat cursor-pointer mt-[34px] mb-5 border border-line-str rounded-[22px] bg-gradient-to-br from-surf to-bg overflow-hidden relative">
                <div
                  aria-hidden="true"
                  className="absolute -top-[60px] -right-10 w-60 h-60 rounded-full blur-[40px] pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%)',
                  }}
                />
                <div className="relative px-[42px] pt-10 pb-[38px] max-sm:px-6">
                  <div className="flex items-center gap-3 mb-[26px]">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-on-accent bg-accent px-[11px] py-[5px] rounded-full">
                      ★ FEATURED
                    </span>
                    <span className="font-mono text-[11px] font-medium text-muted">
                      {featured.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-8 items-start max-sm:grid-cols-1 max-sm:gap-4">
                    <div className="font-mono font-semibold text-[clamp(48px,9vw,110px)] leading-[0.85] tracking-[-0.04em] text-accent-br opacity-90">
                      {featured.num}
                    </div>
                    <div>
                      <h2 className="m-0 font-semibold text-[clamp(28px,4.2vw,46px)] leading-[1.04] tracking-[-0.03em] text-ink">
                        {featured.title}
                      </h2>
                      <p className="mt-5 mb-[26px] max-w-[620px] text-base leading-[1.65] text-muted">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="inline-flex items-center gap-[9px] font-mono text-[13px] font-semibold text-accent-br">
                          read_article
                          <span className="pf-featarrow inline-block">↗</span>
                        </span>
                        <span className="font-mono text-xs font-medium text-muted">
                          {formatDate(featured.date)} · {featured.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Index list */}
          {listPosts.length > 0 && (
            <div className="mt-[30px]">
              <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted mb-1.5">
                {'// ALL ENTRIES'}
              </div>
              {listPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog?post=${post.slug}`}
                  className="pf-row text-inherit no-underline"
                >
                  <div className="font-mono text-[15px] font-semibold tracking-[0.02em] text-accent-br">
                    {post.num}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="font-mono text-[10px] font-medium tracking-[0.06em] text-muted border border-line px-[9px] py-[3px] rounded-full">
                        {post.category}
                      </span>
                      <span className="font-mono text-[11px] font-medium text-muted">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h3 className="pf-rowtitle m-0 mb-2 font-semibold text-[clamp(20px,2.6vw,28px)] leading-[1.15] tracking-[-0.02em] text-ink transition-colors">
                      {post.title}
                    </h3>
                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="font-mono text-[11px] font-medium text-muted">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-3.5">
                    <span className="font-mono text-[11px] font-medium text-muted whitespace-nowrap">
                      {post.readTime}
                    </span>
                    <span className="pf-arrow w-11 h-11 rounded-full border border-line-str flex items-center justify-center text-lg text-ink">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <div className="text-center pt-[70px] pb-[90px]">
              <p className="m-0 mb-4 text-base text-muted">No entries match your search.</p>
              <button
                onClick={clearFilters}
                className="cursor-pointer font-mono text-xs font-semibold text-accent-br bg-transparent border border-line-str px-[18px] py-2.5 rounded-lg"
              >
                clear_filters()
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-[50px] pt-[70px] pb-[50px] border-t border-line flex justify-between flex-wrap gap-2.5">
            <span className="font-mono text-[11px] font-medium text-muted">
              © 2026 CARLOS_VILLENA
            </span>
            <span className="font-mono text-[11px] font-medium text-muted">Ember Copper system</span>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Blog
