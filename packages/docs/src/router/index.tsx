import { Suspense, lazy } from "react";
import { createHashRouter as createRouter } from "react-router-dom";
import { Spin } from "antd";

const wrapLoading = (importComponent) => {
  const LazyComponent = lazy(importComponent);
  return (
    <Suspense fallback={<Spin style={{ width: "100vh", height: "100vh" }} />}>
      <LazyComponent />
    </Suspense>
  );
};

// @ts-ignore
const demoInfo = Object.entries(import.meta.glob("@src/demo/*/index.tsx")).map(
  ([path, importComponent]) => {
    const routePath = path.split(/[/\/]/).at(-2);
    return {
      path: routePath,
      // @ts-ignore
      element: wrapLoading(importComponent),
    };
  }
);

export const Router = createRouter([
  {
    path: "/",
    element: wrapLoading(() => import("@src/page/index")),
    children: [
      ...demoInfo.map((i) => ({
        path: i.path,
        element: i.element,
      })),
    ],
  },
]);
