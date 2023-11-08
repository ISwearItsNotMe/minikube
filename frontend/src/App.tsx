import { BrowserRouter, NavLink } from "react-router-dom";
import RoutesList from "./components/Routes";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          display: "flex",
          width: "90vw",
          padding: "2vh 5vw",
          fontSize: "1.5vw",
          borderBottom: "0.1vw solid white",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavLink style={{ color: "white" }} to="/categories">
          Categories
        </NavLink>
        <NavLink style={{ color: "white" }} to="/units">
          Units
        </NavLink>
        <NavLink style={{ color: "white" }} to="/ingredients">
          Ingredients
        </NavLink>
        <NavLink style={{ color: "white" }} to="/recipes">
          Recipes
        </NavLink>
      </div>
      <div
        style={{
          height: "90vh",
          width: "100vw",
          backgroundColor: "#2C2C2C",
          color: "white",
          paddingTop: "10vh",
          display: "flex",
          rowGap: "1vh",
          flexDirection: "column",
        }}
      >
        <RoutesList />
      </div>
    </BrowserRouter>
  );
}

export default App;
