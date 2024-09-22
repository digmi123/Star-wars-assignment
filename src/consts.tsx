import { People } from "./starWars";

export const tableHeaders: {
  name: keyof People;
  displayName: string;
}[] = [
  {
    name: "name",
    displayName: "Name",
  },
  {
    name: "gender",
    displayName: "Gender",
  },
  {
    name: "birth_year",
    displayName: "Date Of Birth",
  },
  {
    name: "eye_color",
    displayName: "Eye Color",
  },
  {
    name: "hair_color",
    displayName: "Hair color",
  },
  {
    name: "height",
    displayName: "Height",
  },
  {
    name: "mass",
    displayName: "Mass",
  },
];
