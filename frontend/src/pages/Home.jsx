import React from 'react';
import { LogIn, ClipboardList, Clock, Loader, SquareChartGantt, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-[#5d4037] to-[#3e2723] mx-auto px-4 py-32 text-center flex justify-center items-center flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-amber-200 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-0 right-1/4 w-32 h-32 rounded-full bg-rose-200 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-0 left-1/2 w-32 h-32 rounded-full bg-blue-200 mix-blend-multiply filter blur-xl animate-blob"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Welcome to <span className="text-amber-300">Your</span> Space
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
            Discover a world of possibilities where innovation meets creativity. 
            Join us on this journey to transform ideas into reality.
          </p>
          <div className='flex justify-center items-center'>
          <Link to="/login">
            <button type="submit" className="group flex justify-center items-center gap-2 bg-gradient-to-r px-8 cursor-pointer from-amber-600 to-amber-800 text-white font-bold text-lg py-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <span>Get Started</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
        </div>
      </section>

      <section className="py-28 bg-white">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-amber-700 bg-amber-100 rounded-full">FEATURES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              Powerful Task Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your workflow with our intuitive tools designed to boost your productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
                title: "Task Organization",
                description: "Easily categorize and prioritize tasks with intuitive labels and filters",
                icon: <ClipboardList size={50} className="text-amber-600" />,
                benefits: ["Custom categories", "Priority levels", "Smart filtering"]
              },
              {
                title: "Progress Tracking",
                description: "Visual dashboards and analytics to monitor your productivity trends",
                icon: <SquareChartGantt size={50} className="text-amber-600" />,
                benefits: ["Real-time analytics", "Productivity trends", "Custom reports"]
              },
              {
                title: "Deadline Management",
                description: "Smart reminders and calendar integration to never miss important dates",
                icon: <Clock size={50} className="text-amber-600" />,
                benefits: ["Automated reminders", "Calendar sync", "Time tracking"]
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className='flex flex-col items-start bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-100 h-full'
              >
                <div className="text-5xl mb-6 p-3 bg-amber-50 rounded-lg">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="mt-auto space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <Check size={16} className="mr-2 text-amber-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#efebe9] to-[#d7ccc8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "5x", label: "Productivity Boost" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center bg-gradient-to-r from-[#5d4037] to-[#3e2723] rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join thousands of others who have already discovered the power of our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <button className="group flex justify-center items-center gap-2 bg-white px-8 cursor-pointer text-gray-900 font-bold text-lg py-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <span>Get Started</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            <button className="group flex justify-center items-center gap-2 border-2 border-white px-8 cursor-pointer text-white font-bold text-lg py-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-gray-300">
          <div className="pt-8 border-t border-gray-800 flex justify-center">
            <p className="text-sm text-center">© {new Date().getFullYear()} Your Space. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default Home;