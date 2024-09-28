import dark from "@/assets/darth-vader.png";
import yoda from "@/assets/yoda.png";
import { Theme, useTheme } from "@/providers/ThemeProvider";
import { useEffect, useRef, useState } from "react";

export default function Launch() {
  const { theme, setTheme } = useTheme();
  const currentTheme = localStorage.getItem("vite-ui-theme");
  const [showPicker, setShowPicker] = useState(currentTheme ? false : true);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const yodaRef = useRef<HTMLDivElement | null>(null);
  const darthVaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    wrapperRef.current?.addEventListener("animationend", () => {
      if (theme !== "system") setShowPicker(false);
    });
  }, [theme]);

  const handlePick = (theme: Theme) => {
    setTheme(theme);
    yodaRef.current?.classList.remove("animate-fade-in-right");
    yodaRef.current?.classList.add("animate-fade-out-right");

    darthVaderRef.current?.classList.remove("animate-fade-in-right");
    darthVaderRef.current?.classList.add("animate-fade-out-left");
  };

  if (!showPicker) return;

  return (
    <div
      className="flex items-center h-screen w-screen justify-between absolute top-0"
      ref={wrapperRef}
    >
      <div
        className="dark h-screen w-[50%] p-4 cursor-pointer bg-background flex flex-col animate-fade-in-left fill-mode-forwards group"
        onClick={() => handlePick("dark")}
        ref={darthVaderRef}
      >
        <div className="h-[var(--launch-text-height)]">
          <h2 className="font-bold text-foreground uppercase text-center">
            Dark mode
          </h2>
        </div>
        <div className="h-[calc(100%-var(--launch-text-height))] flex items-center">
          <img
            src={dark}
            className="max-w-full max-h-full scale-90 transition-transform duration-500 ease-in-out transform group-hover:scale-100 object-contain"
          />
        </div>
      </div>
      <div
        className="light h-screen w-[50%] p-4 cursor-pointer bg-background flex flex-col animate-fade-in-right fill-mode-forwards group"
        onClick={() => handlePick("light")}
        ref={yodaRef}
      >
        <div className="h-[var(--launch-text-height)]">
          <h2 className="font-bold text-foreground uppercase text-center">
            light mode
          </h2>
        </div>
        <div className="h-[calc(100%-var(--launch-text-height))] flex items-center">
          <img
            src={yoda}
            className="w-max-w-full max-h-full scale-90 transition-transform duration-500 ease-in-out transform group-hover:scale-100 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
