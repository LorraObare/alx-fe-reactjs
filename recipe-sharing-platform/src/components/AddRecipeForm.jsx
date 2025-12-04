import { useState } from 'react';
import { Link } from 'react-router-dom';

function AddRecipeForm() {
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
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
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted successfully:', formData);
      
      // Show success message
      setIsSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          title: '',
          summary: '',
          ingredients: '',
          instructions: '',
          prepTime: '',
          servings: '',
          difficulty: 'Medium',
          image: ''
        });
        setIsSubmitted(false);
      }, 2000);
    } else {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Share Your Recipe
          </h1>
          <p className="text-base sm:text-lg text-amber-700 max-w-2xl mx-auto">
            Inspire others with your culinary creations! Fill out the form below to add your recipe to our collection.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 rounded-lg animate-pulse">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <p className="font-bold">Success!</p>
                <p>Your recipe has been submitted successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Recipe Title */}
          <div className="mb-6">
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
          <div className="mb-6">
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

          {/* Two Column Layout for Prep Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Prep Time */}
            <div>
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

            {/* Servings */}
            <div>
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

          {/* Difficulty Level */}
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
          <div className="mb-6">
            <label htmlFor="ingredients" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
              Ingredients <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-amber-600 mb-2">Enter each ingredient on a new line (minimum 2 required)</p>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="400g spaghetti&#10;200g bacon or pancetta&#10;4 large eggs&#10;100g Parmesan cheese"
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
          <div className="mb-6">
            <label htmlFor="instructions" className="block text-amber-900 font-semibold mb-2 text-sm sm:text-base">
              Preparation Steps <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-amber-600 mb-2">Enter each step on a new line (minimum 2 required)</p>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Bring a large pot of salted water to boil&#10;Cook spaghetti according to package directions&#10;While pasta cooks, fry bacon until crispy&#10;Mix eggs and Parmesan cheese in a bowl"
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

          {/* Image URL (Optional) */}
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
              placeholder="https://example.com/your-recipe-image.jpg"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 focus:ring-amber-500 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-amber-800 text-white px-8 py-4 rounded-xl hover:bg-amber-900 transition transform hover:scale-105 active:scale-95 font-semibold text-lg shadow-lg"
            >
              🍴 Submit Recipe
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

        {/* Helper Tips */}
        <div className="mt-8 bg-amber-100 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Tips for a Great Recipe
          </h3>
          <ul className="space-y-2 text-amber-800 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Be specific with measurements and cooking times</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Break down complex steps into simple, easy-to-follow instructions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Include helpful tips or variations if applicable</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Use a high-quality image that showcases your finished dish</span>
            </li>
          </ul>
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

export default AddRecipeForm;