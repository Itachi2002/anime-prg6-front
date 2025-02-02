function About() {
  return (
    <div className="min-h-full bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">About Us</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              The Anime Database is a comprehensive platform designed to help anime enthusiasts 
              discover and track their favorite series. Our database includes detailed information 
              about various anime titles, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Series descriptions</li>
              <li>Episode counts</li>
              <li>Ratings and reviews</li>
              <li>Release information</li>
            </ul>
            <p className="text-gray-600">
              Whether you're a seasoned anime fan or just getting started, our platform 
              provides all the information you need to explore the world of anime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 