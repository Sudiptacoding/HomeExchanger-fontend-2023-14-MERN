import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error/Error";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import AddService from "../pages/Addservices/AddService";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AllServices from "../pages/AllServices/AllServices";
import Myservices from "../pages/Myservices/Myservices";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import MyBookings from "../pages/MyBookings/MyBookings";
import MyPaindingWork from "../pages/MyPaindingWork/MyPaindingWork";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/registration",
                element: <Registration></Registration>,
            },
            {
                path: "/addservices",
                element: <ProtectedRoute><AddService></AddService></ProtectedRoute>,
            },
            {
                path: "/allservices",
                element: <ProtectedRoute><AllServices></AllServices></ProtectedRoute>,
            },
            {
                path: "/myservices",
                element: <ProtectedRoute><Myservices></Myservices></ProtectedRoute>,
            },
            {
                path: "/services/:id",
                element: <ProtectedRoute><ServiceDetails></ServiceDetails></ProtectedRoute>,
            },
            {
                path: "/mybookings",
                element: <ProtectedRoute><MyBookings></MyBookings></ProtectedRoute>,
            },
            {
                path: "/mypainding",
                element: <ProtectedRoute><MyPaindingWork></MyPaindingWork></ProtectedRoute>,
            },
        ],
    },
]);
export default router;