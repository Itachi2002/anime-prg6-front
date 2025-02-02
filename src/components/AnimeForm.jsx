import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

/**
 * AnimeForm component voor het aanmaken en bewerken van anime-items
 */
function AnimeForm({ id, onSuccess }) {
  const { id: urlId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    episodes: ''
  })
  const [loading, setLoading] = useState(id ? true : false)

  useEffect(() => {
    if (id) {
      const fetchAnime = async () => {
        try {
          const response = await fetch(`/animes/${id}`, {
            headers: {
              'Accept': 'application/json'
            }
          })
          
          if (!response.ok) throw new Error('Laden mislukt')
          
          const data = await response.json()
          setFormData({
            title: data.title,
            description: data.description,
            episodes: data.episodes
          })
          setLoading(false)
        } catch (error) {
          alert('Error: ' + error.message)
          navigate('/animes')
        }
      }

      fetchAnime()
    }
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(id ? `/animes/${id}` : '/animes', {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `${id ? 'Bewerken' : 'Aanmaken'} mislukt`)
      }
      
      if (onSuccess) {
        onSuccess()
      } else {
        navigate('/animes')
      }
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">
            {id ? 'Anime Bewerken' : 'Nieuwe Anime Toevoegen'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titel *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 text-gray-900 
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Beschrijving *</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 text-gray-900
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Afleveringen *</label>
              <input
                type="number"
                name="episodes"
                required
                value={formData.episodes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 text-gray-900
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/animes')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Annuleren
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {id ? 'Opslaan' : 'Toevoegen'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AnimeForm 