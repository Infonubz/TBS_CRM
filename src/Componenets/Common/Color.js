import { useEffect, useState } from "react";

// Custom hook to get the color from sessionStorage
const useColor = () => {
  const [currentColor, setCurrentColor] = useState("");

  useEffect(() => {
    setCurrentColor(sessionStorage.getItem("color") || "");
  }, []); // Dependency array should be empty because sessionStorage.getItem does not change reactively.

  return currentColor;
};

// Exporting COLORS object
export const COLORS = {
  primary: useColor(), // This won't work directly because hooks must be used inside components
  secondary: "#2ecc71",
};
