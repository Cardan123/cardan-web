import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { loadPosts } from '../utils/loadPosts'
import { formatDate } from '../utils/formatDate'

// Editorial teaser of the 3 latest blog posts ("The Log")
const Writing = () => {
  const posts = useMemo(() => loadPosts().slice(0, 3), [])

  if (posts.length === 0) return null

  return (
    <motion.section
      id="writing"
      className="py-20"
      aria-label="Writing section"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-end justify-between gap-5 flex-wrap mb-5">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent-br mb-3.5">
            {'// WRITING'}
          </div>
          <h2 className="m-0 font-semibold text-[clamp(30px,4vw,44px)] leading-[1.05] tracking-[-0.03em] text-ink">
            The Log
          </h2>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-br hover:text-ink transition-colors"
        >
          all_entries()<span>→</span>
        </Link>
      </div>

      <div>
        {posts.map((post, index) => (
          <Link key={post.slug} to={`/blog?post=${post.slug}`} className="pf-row pf-row--tight text-inherit no-underline">
            <div className="font-mono text-sm font-semibold text-accent-br">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-[7px]">
                <span className="font-mono text-[10px] font-medium tracking-[0.06em] text-muted border border-line px-[9px] py-[3px] rounded-full">
                  {post.category}
                </span>
                <span className="font-mono text-[11px] font-medium text-muted">
                  {formatDate(post.date)} · {post.readTime}
                </span>
              </div>
              <h3 className="pf-rowtitle m-0 font-semibold text-[clamp(18px,2.4vw,24px)] leading-[1.2] tracking-[-0.02em] text-ink transition-colors">
                {post.title}
              </h3>
            </div>
            <span className="pf-arrow w-[42px] h-[42px] rounded-full border border-line-str flex items-center justify-center text-[17px] text-ink">
              →
            </span>
          </Link>
        ))}
      </div>
    </motion.section>
  )
}

export default Writing
