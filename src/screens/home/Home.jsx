import { useNavigate } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import {
  config_heading,
  config_subheading,
  config_description,
} from "../../../config";

function Home() {
  const [heading, setHeading] = useState(config_heading);
  const [subHeading, setSubHeading] = useState(config_subheading);
  const [description, setDescription] = useState(config_description);

  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="row full-height" id="belowroot">
      <Navbar />
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
            className="bg-white py-3 px-5 text-black border  poppins-light rounded-0"
            onClick={handleRegister}
          >
            Register for images
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
