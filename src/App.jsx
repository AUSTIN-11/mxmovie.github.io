// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AnimationsPage from './pages/AnimationsPage';
import TVShowsPage from './pages/TVShowsPage';
import TrendingPage from './pages/TrendingPage';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Layout from './components/layout';

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route element={<Layout/> } >
        <Route path="/" element={<HomePage />} />
        <Route path="/animations" element={<AnimationsPage />} />
        <Route path="/tv-shows" element={<TVShowsPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        </Route>
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
