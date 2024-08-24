import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./screens/home/Home";
import Details from "./screens/details/Details";
import OtpBefore from "./screens/otpBefore/OtpBefore";
import ImageBeforeUpload from "./screens/imageBeforeUpload/ImageBeforeUpload";
import Result from "./screens/result/Result";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Details />} />
      <Route path="/verify" element={<OtpBefore />} />
      <Route path="/img-upload" element={<ImageBeforeUpload />} />
      <Route path="/gallery" element={<Result />} />
    </>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
