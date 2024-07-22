import { useNavigate } from "react-router-dom";

interface PreviewCardProps {
  category: string;
  resultsPreview: { name: string }[];
}

export default function PreviewCard({
  category,
  resultsPreview,
}: PreviewCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${category}`);
  };

  return (
    <div className="py-4">
      <div id="top-section" className="flex items-center justify-between py-1">
        <h2>{category}</h2>
        <button
          className="bg-red-600 px-2 py-1 rounded-md text-color-white cursor-pointer"
          onClick={handleClick}
        >
          View All
        </button>
      </div>

      <div
        id="devider"
        className="w-full h-[2px] bg-gray-500 rounded-md my-2"
      />

      <ul className="flex flex-col gap-2">
        {resultsPreview.map((item, index) => (
          <li key={index} className="text-lg">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
