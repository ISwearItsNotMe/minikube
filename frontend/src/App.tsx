import { BrowserRouter, NavLink } from "react-router-dom";
import RoutesList from "./components/Routes";

function App() {
  return (
    <BrowserRouter>
      <div style={{
        position: "fixed",
        top: "0",
        left: "0",
        color: "white",
        display: "flex",
        width: "98vw",
        padding: "0 1vw",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/units">Units</NavLink>
        <NavLink to="/ingredients">Ingredients</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
      </div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#2C2C2C",
        }}
      >
        <RoutesList />
      </div>
    </BrowserRouter>
  );
}

export default App;
