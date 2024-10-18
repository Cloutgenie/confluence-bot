import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Answer from './components/Answer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-4">Confluence Bot</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/answer" element={<Answer />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;