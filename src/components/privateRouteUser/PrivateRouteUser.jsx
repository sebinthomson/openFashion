import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getWithExpiry } from "../../utils/localstorage";
import { DetailsContext } from "../../contexts/DetailsContext";

const PrivateRouteUser = ({ children }) => {
  const { isRegistered } = useContext(DetailsContext);
  const navigate = useNavigate();
  useEffect(() => {
    const eventId = getWithExpiry("eventID");
    if (eventId != null) {
      const userValue = getWithExpiry("phnNo");
      if (userValue) {
        navigate("/gallery");
      } else {
        if (isRegistered == null) {
          navigate("/");
        }
      }
    } else {
      navigate("/event-id");
    }
  }, []);

  return children ? children : <Outlet />;
};

export default PrivateRouteUser;
