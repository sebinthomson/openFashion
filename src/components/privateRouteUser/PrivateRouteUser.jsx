import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PrivateRouteUser = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const userValue = localStorage.getItem("mNumber");
    const currentPath = location.pathname;
    if (userValue) {
      navigate("/gallery");
    } else {
      if (currentPath == "/gallery") {
        navigate("/");
      } else {
        navigate(currentPath);
      }
    }
  }, []);

  return children ? children : <Outlet />;
};

export default PrivateRouteUser;
