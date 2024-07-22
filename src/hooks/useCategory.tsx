import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useCategory() {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState();
  const [loading, setLoading] = useState(true);

  const editRow = () => {
    // setCategoryData((prev) => [...prev, { name: "test", gender: "test" }]);
  };

  const deleteRow = (name) => {
    setCategoryData((prev) => prev.filter((item) => item.name !== name));
  };

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/${category}`)
      .then((response) => {
        console.log(response.data);
        setCategoryData(response.data.results);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return { loading, categoryData, deleteRow };
}
