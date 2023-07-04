import { createHashRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./app.css";
import { lazy, Suspense } from "react";
const modules = import.meta.glob("./components/**/*.tsx");
const components = Object.entries(modules)
    .filter(([path]) => {
        return path.includes("demo");
    })
    .map(([path, page]: [string, any]) => {
        const ComponentName = `/${path.split("/")[2].toLocaleLowerCase()}`;
        const Component = lazy(page);
        return {
            path: ComponentName,
            element: <Component />,
        };
    });
const router = createHashRouter(components);
export function App() {
    return (
        <Suspense>
            <RouterProvider router={router} />
        </Suspense>
    );
}
const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
