import { createHashRouter, RouterProvider } from "react-router-dom";
import "./app.css";
import { lazy } from "react";
const modules = import.meta.glob("./components/**/*.tsx");
const components = Object.entries(modules).map(
    ([path, page]: [string, any]) => {
        const Component = lazy(page);
        return {
            path: "/" + path.split("/")[2].toLocaleLowerCase(),
            element: <Component />,
        };
    }
);
const router = createHashRouter(components);
export function App() {
    return <RouterProvider router={router} />;
}
