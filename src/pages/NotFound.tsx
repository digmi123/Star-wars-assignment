import darth_error from "@/assets/darth-vader-error.png";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src={darth_error} alt="error" className="w-32 h-32" />
      <h1>
        <span>404</span> - Page not found
      </h1>
      <h3>The page you were loking for does not exist.</h3>
    </div>
  );
}
