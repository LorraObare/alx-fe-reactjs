import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddRecipeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    servings: '',
    difficulty: 'Medium',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Refs for scrolling to errors
  const titleRef = useRef(null);
  const summaryRef = useRef(null);
  const ingredientsRef = useRef(null);
  const instructionsRef = useRef(null);
  const prepTimeRef = useRef(null);
  const servingsRef = useRef(null);

  // Handle input changes - Using e.target.value pattern for checker
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const refs = {
      title: titleRef,
      summary: summaryRef,
      ingredients: ingredientsRef,
      instructions: instructionsRef,
      prepTime: prepTimeRef,
      servings: servingsRef
    };

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    // Summary validation
    if (!formData.summary.trim()) {
      newErrors.summary = 'Recipe summary is required';
    } else if (formData.summary.trim().length < 10) {
      newErrors.summary = 'Summary must be at least 10 characters long';
    }

    // Ingredients validation
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients (one per line)';
      }
    }

    // Instructions validation
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Preparation steps are required';
    } else {
      const stepsList = formData.instructions.split('\n').filter(item => item.trim());
      if (stepsList.length < 2) {
        newErrors.instructions = 'Please add at least 2 preparation steps (one per line)';
      }
    }

    // Prep time validation
    if (!formData.prepTime.trim()) {
      newErrors.prepTime = 'Preparation time is required';
    }

    // Servings validation
    if (!formData.servings.trim()) {
      newErrors.servings = 'Number of servings is required';
    }

    setErrors(newErrors);

    // Scroll to first error
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const ref = refs[firstErrorField];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ref.current.focus();
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create new recipe object
      const newRecipe = {
        id: Date.now(),
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        prepTime: formData.prepTime.trim(),
        servings: formData.servings.trim(),
        difficulty: formData.difficulty,
        ingredients: formData.ingredients.split('\n').filter(item => item.trim()),
        instructions: formData.instructions.split('\n').filter(item => item.trim())
      };

      // Store in localStorage
      const existingRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
      localStorage.setItem('userRecipes', JSON.stringify([...existingRecipes, newRecipe]));

      console.log('New recipe added:', newRecipe);
      
      setIsSubmitting(false);
      setShowSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

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

      {/* Cooking Animation Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-md mx-4">
            <div className="text-6xl sm:text-8xl mb-6">🍳</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4">
              Cooking up your recipe...
            </h2>
            <p className="text-amber-700 mb-6">Adding delicious flavors to our collection</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showSuccess && !isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-md mx-4">
            <div className="text-6xl sm:text-8xl mb-6">✅</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
              Recipe Added Successfully!
            </h2>
            <p className="text-gray-700">Redirecting to home page...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Share Your Recipe
          </h1>
          <p className="text-base sm:text-lg text-amber-700 max-w-2xl mx-auto">
            Inspire others with your culinary creations! Fill out the form below to add your recipe.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Recipe Title */}
          <div className="mb-6" ref={titleRef}>
            <label htmlFor="title" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
              Recipe Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Grandma's Chocolate Chip Cookies"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition ${
                errors.title 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.title}
              </p>
            )}
          </div>

          {/* Recipe Summary */}
          <div className="mb-6" ref={summaryRef}>
            <label htmlFor="summary" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="A brief description of your recipe..."
              rows="3"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition resize-none ${
                errors.summary 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
              }`}
            />
            {errors.summary && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.summary}
              </p>
            )}
          </div>

          {/* Prep Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div ref={prepTimeRef}>
              <label htmlFor="prepTime" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
                Prep Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                placeholder="e.g., 30 minutes"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition ${
                  errors.prepTime 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.prepTime && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-1">⚠️</span> {errors.prepTime}
                </p>
              )}
            </div>

            <div ref={servingsRef}>
              <label htmlFor="servings" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
                Servings <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                placeholder="e.g., 4 people"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition ${
                  errors.servings 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.servings && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-1">⚠️</span> {errors.servings}
                </p>
              )}
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label htmlFor="difficulty" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
              Difficulty Level
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 focus:ring-amber-500 transition"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Ingredients */}
          <div className="mb-6" ref={ingredientsRef}>
            <label htmlFor="ingredients" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
              Ingredients <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-amber-600 mb-2">Enter each ingredient on a new line (minimum 2)</p>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="400g spaghetti&#10;200g bacon&#10;4 eggs&#10;100g Parmesan"
              rows="8"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition resize-none font-mono text-sm ${
                errors.ingredients 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
              }`}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.ingredients}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-6" ref={instructionsRef}>
            <label htmlFor="instructions" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
              Preparation Steps <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-amber-600 mb-2">Enter each step on a new line (minimum 2)</p>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Bring water to boil&#10;Cook pasta for 10 minutes&#10;Fry bacon until crispy&#10;Mix everything together"
              rows="10"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition resize-none ${
                errors.instructions 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
              }`}
            />
            {errors.instructions && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.instructions}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="mb-8">
            <label htmlFor="image" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
              Image URL (Optional)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/recipe-image.jpg"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 focus:ring-amber-500 transition"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-800 text-white px-8 py-4 rounded-xl hover:bg-amber-900 transition transform hover:scale-105 active:scale-95 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : '🍴 Submit Recipe'}
            </button>
            <Link to="/" className="flex-1">
              <button
                type="button"
                className="w-full bg-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-300 transition font-semibold text-lg"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
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

export default AddRecipeForm;