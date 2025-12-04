import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe data from data.json
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => {
        const selectedRecipe = data.find(recipe => recipe.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch(error => console.error('Error loading recipe:', error));
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍳</div>
          <p className="text-xl text-amber-700">Loading recipe...</p>
        </div>
      </div>
    );
  }

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
            <Link to="/">
              <button className="bg-amber-800 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-amber-900 transition text-sm sm:text-base">
                ← Back to Home
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Recipe Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Recipe Image */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-amber-200">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Recipe Title & Summary */}
          <div className="p-6 sm:p-8 md:p-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              {recipe.title}
            </h1>
            <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
              {recipe.summary}
            </p>

            {/* Recipe Meta Info */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 pt-6 border-t border-amber-200">
              <div className="flex items-center space-x-2 text-amber-800">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="text-xs text-amber-600">Prep Time</p>
                  <p className="font-semibold">{recipe.prepTime || '30 minutes'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-amber-800">
                <span className="text-2xl">🍽️</span>
                <div>
                  <p className="text-xs text-amber-600">Servings</p>
                  <p className="font-semibold">{recipe.servings || '4 people'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-amber-800">
                <span className="text-2xl">👨‍🍳</span>
                <div>
                  <p className="text-xs text-amber-600">Difficulty</p>
                  <p className="font-semibold">{recipe.difficulty || 'Medium'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Ingredients and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 sticky top-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 flex items-center">
                <span className="mr-2">🥘</span>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <li 
                      key={index} 
                      className="flex items-start text-amber-800 hover:bg-amber-50 p-2 rounded-lg transition"
                    >
                      <span className="text-amber-600 mr-3 mt-1">✓</span>
                      <span className="text-sm sm:text-base">{ingredient}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-amber-600 italic">
                    • 400g spaghetti
                    <br />• 200g bacon or pancetta
                    <br />• 4 large eggs
                    <br />• 100g Parmesan cheese
                    <br />• Black pepper to taste
                    <br />• Salt for pasta water
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 flex items-center">
                <span className="mr-2">📝</span>
                Instructions
              </h2>
              <div className="space-y-6">
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((instruction, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-4 pb-6 border-b border-amber-100 last:border-0"
                    >
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-amber-800 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                        {index + 1}
                      </div>
                      <p className="text-amber-800 leading-relaxed pt-1 text-sm sm:text-base">
                        {instruction}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start space-x-4 pb-6 border-b border-amber-100">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-800 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <p className="text-amber-800 leading-relaxed pt-1">
                        Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4 pb-6 border-b border-amber-100">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-800 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <p className="text-amber-800 leading-relaxed pt-1">
                        While pasta cooks, cut bacon into small pieces and fry in a large pan until crispy. Remove from heat.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4 pb-6 border-b border-amber-100">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-800 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <p className="text-amber-800 leading-relaxed pt-1">
                        In a bowl, whisk together eggs and grated Parmesan cheese. Season with black pepper.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-800 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <p className="text-amber-800 leading-relaxed pt-1">
                        Drain pasta, reserving 1 cup of pasta water. Add hot pasta to the pan with bacon. Remove from heat, then quickly stir in egg mixture, adding pasta water as needed to create a creamy sauce. Serve immediately.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tips Section */}
            {recipe.tips && (
              <div className="bg-amber-100 rounded-2xl p-6 sm:p-8 mt-8">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-4 flex items-center">
                  <span className="mr-2">💡</span>
                  Chef's Tips
                </h3>
                <p className="text-amber-800 leading-relaxed text-sm sm:text-base">
                  {recipe.tips}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <Link to="/">
            <button className="bg-amber-800 text-white px-8 py-3 rounded-full hover:bg-amber-900 transition transform hover:scale-105 active:scale-95 text-base sm:text-lg">
              ← Back to All Recipes
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

export default RecipeDetail;