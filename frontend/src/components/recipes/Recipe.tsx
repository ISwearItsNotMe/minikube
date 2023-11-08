import { useEffect, useState } from "react";
import { deleteData, fetchData, postData, putData } from "../../utils/api";

function Recipe({ id, onSave, onDelete, mode }: any) {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
  });
  const [ingredientsList, setIngredientsList] = useState<
    Array<{
      id: number;
      name: string;
      quantity: number;
    }>
  >([]);
  const [ingredientsUsed, setIngredientsUsed] = useState<
    Array<{
      id: number;
      quantity: number;
    }>
  >([]);

  useEffect(() => {
    async function fetch() {
      setRecipe(await fetchData(`/recipes/${id}`));
      let result = await fetchData(`/recipes/ingredients/${id}`);
      setIngredientsUsed(
        result.map((ingredient: any) => {
          return { id: ingredient.ingredientId, quantity: ingredient.quantity };
        })
      );
    }
    async function fetchOther() {
      let result = await fetchData(`/ingredients`);
      let newIngredients = result.map((ingredient: any) => {
        return { id: ingredient.id, name: ingredient.name };
      });
      setIngredientsList(newIngredients);
    }
    if (mode === "update") fetch();
    else setRecipe({ name: "", description: "" });
    fetchOther();
  }, [id, mode]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.log("ingredientsUsed", ingredientsUsed);
      if (mode === "create") {
        let recipeId = await postData(`/recipes`, {
          name: recipe.name,
          description: recipe.description,
        });
        if (ingredientsUsed.length > 0)
          await postData(`/recipes/ingredients/${recipeId}`, {
            ingredientIds: ingredientsUsed.map((ingredient) => ingredient.id),
            quantities: ingredientsUsed.map(
              (ingredient) => ingredient.quantity
            ),
          });
      } else {
        await putData(`/recipes/${id}`, {
          name: recipe.name,
          description: recipe.description,
        });
        if (ingredientsUsed.length > 0)
          await postData(`/recipes/ingredients/${id}`, {
            ingredientIds: ingredientsUsed.map((ingredient) => ingredient.id),
            quantities: ingredientsUsed.map(
              (ingredient) => ingredient.quantity
            ),
          });
      }
      onSave();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleDelete = async () => {
    try {
      await deleteData(`/recipes/delete/${id}`);
      onDelete(id as number);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIngredientChange = (index: number, value: any) => {
    const newIngredients = [...ingredientsUsed];
    newIngredients[index].quantity = value;
    setIngredientsUsed(newIngredients);
  };

  // Modifier pour ajouter l'ingrédient sélectionné à la liste des ingrédients utilisés
  const handleAddIngredient = (selectedId: number) => {
    if (!ingredientsUsed.some((ingredient) => ingredient.id === selectedId)) {
      setIngredientsUsed([...ingredientsUsed, { id: selectedId, quantity: 1 }]);
    } else {
      // Gérer l'erreur ou ignorer si l'ingrédient est déjà ajouté
    }
  };

  const getIngredientNameById = (ingredientId: number) => {
    const ingredient = ingredientsList.find((ing) => ing.id === ingredientId);
    return ingredient ? ingredient.name : "Inconnu";
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={recipe.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={recipe.description}
        onChange={handleChange}
      />
      <div>
        <label htmlFor="ingredients">Ingrédients</label>
        <div>
          {ingredientsUsed.map((usedIngredient, index) => {
            const ingredientName = getIngredientNameById(usedIngredient.id);
            return (
              <div key={usedIngredient.id}>
                {ingredientName}
                <input
                  type="number"
                  name="quantity"
                  value={usedIngredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, Number(e.target.value))
                  }
                />
                <button
                  type="button"
                  onClick={() => {
                    setIngredientsUsed(
                      ingredientsUsed.filter(
                        (ingredientUsed) =>
                          ingredientUsed.id !== usedIngredient.id
                      )
                    );
                  }}
                >
                  remove
                </button>
              </div>
            );
          })}
          <select
            onChange={(e) => handleAddIngredient(Number(e.target.value))}
            value="default"
          >
            <option disabled value="default">
              Choisir un ingrédient
            </option>
            {ingredientsList.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit">
        {mode === "create" ? "Add recipe" : "Update recipe"}
      </button>
      {mode === "update" && (
        <button type="button" onClick={handleDelete}>
          Delete recipe
        </button>
      )}
    </form>
  );
}

export default Recipe;
