import { BrowserRouter, NavLink } from "react-router-dom";
import RoutesList from "./components/Routes";

function App() {
  return (
    <BrowserRouter>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/units">Units</NavLink>
      <NavLink to="/ingredients">Ingredients</NavLink>
      <NavLink to="/recipes">Recipes</NavLink>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
