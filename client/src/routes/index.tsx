import { createBrowserRouter } from "react-router-dom";
import { Register } from "~/pages";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Register />,
  },
]);

export default router;
