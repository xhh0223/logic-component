import { Path } from "@/constants/path";
import Index from "@/pages/Index";

import { useRoutes } from "react-router-dom";

export const Routes = () =>
    useRoutes([
        {
            path: Path.Root,
            element: <Index />,
        },
        {
            path: Path.Index,
            element: <Index />,
        },
        // {
        //     path: Path.Demo1,
        //     element: <Demo1 />,
        // },
    ]);
