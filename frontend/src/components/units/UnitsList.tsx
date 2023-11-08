import { useEffect, useState } from "react";
import Unit from "./Unit";
import useDocumentTitle, { fetchData } from "../../utils/api";
import { useLocation } from "react-router-dom";

function UnitsList() {
  const location = useLocation();
  const [units, setUnits] = useState<
    Array<{
      id: number;
      name: string;
    }>
  >([]);
  const [numUnit, setNumUnit] = useState(null as number | null);
  useDocumentTitle(`Unit List`);

  const handleSave = async () => {
    setUnits(await fetchData(`/units`));
  };

  const handleDelete = async (id: number) => {
    setNumUnit(null);
    let newUnits = await fetchData(`/units`);
    setUnits(newUnits.filter((unit: any) => unit.id !== id));
  };

  useEffect(() => {
    setNumUnit(null);
    async function fetch() {
      console.log(await fetchData(`/units`));
      setUnits(await fetchData(`/units`));
    }
    fetch();
  }, [location]);

  const sortedUnits =
    units && Array.isArray(units)
      ? units.sort((a, b) => a.name.localeCompare(b.name))
      : [];

  return (
    <div
      style={{
        color: "white",
        width: "100%",
        height: "98vh",
        paddingTop: "2vh",
        display: "flex",
        rowGap: "1vh",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2vw",
        }}
      >
        Unit List
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
            onClick={() => setNumUnit(0)}
          >
            New unit
          </div>
          {sortedUnits.map((unit) => (
            <div
              style={{
                cursor: "pointer",
              }}
              key={unit.id}
              onClick={() => setNumUnit(unit.id)}
            >
              <div>{unit.name}</div>
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
          {numUnit !== null ? (
            <Unit
              id={numUnit}
              onSave={handleSave}
              onDelete={handleDelete}
              mode={numUnit !== 0 ? "update" : "create"}
              listUnits={units}
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
              Choose a unit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnitsList;
