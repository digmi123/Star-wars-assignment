import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { tableHeaders } from "../consts";
import DialogWrapper from "./DialogWrapper";
import { FormEvent, Fragment } from "react";
import { People } from "@/starWars";

interface EditPeopleDialogProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  person: null | People;
  editRow: (person: People, updatedPerson: People) => void;
}

export default function EditPeopleDialog({
  modalOpen,
  setModalOpen,
  person,
  editRow,
}: EditPeopleDialogProps) {
  const handleEditSubmit =
    (person: People) => (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const target: HTMLFormElement = event.target as HTMLFormElement;
      const updatedPerson = {
        name: target["name"].value,
        gender: target["gender"].value,
        birth_year: target["birth_year"].value,
        eye_color: target["eye_color"].value,
        hair_color: target["hair_color"].value,
        height: target["height"].value,
        mass: target["mass"].value,
      };

      editRow(person, updatedPerson);
      setModalOpen(false);
    };

  if (person === null) return null;

  return (
    <DialogWrapper
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title="Edit Person"
      description="here you can edit the selected person as much as you want."
    >
      <form className="grid gap-4 py-4" onSubmit={handleEditSubmit(person)}>
        <div className="grid grid-cols-4 items-center gap-4">
          {tableHeaders.map((header) => {
            return (
              <Fragment key={header.displayName}>
                <Label>{header.displayName}</Label>
                <Input
                  id={header.name}
                  className="col-span-3"
                  defaultValue={person[header.name] || ""}
                />
              </Fragment>
            );
          })}
        </div>
        <DialogFooter>
          <Button type="submit" variant="secondary">
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogWrapper>
  );
}
