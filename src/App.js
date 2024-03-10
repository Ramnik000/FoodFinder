// App.jsx
import React, { useState } from 'react';
import Recipe from './Recipe.jsx';
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
crossorigin="anonymous"></link>

const App = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);

  const APP_ID = "aa1885a8";
  const APP_KEY = "20aa160beaf7d2b8496d07f1e223b231";

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleSubmit(event) {
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
    <div className="container">
        <div className="about-container">
        <h1>Welcome to my App...</h1>
        <p class="lead"> 
             "Food Hut is your ultimate destination for culinary exploration,
            offering a diverse range of dishes to tantalize your taste buds.
            From mouthwatering appetizers to delectable main courses and indulgent desserts,
            Food Hut promises an unforgettable dining experience. Whether you're craving comforting 
             classics or adventurous flavors from around the world, our menu has something for everyone.
             Dive into a world of flavors and embark on a gastronomic journey with Food Hut today!" .
              Your go-to destination for delicious recipes.</p>
        </div>

        <div className="next-container">
            <h1 class="display-4 text-center mt-5 mb-4">My Food Hut</h1>

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
    </div>
  );
}

export default App;
