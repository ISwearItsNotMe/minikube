import { useEffect, useState } from "react";
import { deleteData, fetchData, postData, putData } from "../../utils/api";

function Category({ id, onSave, onDelete, mode }: any) {
  const [category, setCategory] = useState({
    name: "",
  });

  useEffect(() => {
    async function fetch() {
      setCategory(await fetchData(`/categories/${id}`));
    }
    if (mode === "update") fetch();
    else setCategory({ name: "" });
  }, [id, mode]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (mode === "create") {
        await postData(`/categories`, category);
      } else {
        await putData(`/categories/${id}`, category);
      }
      onSave();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const handleDelete = async () => {
    try {
      await deleteData(`/categories/delete/${id}`);
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
        value={category.name}
        onChange={handleChange}
      />
      <button type="submit">
        {mode === "create" ? "Add category" : "Update category"}
      </button>
      {mode === "update" && (
        <button type="button" onClick={handleDelete}>
          Delete category
        </button>
      )}
    </form>
  );
}

export default Category;
