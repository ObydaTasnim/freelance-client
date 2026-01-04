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
import About from "../pages/About";
import Contact from "../pages/Contact";
import ErrorPage from "../components/shared/ErrorPage";
import NotFound from "../pages/NotFound";
import MyProfile from "../pages/MyProfile";

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

      // 🔒 Private Routes
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
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

      // 🌐 Public Routes
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // 🚫 404 Not Found Route
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
