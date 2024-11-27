import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./screens/home/Home";
import Details from "./screens/details/Details";
import Result from "./screens/result/Result";
import PrivateRouteUser from "./components/privateRouteUser/PrivateRouteUser";
import PortNumber from "./screens/portNumber/PortNumber";
import ErrorPage from "./screens/errorPage/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<Home />} />
      <Route element={<PrivateRouteUser />}>
        <Route path="/event-id" element={<PortNumber />} />
        <Route path="/register" element={<Details />} />
        <Route path="/gallery" element={<Result />} />
      </Route>
      <Route path="/404" element={<ErrorPage />} />
    </>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
