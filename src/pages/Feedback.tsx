import React from 'react';
import { MessageCircle, Mail, Phone, Calendar } from 'lucide-react';

const Feedback: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-mn-accent-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Feedback & Engagement
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Your input is crucial to the success of our MES modernization initiative.
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-mn-primary">
                We Want to Hear From You
              </h2>
              <p className="text-lg text-gray-600">
                [Placeholder text] Your feedback and insights are essential to ensuring our MES modernization 
                efforts meet the needs of all stakeholders. Whether you're a government employee, citizen, 
                or industry partner, your perspective matters.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-6 w-6 text-mn-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-mn-primary">Share Your Thoughts</h3>
                    <p className="text-gray-600">Tell us about your current experiences and future needs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-mn-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-mn-primary">Stay Informed</h3>
                    <p className="text-gray-600">Receive updates on our modernization progress.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-6 w-6 text-mn-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-mn-primary">Participate in Sessions</h3>
                    <p className="text-gray-600">Join stakeholder meetings and feedback sessions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-mn-primary mb-6">
                Submit Your Feedback
              </h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Category
                  </label>
                  <select
                    id="category"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="general">General Feedback</option>
                    <option value="technical">Technical Suggestions</option>
                    <option value="process">Process Improvements</option>
                    <option value="challenge">Challenge Questions</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mn-accent-teal focus:border-transparent"
                    placeholder="Share your thoughts, suggestions, or questions..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-mn-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-mn-accent-teal transition-colors"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Feedback;