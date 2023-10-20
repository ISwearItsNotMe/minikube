import { Routes, Route } from "react-router-dom";
import UnitsList from "./units/UnitsList";
import CategoriesList from "./categories/CategoriesList";
import IngredientsList from "./ingredients/IngredientsList";
import RecipesList from "./recipes/RecipesList";
import NotFoundPage from "./NotFoundPage";
import Home from "./Home";

function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/units" element={<UnitsList/>}></Route>
      <Route path="/categories" element={<CategoriesList/>}></Route>
      <Route path="/ingredients" element={<IngredientsList/>}></Route>
      <Route path="/recipes" element={<RecipesList/>}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default RoutesList;