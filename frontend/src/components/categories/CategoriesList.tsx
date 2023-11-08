import { useEffect, useState } from "react";
import Category from "./Category";
import useDocumentTitle, { fetchData } from "../../utils/api";
import { useLocation } from "react-router-dom";

function CategoriesList() {
  const location = useLocation();
  const [categories, setCategories] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >([]);
  const [numCategory, setNumCategory] = useState(null as number | null);
  useDocumentTitle(`Category List`);

  const handleSave = async () => {
    setCategories(await fetchData(`/categories`));
  };

  const handleDelete = async (id: number) => {
    setNumCategory(null);
    let newCategories = await fetchData(`/categories`);
    setCategories(newCategories.filter((category: any) => category.id !== id));
  };

  useEffect(() => {
    setNumCategory(null);
    async function fetch() {
      console.log(await fetchData(`/categories`));
      setCategories(await fetchData(`/categories`));
    }
    fetch();
  }, [location]);

  const sortedCategories =
    categories && Array.isArray(categories)
      ? categories.sort((a, b) => a.name.localeCompare(b.name))
      : [];

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2vw",
        }}
      >
        Category List
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
            onClick={() => setNumCategory(0)}
          >
            New category
          </div>
          {sortedCategories.map((category) => (
            <div
              style={{
                cursor: "pointer",
              }}
              key={category.id}
              onClick={() => setNumCategory(category.id)}
            >
              <div>{category.name}</div>
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
          {numCategory !== null ? (
            <Category
              id={numCategory}
              onSave={handleSave}
              onDelete={handleDelete}
              mode={numCategory !== 0 ? "update" : "create"}
              listCategories={categories}
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
              Choose a category
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoriesList;
