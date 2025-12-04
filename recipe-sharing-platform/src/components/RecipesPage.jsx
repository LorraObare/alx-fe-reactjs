import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error loading recipes:', error));
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Link to="/about" className="text-amber-900 hover:text-amber-700 transition">About</Link>
              <Link to="/contact" className="text-amber-900 hover:text-amber-700 transition">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">All Recipes</h1>
          <p className="text-lg text-amber-700 mb-6">Browse our complete collection of delicious recipes</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRecipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-amber-200">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-sm sm:text-base text-amber-700 mb-4 line-clamp-3">
                    {recipe.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
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

export default RecipesPage;