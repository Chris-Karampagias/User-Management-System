import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { AuthenticationChecker } from "./components";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="md" sx={{ padding: "40px 5px" }}>
        <Provider store={store}>
          <AuthenticationChecker>
            <RouterProvider router={router} />
          </AuthenticationChecker>
        </Provider>
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
