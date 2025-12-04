import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
              <span className="text-2xl sm:text-3xl">🍰</span>
              <h1 className="text-xl sm:text-2xl font-bold text-amber-900">Recipe Haven</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-amber-900 hover:text-amber-700 transition">Home</Link>
              <Link to="/recipes" className="text-amber-900 hover:text-amber-700 transition">Recipes</Link>
              <Link to="/contact" className="text-amber-900 hover:text-amber-700 transition">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-4">About Recipe Haven</h1>
          <p className="text-lg text-amber-700">Sharing the joy of cooking, one recipe at a time</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Our Story</h2>
          <p className="text-amber-800 leading-relaxed mb-4">
            Recipe Haven was born from a simple idea: everyone has a recipe worth sharing. Whether it's your grandmother's 
            secret chocolate chip cookie recipe or your own creation of fusion cuisine, every dish tells a story.
          </p>
          <p className="text-amber-800 leading-relaxed mb-4">
            We created this platform to bring food lovers together, to celebrate the diversity of culinary traditions, 
            and to make cooking accessible and enjoyable for everyone. From beginners taking their first steps in the 
            kitchen to seasoned chefs experimenting with new flavors, Recipe Haven is your culinary companion.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Our Mission</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-3xl mr-4">🌟</span>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Inspire Creativity</h3>
                <p className="text-amber-800">Encourage home cooks to experiment, create, and share their culinary masterpieces.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-3xl mr-4">🤝</span>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Build Community</h3>
                <p className="text-amber-800">Connect people through their love of food and cooking.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-3xl mr-4">📚</span>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Preserve Traditions</h3>
                <p className="text-amber-800">Keep family recipes and cultural culinary heritage alive for future generations.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/add-recipe">
            <button className="bg-amber-800 text-white px-8 py-3 rounded-full hover:bg-amber-900 transition transform hover:scale-105 text-lg">
              Share Your Recipe
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-white mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-amber-200 text-sm sm:text-base">
            &copy; 2025 Recipe Haven. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;