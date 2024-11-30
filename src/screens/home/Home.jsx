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
import ValidEventId from "../../api/validEventId/ValidEventId";
import GetEventDetails from "../../api/getEventDetails/GetEventDetails";

function Home() {
  const { setFName, setLName, setEmail, setIsRegistered, setPhnNo } =
    useContext(DetailsContext);
  const [heading, setHeading] = useState(["A Celebration of Love"]);
  const [subHeading, setSubHeading] = useState(config_subheading);
  const [description, setDescription] = useState(config_description);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const eventID = getWithExpiry("eventID");

  const navigate = useNavigate();

  function splitHeading(heading, maxLength) {
    const words = heading.split(" ");
    const result = [];
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        result.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) {
      result.push(currentLine);
    }

    return result;
  }

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

  const fetchEvent = async (port) => {
    const eventDetails = await GetEventDetails(port);
    setHeading(splitHeading(eventDetails.main_heading, 21));
    setSubHeading(eventDetails.subheading);
    setDescription(eventDetails.description);
    setImages([eventDetails.cover_image]);
  };

  const fetchEventDetails = async (port) => {
    try {
      const res = await ValidEventId(port);
      setLoading(false);
      if (res.message == "Valid Api") {
        setWithExpiry("eventID", port, 86400000);
      } else {
        navigate("/404");
      }
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash != "") {
      fetchEventDetails(hash);
      fetchEvent(hash);
    } else if (eventID == null) {
      setLoading(false);
      navigate("/event-id");
    } else {
      fetchEvent(eventID);
      setLoading(false);
    }
  }, [navigate, eventID]);

  return (
    <div className="row full-height" id="belowroot">
      <Navbar showLogout={true} />
      {loading ? (
        <></>
      ) : (
        <>
          <Carousel images={images} />
          <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
            <div className="d-flex flex-column flex-md-row">
              {heading.length &&
                heading.map((head, index) => (
                  <h1
                    key={index}
                    className={`text-white miama-font ${
                      index === 0 ? "" : "pt-2"
                    }`}
                  >
                    {head}
                  </h1>
                ))}
            </div>

            <div className="pt-2">
              <h3 className="text-white poppins-light">{subHeading}</h3>
            </div>
            <div>
              <h6 className="text-white poppins-light lh-base">
                {description}{" "}
              </h6>
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
        </>
      )}
      <Footer loader={loading} />
    </div>
  );
}

export default Home;
