import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">Anime List</div>
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link to="/animes" className="text-white hover:text-gray-300 transition-colors">
              Animes
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 