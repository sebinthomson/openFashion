import { useNavigate } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import {
  config_heading,
  config_subheading,
  config_description,
} from "../../../config";
import { useGoogleLogin } from "@react-oauth/google";
import { DetailsContext } from "../../contexts/DetailsContext";
import RegistrationDetailsApi from "../../api/registrationDetails/RegistrationDetails";
import { getWithExpiry, setWithExpiry } from "../../utils/localstorage";

function Home() {
  const { setFName, setLName, setEmail, setIsRegistered, setPhnNo } =
    useContext(DetailsContext);
  const [heading, setHeading] = useState(config_heading);
  const [subHeading, setSubHeading] = useState(config_subheading);
  const [description, setDescription] = useState(config_description);
  const [error, setError] = useState("");
  const eventID = getWithExpiry("eventID");

  const navigate = useNavigate();

  const handleRegister = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const accessToken = credentialResponse.access_token;
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const profileData = await response.json();
        const userEmail = profileData?.email;
        const firstName = profileData?.given_name;
        const lastName = profileData?.family_name || "";
        setEmail(userEmail);
        setFName(firstName);
        setLName(lastName);
        const reg_details = await RegistrationDetailsApi(eventID, userEmail);
        if (reg_details?.error == "Registration not found") {
          setIsRegistered(false);
          navigate("/register");
        } else if (reg_details?.mobile_number) {
          setPhnNo(reg_details.mobile_number);
          setIsRegistered(true);
          navigate("/gallery");
        } else {
          setError("Authentication Failed");
        }
      } catch (error) {
        console.error("Failed to fetch user profile info:", error);
      }
    },
    onError: () => {
      setError("Authentication Failed");
    },
  });

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash != "") {
      setWithExpiry("eventID", hash, 86400000);
    } else if (eventID == null) {
      navigate("/event-id");
    }
  }, [navigate, eventID]);

  return (
    <div className="row full-height" id="belowroot">
      <Navbar showLogout={true} />
      <Carousel />
      <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
        <div className="d-flex flex-column flex-md-row">
          <h1 className="text-white miama-font">{heading[0]}</h1>
          <h1 className="text-white miama-font pt-2">{heading[1]}</h1>
        </div>
        <div className="pt-2">
          <h3 className="text-white poppins-light">{subHeading}</h3>
        </div>
        <div>
          <h6 className="text-white poppins-light lh-base">{description} </h6>
        </div>
        <div className="py-3">
          <button
            className="bg-white py-3 px-5 text-black border poppins-light rounded-0"
            onClick={handleRegister}
          >
            Register for images
          </button>
        </div>
        {error && <div className="text-danger">{error}</div>}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
