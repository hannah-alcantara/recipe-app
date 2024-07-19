import React from "react";
import { Outlet } from "react-router-dom";
import IngredientsList from "./components/IngredientsList";
import Recipe from "./components/Recipe";
import axios from "axios";

function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
