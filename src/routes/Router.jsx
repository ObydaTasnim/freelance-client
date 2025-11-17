import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

// Pages
import Home from "../pages/Home";
import AllJobs from "../pages/AllJobs";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import MyAddedJobs from "../pages/MyAddedJobs";
import UpdateJob from "../pages/UpdateJob";
import MyAcceptedTasks from "../pages/MyAcceptedTasks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../components/shared/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
      },
      {
        path: "all-jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "add-job",
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-jobs",
        element: (
          <PrivateRoute>
            <MyAddedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "update-job/:id",
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "my-accepted-tasks",
        element: (
          <PrivateRoute>
            <MyAcceptedTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
