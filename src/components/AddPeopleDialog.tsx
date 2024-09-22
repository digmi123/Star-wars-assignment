import { DialogFooter } from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { tableHeaders } from "../consts";
import DialogWrapper from "./DialogWrapper";
import { Fragment } from "react";
import { People } from "@/starWars";
import uuid from "react-uuid";

interface AddPeopleDialogProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  addRow: (person: People) => void;
}

export default function AddPeopleDialog({
  addRow,
  modalOpen,
  setModalOpen,
}: AddPeopleDialogProps) {
  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target: HTMLFormElement = event.target as HTMLFormElement;
    addRow({
      id: uuid(),
      name: target["name"].value,
      gender: target["gender"].value,
      birth_year: target["birth_year"].value,
      eye_color: target["eye_color"].value,
      hair_color: target["hair_color"].value,
      height: target["height"].value,
      mass: target["mass"].value,
    });
    setModalOpen(false);
  };

  return (
    <DialogWrapper
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title="Add People"
      description="Here you can add new people to the table."
    >
      <form className="grid gap-4 py-4" onSubmit={handleAdd}>
        <div className="grid grid-cols-4 items-center gap-4">
          {tableHeaders.map((header) => {
            return (
              <Fragment key={header.displayName}>
                <Label>{header.displayName}</Label>
                <Input id={header.name} className="col-span-3" />
              </Fragment>
            );
          })}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogWrapper>
  );
}
