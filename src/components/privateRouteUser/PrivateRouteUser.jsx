import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getWithExpiry } from "../../utils/localstorage";

const PrivateRouteUser = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const userValue = getWithExpiry("phnNo");
    const currentPath = location.pathname;
    if (userValue) {
      navigate("/gallery");
    } else {
      navigate("/");
    }
  }, []);

  return children ? children : <Outlet />;
};

export default PrivateRouteUser;
