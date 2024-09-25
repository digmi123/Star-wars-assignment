// import dark from "@/assets/darth-vader.svg";
import dark from "@/assets/darth-vader.png";

// import yoda2 from "@/assets/yoda2.svg";
import yoda3 from "@/assets/yoda3.png";
import { Theme, useTheme } from "@/providers/ThemeProvider";
import { useRef } from "react";

export default function Launch() {
  const { setTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const yodaRef = useRef<HTMLDivElement | null>(null);
  const darthVaderRef = useRef<HTMLDivElement | null>(null);

  const handlePick = (theme: Theme) => {
    setTheme(theme);
    yodaRef.current?.classList.remove("animate-fade-in-right");
    yodaRef.current?.classList.add("animate-fade-out-right");

    darthVaderRef.current?.classList.remove("animate-fade-in-right");
    darthVaderRef.current?.classList.add("animate-fade-out-left");

    wrapperRef.current?.classList.add("pointer-events-none");
  };

  return (
    <div
      className="flex items-center h-full w-full justify-between absolute top-0"
      ref={wrapperRef}
    >
      <div
        className="h-screen w-[50%] bg-dark-mode-half grid grid-rows-[repeat(auto-fill,_minmax(auto,_1fr))] place-items-center p-4 animate-fade-in-left fill-mode-forwards group cursor-pointer"
        onClick={() => handlePick("dark")}
        ref={darthVaderRef}
      >
        <h2 className="text-white font-bold uppercase text-center">
          Dark mode
        </h2>
        <img
          src={dark}
          className="w-[600px] h-[600px] transition-transform duration-500 ease-in-out transform group-hover:scale-110 object-contain"
        />
      </div>
      <div
        className="h-screen w-[50%] bg-light-mode-half grid grid-rows-[repeat(auto-fill,_minmax(auto,_1fr))] place-items-center p-4 animate-fade-in-right fill-mode-forwards group cursor-pointer"
        onClick={() => handlePick("light")}
        ref={yodaRef}
      >
        <h2 className="text-black font-bold uppercase text-center">
          light mode
        </h2>
        <img
          src={yoda3}
          className="w-[600px] h-[800px] transition-transform duration-500 ease-in-out transform group-hover:scale-110 object-contain"
        />
      </div>
    </div>
  );
}
