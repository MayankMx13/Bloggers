import Layout from "./routes/layout";

import HomePage from "./components/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/login";
import SinglePage from "./components/singlePage";
import Author from "./components/author";
import Register from "./components/Register";
import ForgotPassword from "./components/forgotPassword";
import SearchResults from "./components/searchResult";
import Blogall from "./components/blogall";
import NewPostPage from "./components/NewPostPage";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HomePage />

            </>

          ),
        }, {
          path: "singlePost/:id",
          element: (
            <>
              <SinglePage />

            </>

          )
        },
        {
          path: "/authorpage",
          element: <Author />,
          children: [
            {
              path: "createpost",
              element: <NewPostPage />,
            },
          ],


        }, {
          path: "/search-results",
          element: (
            <>
              <SearchResults />

            </>
          )
        }, {
          path: "/blogall",
          element: <Blogall />
        }
      ],


    },
    {
      path: "/login",
      element: <Login />,



    }, {
      path: "/register",
      element: <Register />
    }, {
      path: "/forgotPass",
      element: <ForgotPassword />
    }

  ]
  );


  return <RouterProvider router={router} />;
}

export default App
