import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithnavigate from "./auth/Auth0ProviderWithnavigate";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "../src/store/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Auth0ProviderWithnavigate>
            <AppRoutes />
            <Toaster visibleToasts={1} position="top-right" richColors />
          </Auth0ProviderWithnavigate>
        </QueryClientProvider>
      </Router>
    </Provider>
  </StrictMode>
);
