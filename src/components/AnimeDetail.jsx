import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import Modal from './Modal'
import AnimeForm from './AnimeForm'

function AnimeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(location.hash === '#edit')

  const fetchAnimeDetail = async () => {
    try {
      const response = await fetch(`/animes/${id}`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setAnime(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching anime details:', error)
      setError(`Er is een fout opgetreden: ${error.message}`)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnimeDetail()
  }, [id])

  useEffect(() => {
    setIsEditModalOpen(location.hash === '#edit')
  }, [location.hash])

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    navigate(`/anime/${id}`, { replace: true })
  }

  const handleEditClick = () => {
    navigate(`/anime/${id}#edit`)
  }

  const handleDelete = async () => {
    if (window.confirm('Weet je zeker dat je deze anime wilt verwijderen?')) {
      try {
        const response = await fetch(`/animes/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Verwijderen mislukt')
        }
        
        navigate('/animes')
      } catch (error) {
        alert('Error: ' + error.message)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading anime details...</div>
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

  if (!anime) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Anime niet gevonden</div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-full bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{anime.title}</h1>
                <div className="flex space-x-4">
                  <button 
                    onClick={handleEditClick}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Bewerken
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    Verwijderen
                  </button>
                  <Link 
                    to="/animes" 
                    className="text-gray-500 hover:text-gray-600 transition-colors"
                  >
                    Terug
                  </Link>
                </div>
              </div>
              
              {anime.image && (
                <img 
                  src={anime.image} 
                  alt={anime.title} 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Beschrijving</h2>
                  <p className="text-gray-600">{anime.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Episodes</h2>
                    <p className="text-gray-600">{anime.episodes}</p>
                  </div>
                  
                  {anime.genre && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">Genre</h2>
                      <p className="text-gray-600">{anime.genre}</p>
                    </div>
                  )}
                  
                  {anime.rating && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">Rating</h2>
                      <p className="text-gray-600">{anime.rating}</p>
                    </div>
                  )}
                  
                  {anime.studio && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">Studio</h2>
                      <p className="text-gray-600">{anime.studio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Anime Bewerken</h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <AnimeForm 
            id={id} 
            onSuccess={() => {
              handleCloseModal()
              fetchAnimeDetail()
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export default AnimeDetail 