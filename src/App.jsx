import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./screens/home/Home";
import Details from "./screens/details/Details";
import OtpBefore from "./screens/otpBefore/OtpBefore";
import Result from "./screens/result/Result";
import PrivateRouteUser from "./components/privateRouteUser/PrivateRouteUser";
import PhoneNumber from "./screens/phoneNumber/PhoneNumber";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRouteUser />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Details />} />
        <Route path="/signup" element={<PhoneNumber />} />
        <Route path="/verify" element={<OtpBefore />} />
        <Route path="/gallery" element={<Result />} />
      </Route>
    </>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
