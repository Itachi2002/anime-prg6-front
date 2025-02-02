import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AnimeList from './components/AnimeList'
import AnimeDetail from './components/AnimeDetail'
import About from './components/About'
import AnimeForm from './components/AnimeForm'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animes" element={<AnimeList />} />
            <Route path="/anime/new" element={<AnimeForm />} />
            <Route path="/anime/edit/:id" element={<AnimeForm />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
