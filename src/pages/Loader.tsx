import darth_error from "@/assets/darth-vader-error.png";

export default function Loader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src={darth_error} alt="error" className="w-32 h-32" />
      <h1> Loading...</h1>
    </div>
  );
}
