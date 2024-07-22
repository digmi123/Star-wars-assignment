import { useCallback, useEffect, useState } from "react";
import { Film, People, Planet, Specie, Starship, Vehicle } from "../types";
import axios from "axios";
import PreviewCard from "../components/PreviewCard";
import { useSearchParams } from "react-router-dom";

enum CategoriesNames {
  films = "films",
  people = "people",
  planets = "planets",
  species = "species",
  starships = "starships",
  vehicles = "vehicles",
}

interface Categories {
  [CategoriesNames.films]: Film[];
  [CategoriesNames.people]: People[];
  [CategoriesNames.planets]: Planet[];
  [CategoriesNames.species]: Specie[];
  [CategoriesNames.starships]: Starship[];
  [CategoriesNames.vehicles]: Vehicle[];
}

const fieldMapper = (
  results: (Film | People | Planet | Specie | Starship | Vehicle)[]
) => {
  const mappedResults = results.map((res) => {
    return { name: (res as People).name || (res as Film).title };
  });
  return mappedResults;
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoriesData, setCategoriesData] = useState<Categories>({
    [CategoriesNames.films]: [],
    [CategoriesNames.people]: [],
    [CategoriesNames.planets]: [],
    [CategoriesNames.species]: [],
    [CategoriesNames.starships]: [],
    [CategoriesNames.vehicles]: [],
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchParams({ search: searchQuery });
  };

  useEffect(() => {
    if (!searchParams.get("search")) return;
    for (const category of Object.values(CategoriesNames)) {
      axios
        .get(`https://swapi.dev/api/${category}/?${searchParams}`)
        .then((response) => {
          console.log({ response });
          setCategoriesData((prev) => ({
            ...prev,
            [category]: response.data.results,
          }));
        });
    }
  }, [searchParams]);

  // const kakiPopen = useCallback(async (searchParams: URLSearchParams) => {
  //   if (!searchParams.get("search")) return;

  //   const resultsPromises = Object.values(CategoriesNames).map(
  //     (categoryName) => {
  //       return axios
  //         .get(`https://swapi.dev/api/${categoryName}/?${searchParams}`)
  //         .then((response) => {
  //           console.log({ response });
  //           return [categoryName, response.data.results];
  //         });
  //     }
  //   );
  //   const result = await Promise.all(resultsPromises);
  //   setCategoriesData(Object.fromEntries(result));
  // }, []);

  // useEffect(() => {
  //   kakiPopen(searchParams);
  // }, [kakiPopen, searchParams]);

  return (
    <main className="w-full h-full p-4 flex flex-col items-center">
      <form className="min-w-96 p-4">
        <div className="flex flex-col">
          <label className="text-red-600 text-xl">Search</label>
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="p-2 rounded-md"
            onChange={handleSearch}
            defaultValue={searchParams.get("search") || ""}
          />
        </div>

        <div className="flex flex-col py-4">
          {Object.entries(categoriesData).map(([category, data]) => (
            <div key={category}>
              {data.length > 0 && (
                <PreviewCard
                  category={category}
                  resultsPreview={fieldMapper(
                    categoriesData[category as keyof Categories].slice(0, 3)
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </form>
    </main>
  );
}
