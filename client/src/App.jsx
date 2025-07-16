import React, { useState } from 'react';
import SweetForm from './components/SweetForm';
import SweetList from './components/SweetList';
import SearchBar from './components/SearchBar';
import SweetProvider from './context/SweetContext';
import './index.css'; // Ensure Tailwind CSS is imported


const App = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <SweetProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Sweet Shop Management
          </h1>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => handleChange(0)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${tabIndex === 0 ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Add Sweet
                </button>
                <button
                  onClick={() => handleChange(1)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${tabIndex === 1 ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Search Sweets
                </button>
                <button
                  onClick={() => handleChange(2)}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${tabIndex === 2 ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Inventory
                </button>
              </nav>
            </div>
          </div>

          <div className={tabIndex !== 0 ? 'hidden' : ''}>
            <SweetForm />
          </div>

          <div className={tabIndex !== 1 ? 'hidden' : ''}>
            <SearchBar />
          </div>

          <div className={tabIndex !== 2 ? 'hidden' : ''}>
            <SweetList />
          </div>
        </div>
      </div>
    </SweetProvider>
  );
};

export default App;