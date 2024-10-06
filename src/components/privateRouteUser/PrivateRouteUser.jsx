import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getWithExpiry } from "../../utils/localstorage";

const PrivateRouteUser = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const userValue = getWithExpiry("phnNo");
    if (userValue) {
      navigate("/gallery", {
        state: { isRegistered: true },
      });
    } else {
      navigate("/");
    }
  }, []);

  return children ? children : <Outlet />;
};

export default PrivateRouteUser;
