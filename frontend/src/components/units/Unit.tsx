import { useEffect, useState } from "react";
import { deleteData, fetchData, postData, putData } from "../../utils/api";

function Unit({ id, onSave, onDelete, mode }: any) {
  const [unit, setUnit] = useState({
    name: "",
  });

  useEffect(() => {
    async function fetch() {
      setUnit(await fetchData(`/units/${id}`));
    }
    if (mode === "update") fetch();
    else setUnit({ name: "" });
  }, [id, mode]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (mode === "create") {
        await postData(`/units`, unit);
      } else {
        await putData(`/units/${id}`, unit);
      }
      onSave();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setUnit({ ...unit, [event.target.name]: event.target.value });
  };

  const handleDelete = async () => {
    try {
      await deleteData(`/units/${id}`);
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
        value={unit.name}
        onChange={handleChange}
      />
      <button type="submit">
        {mode === "create" ? "Add unit" : "Update unit"}
      </button>
      {mode === "update" && (
        <button type="button" onClick={handleDelete}>
          Delete unit
        </button>
      )}
    </form>
  );
}

export default Unit;
