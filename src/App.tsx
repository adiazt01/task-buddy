import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./layouts/Layout";
import { ProjectPage } from "./pages/ProjectPage";
import { Notes } from "./pages/Notes";
import { Projects } from "./pages/Projects";
import { Landing } from "./pages/Landing";

export const routes = [
  {
    path: "/",
    element: <Layout children={<Landing />} />,
  },
  {
    path: "/app",
    element: <Layout children={<Dashboard />} />,
  },
  {
    path: "/app/projects",
    element: <Layout children={<Projects />} />,
  },
  {
    path: "/app/projects/:id",
    element: <Layout children={<ProjectPage />} />,
  },
  {
    path: "/app/notes",
    element: <Layout children={<Notes />} />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
