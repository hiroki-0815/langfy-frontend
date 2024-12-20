import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithnavigate from "./auth/Auth0ProviderWithnavigate";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Auth0ProviderWithnavigate>
        <AppRoutes />
      </Auth0ProviderWithnavigate>
    </Router>
  </StrictMode>
);
