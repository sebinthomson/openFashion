import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getWithExpiry } from "../../utils/localstorage";

const PrivateRouteUser = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const eventId = localStorage.getItem("eventID");
    console.log("eventId", eventId);
    if (eventId != null) {
      const userValue = getWithExpiry("phnNo");
      if (userValue) {
        navigate("/gallery");
      } else {
        navigate("/");
      }
    } else {
      navigate("/event-id");
    }
  }, []);

  return children ? children : <Outlet />;
};

export default PrivateRouteUser;
