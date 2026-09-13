// @ts-nocheck

import { createElement } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Enquiries from "./pages/Enquiries";

function App() {
  return createElement(
    BrowserRouter,
    null,
    createElement(
      Routes,
      null,

      createElement(
        Route,
        {
          element: createElement(AdminLayout),
        },
        createElement(Route, {
          path: "/",
          element: createElement(AdminDashboard),
        }),

        createElement(Route, {
          path: "/enquiries",
          element: createElement(Enquiries),
        }),
      ),
    ),
  );
}

export default App;