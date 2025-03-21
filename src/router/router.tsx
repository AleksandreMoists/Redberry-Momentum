// router.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CreateTaskPage from "../pages/CreateTask/CreateTask";
import Layout from "../components/Layout/Layout";
import TaskInnerPageContainer from "../pages/TaskInnerPage/TaskInnerPageContainer";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "task/:id",
        element: <TaskInnerPageContainer />,
      },
      {
        path: "create-task",
        element: <CreateTaskPage />,
      },
      {
        path: "*",
        element: <div>Page not found</div>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;