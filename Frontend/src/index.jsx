import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./Error";

const index = () => {
  return (
    <React.StrictMode>
      <Outlet />
    </React.StrictMode>
  );
};
const appLayout = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appLayout} />
);
