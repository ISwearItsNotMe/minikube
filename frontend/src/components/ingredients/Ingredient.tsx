import { useEffect, useState } from "react";
import { deleteData, fetchData, postData, putData } from "../../utils/api";

function Ingredient({ id, onSave, onDelete, mode }: any) {
  const [ingredient, setIngredient] = useState({
    name: "",
    unit: 0,
    category: 0,
  });
  const [units, setUnits] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >([]);
  const [categories, setCategories] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >([]);

  useEffect(() => {
    async function fetch() {
      setIngredient(await fetchData(`/ingredients/${id}`));
    }
    async function fetchOther() {
      setUnits(await fetchData(`/units`));
      setCategories(await fetchData(`/categories`));
    }
    if (mode === "update") fetch();
    else setIngredient({ name: "", unit: 0, category: 0 });
    fetchOther();
  }, [id, mode]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (mode === "create") {
        await postData(`/ingredients`, ingredient);
      } else {
        await putData(`/ingredients/${id}`, ingredient);
      }
      onSave();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setIngredient({ ...ingredient, [event.target.name]: event.target.value });
  };

  const handleDelete = async () => {
    try {
      await deleteData(`/ingredients/delete/${id}`);
      onDelete(id as number);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={ingredient.name}
        onChange={handleChange}
      />
      <select name="unit" value={ingredient.unit} onChange={handleChange}>
        <option value="0">Select unit</option>
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.name}
          </option>
        ))}
      </select>
      <select
        name="category"
        value={ingredient.category}
        onChange={handleChange}
      >
        <option value="0">Select category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit">
        {mode === "create" ? "Add ingredient" : "Update ingredient"}
      </button>
      {mode === "update" && (
        <button type="button" onClick={handleDelete}>
          Delete ingredient
        </button>
      )}
    </form>
  );
}

export default Ingredient;
