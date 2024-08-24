import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import Back from "../../components/back/Back";

function Details() {
  const [fname, setFName] = useState("");
  const [phnNo, setPhnNo] = useState("");
  const navigate = useNavigate();

  const handleInput = (key, e) => {
    const value = e.target.value;
    if (key == "fName") {
      setFName(value);
    }
    if (key == "phnNo") {
      setPhnNo(value);
    }
  };
  const handleSubmit = () => {
    navigate("/verify");
  };
  return (
    <div className="row full-height">
      <Navbar />
      <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
        <Back />
        <div className="pt-4">
          <h3 className="text-white miama-font fs-1">Fill the details</h3>
        </div>
        <div>
          <h6 className="text-white poppins-light lh-base">
            One step You are almost there.....
          </h6>
        </div>
        <div className="pt-3">
          <input
            type="text"
            className="border-bottom-line text-white poppins-light"
            placeholder="First Name"
            onChange={(e) => handleInput("fName", e)}
            value={fname}
          />
        </div>
        <div className="pt-3">
          <input
            type="text"
            className="border-bottom-line text-white poppins-light"
            placeholder="Phone Number"
            onChange={(e) => handleInput("phnNo", e)}
            value={phnNo}
          />
        </div>
        <div className="py-3">
          <button
            className="bg-white py-3 px-5 text-black border  poppins-light rounded-0"
            onClick={handleSubmit}
          >
            Verify with OTP <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
