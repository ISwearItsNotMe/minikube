import { useEffect, useState } from "react";
import Ingredient from "./Ingredient";
import useDocumentTitle, { fetchData } from "../../utils/api";
import { useLocation } from "react-router-dom";

function IngredientsList() {
  const location = useLocation();
  const [ingredients, setIngredients] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >([]);
  const [numIngredient, setNumIngredient] = useState(null as number | null);
  useDocumentTitle(`Ingredient List`);

  const handleSave = async () => {
    setIngredients(await fetchData(`/ingredients`));
  };

  const handleDelete = async (id: number) => {
    setNumIngredient(null);
    let newIngredients = await fetchData(`/ingredients`);
    setIngredients(newIngredients.filter((ingredient: any) => ingredient.id !== id));
  };

  useEffect(() => {
    setNumIngredient(null);
    async function fetch() {
      console.log(await fetchData(`/ingredients`));
      setIngredients(await fetchData(`/ingredients`));
    }
    fetch();
  }, [location]);

  const sortedIngredients =
    ingredients && Array.isArray(ingredients)
      ? ingredients.sort((a, b) => a.name.localeCompare(b.name))
      : [];

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2vw",
        }}
      >
        Ingredient List
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
            onClick={() => setNumIngredient(0)}
          >
            New ingredient
          </div>
          {sortedIngredients.map((ingredient) => (
            <div
              style={{
                cursor: "pointer",
              }}
              key={ingredient.id}
              onClick={() => setNumIngredient(ingredient.id)}
            >
              <div>{ingredient.name}</div>
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
          {numIngredient !== null ? (
            <Ingredient
              id={numIngredient}
              onSave={handleSave}
              onDelete={handleDelete}
              mode={numIngredient !== 0 ? "update" : "create"}
              listIngredients={ingredients}
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
              Choose an ingredient
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default IngredientsList;
