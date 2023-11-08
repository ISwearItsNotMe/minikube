import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import useDocumentTitle, { fetchData } from "../../utils/api";
import { useLocation } from "react-router-dom";

function RecipesList() {
  const location = useLocation();
  const [recipes, setRecipes] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >([]);
  const [numRecipe, setNumRecipe] = useState(null as number | null);
  useDocumentTitle(`Recipe List`);

  const handleSave = async () => {
    setRecipes(await fetchData(`/recipes`));
  };

  const handleDelete = async (id: number) => {
    setNumRecipe(null);
    let newRecipes = await fetchData(`/recipes`);
    setRecipes(newRecipes.filter((recipe: any) => recipe.id !== id));
  };

  useEffect(() => {
    setNumRecipe(null);
    async function fetch() {
      console.log(await fetchData(`/recipes`));
      setRecipes(await fetchData(`/recipes`));
    }
    fetch();
  }, [location]);

  const sortedRecipes =
    recipes && Array.isArray(recipes)
      ? recipes.sort((a, b) => a.name.localeCompare(b.name))
      : [];

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2vw",
        }}
      >
        Recipe List
      </h1>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          columnGap: "5vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "39vw",
          }}
        >
          <div
            style={{
              marginBottom: "1vh",
              cursor: "pointer",
            }}
            onClick={() => setNumRecipe(0)}
          >
            New recipe
          </div>
          {sortedRecipes.map((recipe) => (
            <div
              style={{
                cursor: "pointer",
              }}
              key={recipe.id}
              onClick={() => setNumRecipe(recipe.id)}
            >
              <div>{recipe.name}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            height: "60%",
            width: "0.1vw",
            borderLeft: "0.1vw solid white",
          }}
        ></div>
        <div
          style={{
            width: "39vw",
          }}
        >
          {numRecipe !== null ? (
            <Recipe
              id={numRecipe}
              onSave={handleSave}
              onDelete={handleDelete}
              mode={numRecipe !== 0 ? "update" : "create"}
              listRecipes={recipes}
            />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1vw",
              }}
            >
              Choose an recipe
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RecipesList;
