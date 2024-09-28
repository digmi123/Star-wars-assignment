import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import {
  Film,
  People,
  Planet,
  Specie,
  Starship,
  Vehicle,
  CategoriesNames,
  EntityTypes,
} from "@/starWars";
import axios from "axios";
import PreviewCard from "../components/PreviewCard";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../utlis/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import uuid from "react-uuid";
import Launch from "./Launch";
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface Categories {
  [CategoriesNames.films]: Film[];
  [CategoriesNames.people]: People[];
  [CategoriesNames.planets]: Planet[];
  [CategoriesNames.species]: Specie[];
  [CategoriesNames.starships]: Starship[];
  [CategoriesNames.vehicles]: Vehicle[];
}

const categoriesDefaultState = {
  [CategoriesNames.films]: [],
  [CategoriesNames.people]: [],
  [CategoriesNames.planets]: [],
  [CategoriesNames.species]: [],
  [CategoriesNames.starships]: [],
  [CategoriesNames.vehicles]: [],
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedText = useDebounce(searchParams, 2000);
  const [categoriesData, setCategoriesData] = useState<Categories>(
    categoriesDefaultState
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchParams({ search: searchQuery });
  };

  const getData = useCallback(() => {
    for (const category of Object.values(CategoriesNames)) {
      axios
        .get(`https://swapi.dev/api/${category}/?${debouncedText}`)
        .then((response) => {
          const transformedData = response.data.results
            .slice(0, 3)
            .map((item: EntityTypes) => ({
              id: uuid(),
              ...item,
            }));

          setCategoriesData((prev) => ({
            ...prev,
            [category]: transformedData,
          }));
        });
    }
  }, [debouncedText]);

  useEffect(() => {
    if (debouncedText.get("search")) getData();
    else setCategoriesData(categoriesDefaultState);
  }, [debouncedText, getData]);

  return (
    <main className="w-full h-full p-4 flex flex-col items-center relative">
      <ThemeSwitcher />
      <Launch />

      <form className="w-full max-w-5xl">
        <div className="flex flex-col">
          <Label className="text-xl py-2">Search</Label>
          <Input
            className="bg-input"
            type="text"
            placeholder="Search"
            name="search"
            onChange={handleSearch}
            defaultValue={searchParams.get("search") || ""}
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] auto-rows-fr py-4 gap-4">
          {Object.entries(categoriesData).map(([category, data]) => (
            <Fragment key={category}>
              {data.length > 0 && (
                <PreviewCard
                  category={category as CategoriesNames}
                  resultsPreview={data}
                />
              )}
            </Fragment>
          ))}
        </div>
      </form>
    </main>
  );
}
