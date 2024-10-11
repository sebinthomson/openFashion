import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Back from "../../components/back/Back";
import { useNavigate } from "react-router-dom";
import { getWithExpiry } from "../../utils/localstorage";
import ValidEventId from "../../api/validEventId/ValidEventId";

export const portno = "8122"

function PortNumber() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [port, setPort] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (key, e) => {
    const value = e.target.value;
    if (key === "phnNo") {
      setPort(value);
      if (value.length == 0) {
        setError((prev) => ({ ...prev, phnNo: "Event ID is required" }));
      } else {
        setError((prev) => ({ ...prev, phnNo: "" }));
      }
    }
  };
  const handleSubmit = () => {
    if (validateForm()) {
      fetchEventDetails();
    }
  };

  // const fetchEventDetails = () => {
  //   try {
  //     if (port == eventId) {
  //       localStorage.setItem("eventID", port);
  //       const phoneNumber = getWithExpiry("phnNo");
  //       if (phoneNumber != null) {
  //         navigate("/gallery");
  //       } else {
  //         navigate("/");
  //       }
  //     } else {
  //       setError("Invalid Event ID");
  //     }
  //   } catch (error) {
  //     console.info(error);
  //   }
  // };

  const fetchEventDetails = () => {
    try {
      setLoading(true);
      const res = ValidEventId(port);
      if (res.message == "Valid Api") {
        localStorage.getItem("eventID", port);
      }
      setLoading(false);
    } catch (error) {
      console.info(error);
    }
  };

  const validateForm = () => {
    if (port.length == 0) {
      setError("Event ID is required");
    }
    return port.length != 0;
  };

  return (
    <div className="row full-height" id="belowroot">
      <Navbar />
      <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
        <Back page={"/"} />
        <div className="pt-4">
          <h3 className="text-white miama-font fs-1">Event ID</h3>
        </div>
        <div>
          <h6 className="text-white poppins-light lh-base">
            Enter your event ID.....
          </h6>
        </div>
        <div className="input-group flex-nowrap pt-3 d-flex flex-column">
          <div className="d-flex">
            <ul
              className="dropdown-menu bg-dark text-secondary poppins-light"
              style={{ maxHeight: "250px", overflowY: "auto" }}
            ></ul>
            <input
              type="number"
              className={`border-bottom-line text-white poppins-light ${
                error ? "is-invalid" : ""
              }`}
              placeholder="Event ID"
              onChange={(e) => handleInput("phnNo", e)}
              value={port}
            />
          </div>
          {error.length ? <div className="text-danger">{error}</div> : <></>}
        </div>
        <div className="pb-3 pt-5 d-flex align-items-center">
          <div>
            <button
              className="bg-white py-3 px-5 text-black border poppins-light rounded-0"
              onClick={handleSubmit}
            >
              submit<i className="bi bi-arrow-right"></i>{" "}
            </button>
          </div>
          {loading ? (
            <div className="spinner-border ms-4 text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PortNumber;
