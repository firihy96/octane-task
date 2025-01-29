import { useDarkMode } from "../customHooks";

function DarkModeToggle({ className }) {
  const [theme, setTheme] = useDarkMode();

  return (
    <button
      className={`px-6 py-2 w-40
        rounded-lg transition-all duration-300 bg-white text-gray-800 shadow-md ${className} `}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
export default DarkModeToggle;
