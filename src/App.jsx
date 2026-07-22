import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Portfolio from './pages/Portfolio'
import BlogPage from './pages/BlogPage'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
