import { Link, useSearchParams } from 'react-router-dom'
import Backdrop from '../components/Backdrop'
import ThemeToggle from '../components/ThemeToggle'
import Blog from '../components/Blog'

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const inReader = searchParams.has('post')

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Backdrop />
      <div className="relative max-w-[1080px] mx-auto px-8">
        {/* Nav */}
        <nav className="sticky top-0 z-30 flex items-center justify-between py-6 bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-[14px] border-b border-line">
          <Link
            to="/"
            className="flex items-center gap-[9px] font-mono text-sm font-semibold text-ink"
            aria-label="Go to homepage"
          >
            <span className="text-accent-br">›</span>carlos_villena
            <span className="text-muted">/blog</span>
          </Link>
          <div className="flex items-center gap-[18px]">
            {inReader ? (
              <button
                onClick={() => setSearchParams({})}
                className="cursor-pointer bg-transparent border-none font-mono text-xs font-medium tracking-[0.04em] text-muted hover:text-accent-br transition-colors"
                aria-label="Back to all posts"
              >
                ← ALL POSTS
              </button>
            ) : (
              <Link
                to="/"
                className="font-mono text-xs font-medium tracking-[0.04em] text-muted hover:text-accent-br transition-colors"
                aria-label="Go back to portfolio"
              >
                ← PORTFOLIO
              </Link>
            )}
            <ThemeToggle />
          </div>
        </nav>

        <main>
          <Blog />
        </main>
      </div>
    </div>
  )
}

export default BlogPage
