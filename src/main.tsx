// Importing the StrictMode component from React, which helps identify potential problems in an application
import { StrictMode } from "react";

// Importing createRoot from the react-dom/client package, which is used to create a root for the React application
import { createRoot } from "react-dom/client";

// Importing the main App component from the App.tsx file
import App from "./App.tsx";

// Importing the global CSS styles from the index.css file
import "./index.css";

// Creating a root for the React application by selecting the DOM element with the ID 'root'
// The '!' after getElementById asserts that the element will not be null (TypeScript syntax)
createRoot(document.getElementById("root")!).render(
  // Wrapping the App component in StrictMode to enable additional checks and warnings for its descendants
  <StrictMode>
    <App /> {/* Rendering the main App component */}
  </StrictMode>
);
