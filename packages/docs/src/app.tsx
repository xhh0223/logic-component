import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";

import { Router } from "@src/router";
import "./app.scss";

const App = () => {
  return (
    <ConfigProvider>
      <RouterProvider router={Router} />
    </ConfigProvider>
  );
};
createRoot(document.getElementById("app")).render(<App />);
