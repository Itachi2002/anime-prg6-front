import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AnimeList() {
  const [animes, setAnimes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [episodeFilter, setEpisodeFilter] = useState('all')
  const itemsPerPage = 12

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch('http://145.24.222.250:8001/animes', {
          headers: {
            'Accept': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Received data:', data)
        
        if (data.items && Array.isArray(data.items)) {
          setAnimes(data.items)
        } else {
          setError('Onverwacht data formaat ontvangen')
          console.error('Unexpected data format:', data)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching animes:', error)
        setError(`Er is een fout opgetreden: ${error.message}`)
        setLoading(false)
      }
    }

    fetchAnimes()
  }, [])

  // Filter de animes op basis van de zoekterm
  const filteredAnimes = animes.filter(anime => {
    const matchesSearchTerm = anime.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filter op basis van afleveringen
    const episodes = anime.episodes
    let matchesEpisodeFilter = true

    if (episodeFilter === '0-100') {
      matchesEpisodeFilter = episodes >= 0 && episodes <= 100
    } else if (episodeFilter === '100-300') {
      matchesEpisodeFilter = episodes > 100 && episodes <= 300
    } else if (episodeFilter === '300+') {
      matchesEpisodeFilter = episodes > 300
    }

    return matchesSearchTerm && matchesEpisodeFilter
  })

  // Bereken pagination waardes
  const totalPages = Math.ceil(filteredAnimes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAnimes = filteredAnimes.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading animes...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Anime List</h1>
          <Link 
            to="/anime/new"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Anime Toevoegen
          </Link>
        </div>
        
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Zoek anime..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <select
            value={episodeFilter}
            onChange={(e) => setEpisodeFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">Alle afleveringen</option>
            <option value="0-100">0 - 100 afleveringen</option>
            <option value="100-300">100 - 300 afleveringen</option>
            <option value="300+">300+ afleveringen</option>
          </select>
        </div>
        
        {filteredAnimes.length === 0 ? (
          <p className="text-center text-gray-600">Geen animes gevonden</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentAnimes.map(anime => (
                <div 
                  key={anime.id} 
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">{anime.title}</h2>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Episodes:</span> {anime.episodes}
                  </p>
                  <div className="flex justify-end">
                    <Link 
                      to={`/anime/${anime.id}`}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Meer details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Vorige
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Volgende
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AnimeList