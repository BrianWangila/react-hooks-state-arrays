import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
  }

  //remove a food after clicking
  function handleClick(id){
    const newFoodArray = foods.filter((food) => food.id !== id)
    setFoods(newFoodArray)

    //increase heat level
    const newFoodArrays = foods.map((food) => {
      if (food.id === id){
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        }
      } else{
        return food;
      }
    })

    setFoods(newFoodArrays)
  }
  //showing all foods from certain cuisine
  const [filterBy, setFilterBy] = useState("All")

  function handleFilterChange(event){
    setFilterBy(event.target.value)
  }

  return (
    <select name="filter" onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="American">America</option>
      <option value="Sichuan">Sichuan</option>
      <option value="Thai">Thai</option>
      <option value="Mexican">Mexican</option>
    </select>
  )

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All"){
      return true;
    }
    else{
      return food.cuisine === filterBy
    }
  })

  const foodList = foodsToDisplay.map((food) => ( //use foodsToDisplay in place of foods
    //add event lister on the food items
    <li key={food.id} onClick={() => handleClick(food.id)}> 
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  //JSX button that's returned
  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
