import { useState, useEffect } from 'react'

function App() {
  const [animes, setAnimes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        
        // Check of we een object krijgen met een items property
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Anime List</h1>
      {animes.length === 0 ? (
        <p className="text-center text-gray-600">Geen animes gevonden</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animes.map(anime => (
            <div 
              key={anime.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{anime.title}</h2>
              {anime.description && (
                <p className="text-gray-600 mb-3">{anime.description}</p>
              )}
              {anime.episodes && (
                <p className="text-gray-600">
                  <span className="font-medium">Episodes:</span> {anime.episodes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
