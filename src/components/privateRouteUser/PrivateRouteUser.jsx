import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getWithExpiry } from "../../utils/localstorage";

const PrivateRouteUser = ({ children }) => {
  const port = import.meta.env.VITE_EVENT_ID;
  const navigate = useNavigate();
  useEffect(() => {
    const eventId = localStorage.getItem("eventID");
    if (eventId != null) {
      if (eventId == port) {
        const userValue = getWithExpiry("phnNo");
        if (userValue) {
          navigate("/gallery");
        } else {
          navigate("/");
        }
      } else {
        navigate("/event-id");
      }
    } else {
      navigate("/event-id");
    }
  }, []);

  return children ? children : <Outlet />;
};

export default PrivateRouteUser;
