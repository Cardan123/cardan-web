import Backdrop from '../components/Backdrop'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import About from '../components/About'
import Projects from '../components/Projects'
import Writing from '../components/Writing'
import Contact from '../components/Contact'

const Portfolio = () => (
  <div className="relative min-h-screen overflow-x-clip">
    <Backdrop />
    <div className="relative max-w-[1080px] mx-auto px-7">
      <Nav />
      <main>
        <Hero />
        <Skills />
        <About />
        <Projects />
        <Writing />
        <Contact />
      </main>
    </div>
  </div>
)

export default Portfolio
