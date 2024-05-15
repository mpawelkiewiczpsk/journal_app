import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root.tsx";
import Home from './views/Home';
import PriceList from './views/PriceList';
import Login from './views/Login';
import ErrorPage from './views/ErrorPage';



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "price-list",
                element: <PriceList />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login/>,
    },
]);



const App: React.FC = () => {


    return (
        <RouterProvider router={router} />
    );
};

export default App;
