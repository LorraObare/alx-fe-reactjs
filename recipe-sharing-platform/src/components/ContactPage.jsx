import { useState } from 'react';
import { Link } from 'react-router-dom';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
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
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-amber-900 hover:text-amber-700 transition">Home</Link>
              <Link to="/recipes" className="text-amber-900 hover:text-amber-700 transition">Recipes</Link>
              <Link to="/about" className="text-amber-900 hover:text-amber-700 transition">About</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-amber-700">We'd love to hear from you!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Email Us</h3>
            <p className="text-amber-700">hello@recipehaven.com</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Call Us</h3>
            <p className="text-amber-700">+1 (555) 123-4567</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Visit Us</h3>
            <p className="text-amber-700">123 Culinary Street, Food City, FC 12345</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Hours</h3>
            <p className="text-amber-700">Mon-Fri: 9AM - 6PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Send us a Message</h2>
          
          {submitted && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg">
              <p className="font-bold">✅ Message sent successfully!</p>
              <p>We'll get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-amber-900 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 focus:ring-amber-500"
                placeholder="Your name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-amber-900 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 focus:ring-amber-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-amber-900 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 focus:ring-amber-500 resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-800 text-white px-8 py-4 rounded-xl hover:bg-amber-900 transition transform hover:scale-105 font-semibold text-lg"
            >
              Send Message
            </button>
          </form>
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

export default ContactPage;