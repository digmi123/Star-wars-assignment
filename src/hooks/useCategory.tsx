import { EntityTypes, People } from "@/starWars";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import uuid from "react-uuid";

export default function useCategory() {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState<People[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const editRow = (oldPerson: People, updatedPerson: People) => {
    const updatedPeople = categoryData.map((person) =>
      person.name === oldPerson.name ? updatedPerson : person
    );
    setCategoryData(updatedPeople);
  };

  const addRow = (data: People) => {
    setCategoryData((prev) => [...prev, data]);
  };

  const deleteRow = (id?: string) => {
    setCategoryData((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/${category}/?page=${page}`)
      .then((response) => {
        console.log(response.data.results);

        const transformedData = response.data.results.map(
          (item: EntityTypes) => ({
            id: uuid(),
            ...item,
          })
        );
        setCategoryData(transformedData);
      })
      .finally(() => setLoading(false));
  }, [category, page]);

  return {
    loading,
    categoryData,
    deleteRow,
    addRow,
    editRow,
  };
}
