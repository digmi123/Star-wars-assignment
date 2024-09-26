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
import AddPeopleDialog from "@/components/AddPeopleDialog";
import EditPeopleDialog from "@/components/EditPeopleDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { tableHeaders } from "../consts";
import { People } from "@/starWars";
import PaginationBar from "@/components/PaginationBar";
import Loader from "./Loader";

export default function Category() {
  const { category } = useParams();

  const { loading, categoryData, deleteRow, addRow, editRow } = useCategory();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addPeopleModalOpen, setAddPeopleModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<null | People>(null);

  if (loading) return <Loader />;

  if (category !== "people") return <h1>{category}</h1>;

  const handleEdit = (person: People) => {
    setSelectedPerson(person);
    setEditModalOpen(true);
  };

  return (
    <main className="w-full h-full p-4 flex flex-col items-center">
      <h1>{category}</h1>
      <Button
        className="my-4 bg-primary"
        onClick={() => setAddPeopleModalOpen(true)}
      >
        Add People
      </Button>

      <EditPeopleDialog
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        person={selectedPerson}
        editRow={editRow}
      />

      <AddPeopleDialog
        addRow={addRow}
        modalOpen={addPeopleModalOpen}
        setModalOpen={setAddPeopleModalOpen}
      />

      <Table>
        <TableCaption>
          A list of your specified category ({category}).
        </TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header.name} className="w-[100px]">
                {header.displayName}
              </TableHead>
            ))}
            <TableHead className="w-[100px]">Actions</TableHead>
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
                <Button
                  className="bg-blue-500 text-foreground"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteRow(item.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationBar />
    </main>
  );
}
