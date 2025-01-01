import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DetailsProvider } from "./contexts/DetailsContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <DetailsProvider>
      <App />
    </DetailsProvider>
  // </StrictMode>
);
