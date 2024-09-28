import {
  CategoriesNames,
  Film,
  People,
  Planet,
  Specie,
  Starship,
  Vehicle,
} from "@/starWars";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

type PreviewCardProps =
  | {
      category: CategoriesNames.films;
      resultsPreview: Film[];
    }
  | {
      category: CategoriesNames.people;
      resultsPreview: People[];
    }
  | {
      category: CategoriesNames.planets;
      resultsPreview: Planet[];
    }
  | {
      category: CategoriesNames.species;
      resultsPreview: Specie[];
    }
  | {
      category: CategoriesNames.starships;
      resultsPreview: Starship[];
    }
  | {
      category: CategoriesNames.vehicles;
      resultsPreview: Vehicle[];
    };

const getName = (
  entity: People | Planet | Specie | Starship | Vehicle
): string => {
  return entity.name;
};

const getDisplayField = {
  [CategoriesNames.films]: (entity: Film): string => entity.title,
  [CategoriesNames.people]: getName,
  [CategoriesNames.planets]: getName,
  [CategoriesNames.species]: getName,
  [CategoriesNames.starships]: getName,
  [CategoriesNames.vehicles]: getName,
};

export default function PreviewCard({
  category,
  resultsPreview,
}: PreviewCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${category}`);
  };

  return (
    <Card>
      <CardContent className="py-4">
        <div
          id="top-section"
          className="flex items-center justify-between py-1"
        >
          <h2>{category}</h2>
          <Button onClick={handleClick} variant="secondary">
            View All
          </Button>
        </div>

        <div
          id="devider"
          className="w-full h-[2px] bg-gray-500 rounded-md my-2"
        />

        <ul className="flex flex-col gap-2">
          {resultsPreview.map((item, index) => (
            <li key={index} className="text-lg">
              {getDisplayField[category](item as any)}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
