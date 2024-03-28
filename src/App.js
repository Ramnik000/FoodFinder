import React from 'react'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Recipe from './Recipe.jsx';
import LoginPage from './Pages/LoginPage.js';
import Signup from './Pages/Signup.js';
import {useAuth } from './contexts/AuthContext.js';



  const App = () => {
    const {isAuthenticated} = useAuth();
    return (
    
      <Router>
        <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/foodapp" /> : <Navigate to="/signup" />}
          />
          <Route path="/foodapp" element={<RecipePage />} />
        </Routes>
        </div>
      </Router>
     
    );
  }

export default App;

const RecipePage = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);

  const APP_ID = "aa1885a8";
  const APP_KEY = "20aa160beaf7d2b8496d07f1e223b231";

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.hits);
      })
      .catch(error => {
        console.error('Error', error)
      })
  }

  return (
    <div className="next-container">
      <h1 className="display-4 text-center mt-5 mb-4">My Food Hut</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input type="text" value={search} onChange={handleSearchChange} className="form-control" placeholder="Search for recipes..." />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      <div className="card-deck">
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
