import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatDate } from '../utils/formatDate'

// Full-screen article reader (replaces the index in place — not a modal)
const BlogPost = ({ post, totalLabel, nextPost, onOpen, onClose }) => {
  if (!post) return null

  const hasNext = nextPost && nextPost.slug !== post.slug

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-[720px] mx-auto pt-14 pb-10"
    >
      {/* Entry number */}
      <div className="font-mono text-[15px] font-semibold text-accent-br mb-6">
        {post.num} / {totalLabel}
      </div>

      {/* Pills */}
      <div className="flex items-center gap-3 mb-[22px]">
        {post.category && (
          <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-accent-br bg-chip border border-line-str px-3 py-[5px] rounded-full">
            {post.category}
          </span>
        )}
        {post.featured && (
          <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-accent-br border border-line-str px-3 py-[5px] rounded-full">
            ★ FEATURED
          </span>
        )}
      </div>

      {/* Title + excerpt */}
      <h1 className="m-0 font-semibold text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.03em] text-ink">
        {post.title}
      </h1>
      {post.excerpt && (
        <p className="mt-6 mb-[26px] text-[19px] leading-[1.6] text-muted">{post.excerpt}</p>
      )}

      {/* Byline */}
      <div className="flex items-center gap-3 font-mono text-xs font-medium text-muted pb-[34px] border-b border-line-str">
        <span className="w-[30px] h-[30px] rounded-full bg-accent text-on-accent flex items-center justify-center font-semibold text-xs">
          CV
        </span>
        {[post.author, formatDate(post.date), post.readTime].filter(Boolean).join(' · ')}
      </div>

      {/* Body */}
      <div className="reader-body pt-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // The title already renders in the header above — skip the markdown H1
            h1: () => null,
          }}
        >
          {post.content || ''}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      {Array.isArray(post.tags) && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-9 pt-6 border-t border-line-str">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs font-medium px-3 py-1.5 bg-chip border border-line rounded-[7px] text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Next entry */}
      {hasNext && (
        <button
          onClick={() => onOpen(nextPost.slug)}
          className="pf-feat cursor-pointer w-full text-left mt-10 border border-line-str rounded-2xl px-7 py-[26px] bg-surf flex items-center justify-between gap-5"
          aria-label={`Read next entry: ${nextPost.title}`}
        >
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.1em] text-muted mb-2">
              NEXT ENTRY {nextPost.num}
            </div>
            <div className="text-xl font-semibold tracking-[-0.01em] text-ink">
              {nextPost.title}
            </div>
          </div>
          <span className="pf-featarrow flex-none w-[46px] h-[46px] rounded-full border border-line-str flex items-center justify-center text-lg text-accent-br">
            →
          </span>
        </button>
      )}

      {/* Back to index */}
      <div className="text-center pt-11 pb-5">
        <button
          onClick={onClose}
          className="cursor-pointer font-mono text-xs font-semibold text-muted bg-transparent border border-line px-5 py-[11px] rounded-lg hover:text-accent-br transition-colors"
        >
          ← back_to_index()
        </button>
      </div>
    </motion.article>
  )
}

export default BlogPost
