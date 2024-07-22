import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCategory from "@/hooks/useCategory";

const tableHeaders = [
  "Name",
  "Gender",
  "Date Of Birth",
  "Eye Color",
  "Hair color",
  "Height",
  "Mass",
  "Actions",
];

export default function Category() {
  const { category } = useParams();
  const { loading, categoryData, deleteRow } = useCategory();

  if (loading) return <h1>Loading...</h1>;

  if (category !== "people") return <h1>Category</h1>;

  return (
    <main className="w-full h-full p-4 flex flex-col items-center">
      <h1>{category}</h1>
      <Table>
        <TableCaption>
          A list of your specified category ({category}).
        </TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header} className="w-[100px]">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryData.map((item, index) => (
            <TableRow key={`${index}-${item.name}`}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.birth_year}</TableCell>
              <TableCell>{item.eye_color}</TableCell>
              <TableCell>{item.hair_color}</TableCell>
              <TableCell>{item.height}</TableCell>
              <TableCell>{item.mass}</TableCell>
              <TableCell className="flex gap-2">
                <button className="bg-blue-600 px-2 py-1 rounded-md">
                  Edit
                </button>
                <button
                  className="bg-red-600 px-2 py-1 rounded-md"
                  onClick={() => deleteRow(item.name)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
