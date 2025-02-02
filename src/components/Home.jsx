function Home() {
  return (
    <div className="min-h-full bg-gray-100">
      <div className="relative h-[500px] mb-8">
        <div className="absolute inset-0">
          <img 
            src="/src/assets/hero-image.jpg" 
            alt="Attack on Titan scene" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h1 className="text-5xl font-bold mb-6">
                Welcome to Anime List
              </h1>
              <p className="text-xl mb-8">
                Discover and explore your favorite anime series. Our database provides comprehensive 
                information about various anime titles, including ratings, episodes, and descriptions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            Browse through our collection and find your next favorite anime series!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home 