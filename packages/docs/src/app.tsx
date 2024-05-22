import "./app.scss";

import { Router } from "@src/router";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <ConfigProvider>
      <RouterProvider router={Router} />
    </ConfigProvider>
  );
};
createRoot(document.getElementById("app")).render(<App />);
