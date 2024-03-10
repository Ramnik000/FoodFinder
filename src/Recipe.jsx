import React from "react";


const Recipe = ({ recipe }) => {
  if (!recipe) {
    return null; 
  }

  const { label, image, calories } = recipe.recipe; 
  return (
    <div className="recipe-card"> 
      <div className="card">
        <img className="card-img-top" src={image} alt={label} />
        <div className="card-body">
          <h5 className="card-title">{label}</h5>
          <p className="card-text">Calories: {calories}</p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
