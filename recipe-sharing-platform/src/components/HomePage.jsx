import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipe data from data.json
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error loading recipes:', error));
  }, []);

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl">🍰</span>
              <h1 className="text-xl sm:text-2xl font-bold text-amber-900">Recipe Haven</h1>
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#" className="text-amber-900 hover:text-amber-700 transition">Home</a>
              <a href="#" className="text-amber-900 hover:text-amber-700 transition">Recipes</a>
              <a href="#" className="text-amber-900 hover:text-amber-700 transition">About</a>
              <a href="#" className="text-amber-900 hover:text-amber-700 transition">Contact</a>
            </div>
            <button className="bg-amber-800 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-amber-900 transition text-sm sm:text-base">
              Share
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-100 to-orange-100 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 mb-3 sm:mb-4 leading-tight">
              Freshly Made Recipes,
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 mb-4 sm:mb-6 leading-tight">
              Just for You!
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-amber-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Discover delicious recipes from our community. Share your culinary creations and inspire others.
            </p>
            <button className="bg-amber-800 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg hover:bg-amber-900 transition transform hover:scale-105 active:scale-95">
              Explore Recipes
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-3 sm:mb-4">Our Recipe Collection</h2>
          <p className="text-base sm:text-lg text-amber-700 px-4">Handpicked recipes that will delight your taste buds</p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Recipe Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-amber-200">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition duration-300 hover:scale-110"
                />
              </div>

              {/* Recipe Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-sm sm:text-base text-amber-700 mb-4 line-clamp-3">
                  {recipe.summary}
                </p>

                {/* Recipe Meta */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-amber-600 mb-4">
                  <span className="flex items-center">
                    <span className="mr-1">⏱️</span>
                    <span className="hidden xs:inline">{recipe.prepTime || '30 min'}</span>
                    <span className="xs:hidden">30m</span>
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">👥</span>
                    <span className="hidden xs:inline">{recipe.servings || '4 servings'}</span>
                    <span className="xs:hidden">4</span>
                  </span>
                </div>

                {/* View Recipe Button */}
                <Link to={`/recipe/${recipe.id}`}>
                  <button className="w-full bg-amber-800 text-white py-2.5 sm:py-3 rounded-full hover:bg-amber-900 transition transform hover:scale-105 active:scale-95 text-sm sm:text-base">
                    View Recipe
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-5xl sm:text-6xl mb-4">🍳</div>
            <p className="text-lg sm:text-xl text-amber-700">Loading delicious recipes...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-white mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Recipe Haven</h4>
              <p className="text-amber-200 text-sm sm:text-base">Sharing the joy of cooking, one recipe at a time.</p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2 text-amber-200 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">All Recipes</a></li>
                <li><a href="#" className="hover:text-white transition">Submit Recipe</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Connect With Us</h4>
              <p className="text-amber-200 mb-4 text-sm sm:text-base">Follow us for daily recipe inspiration</p>
              <div className="flex space-x-4 justify-center sm:justify-start">
                <a href="#" className="text-2xl sm:text-3xl hover:scale-110 transition">📘</a>
                <a href="#" className="text-2xl sm:text-3xl hover:scale-110 transition">📷</a>
                <a href="#" className="text-2xl sm:text-3xl hover:scale-110 transition">🐦</a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-amber-200 text-sm sm:text-base">
            <p>&copy; 2025 Recipe Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;