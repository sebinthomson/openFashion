import { useContext, useEffect, useRef, useState } from "react";
import "react-phone-input-2/lib/style.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Back from "../../components/back/Back";
import { DetailsContext } from "../../contexts/DetailsContext";
import SignInButton from "../../otpService/OtpService";
import { useLocation, useNavigate } from "react-router-dom";
import { config_termsconditions } from "../../../config";
function Details() {
  const { fname, lname, email, img, setImg, setFName, setLName, setEmail } =
    useContext(DetailsContext);
  const [errors, setErrors] = useState({});
  const [uploadMsg, setUploadMsg] = useState("");
  const modalRef = useRef(null);
  const [tAndC] = useState(config_termsconditions);
  const navigate = useNavigate();
  const location = useLocation();

  const phnNo = location.state?.phnNo || false;

  const handleInput = (key, e) => {
    const value = e.target.value;
    if (key === "fName") {
      setFName(value);
      if (!value) {
        setErrors((prev) => ({ ...prev, fName: "First name is required" }));
      } else {
        setErrors((prev) => ({ ...prev, fName: "" }));
      }
    }
    if (key === "lName") {
      setLName(value);
      if (!value) {
        setErrors((prev) => ({ ...prev, lName: "Last name is required" }));
      } else {
        setErrors((prev) => ({ ...prev, lName: "" }));
      }
    }
    if (key === "email") {
      setEmail(value);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (modalRef.current) {
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fname) newErrors.fName = "First name is required";
    if (!lname) newErrors.lName = "Last name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = "Invalid email address";
    if (!img) newErrors.image = "Image not uploaded";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFileName = () => {
    const fileInput = document.getElementById("fileInput");
    const fileLabel = document.getElementById("fileLabel");

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      fileLabel.textContent = file.name;
      setImg(file);
      setUploadMsg("Image uploaded");
      let newErrors = errors;
      if (newErrors.image) {
        newErrors.image = "";
      }
      setErrors(newErrors);
    } else {
      fileLabel.textContent = "Attach your file here";
      setImg(null);
    }
  };

  useEffect(() => {
    if (!phnNo) navigate("/");
  }, [phnNo]);

  const handleAccept = () => {
    navigate("/verify", { state: { details: {}, isRegistered: false } });
  };

  return (
    <div className="row full-height" id="belowroot">
      <Navbar />
      <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
        <Back page={"register"} />
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
            className={`border-bottom-line text-white poppins-light ${
              errors.fName ? "is-invalid" : ""
            }`}
            placeholder="First Name"
            onChange={(e) => handleInput("fName", e)}
            value={fname}
          />
          {errors.fName && <div className="text-danger">{errors.fName}</div>}
        </div>
        <div className="pt-3">
          <input
            type="text"
            className={`border-bottom-line text-white poppins-light ${
              errors.lName ? "is-invalid" : ""
            }`}
            placeholder="Last Name"
            onChange={(e) => handleInput("lName", e)}
            value={lname}
          />
          {errors.lName && <div className="text-danger">{errors.lName}</div>}
        </div>
        <div className="pt-3">
          <input
            type="email"
            className={`border-bottom-line text-white poppins-light ${
              errors.email ? "is-invalid" : ""
            }`}
            placeholder="Email"
            onChange={(e) => handleInput("email", e)}
            value={email}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="pt-3">
          <label
            htmlFor="fileInput"
            className="file-label poppins-light bg-black py-3 px-5 border border-light-subtle text-center fst-italic w-100"
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              id="fileInput"
              className="file-input d-none"
              accept=".jpg, .jpeg"
              onChange={updateFileName}
            />
            <span id="fileLabel">Attach your file here</span>
          </label>
          {errors.image && <div className="text-danger">{errors.image}</div>}
          {uploadMsg.length ? (
            <div className="text-white">{uploadMsg}</div>
          ) : (
            <></>
          )}
        </div>
        <div className="pb-3 pt-5">
          <button
            className="bg-white py-3 px-5 text-black border poppins-light rounded-0"
            onClick={handleSubmit}
          >
            {/* Verify with OTP <i className="bi bi-arrow-right"></i> */}
            Submit
          </button>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        ref={modalRef} // Add ref to modal
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-white rounded-0 modal-properties">
            <div className="modal-header justify-content-center">
              <h1
                className="modal-title fs-3 miama-font text-nowrap"
                id="staticBackdropLabel"
              >
                Terms & Conditions
              </h1>
            </div>
            <div className="modal-body fixed-height">
              <ol className="list-group list-group-numbered">
                {tAndC.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item fs-6 poppins-light px-2 lh-base border-0"
                  >
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <div className="modal-footer text-center justify-content-center d-flex row mx-3">
              <button
                className="py-2 poppins-light border-1 bg-black text-white"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleAccept();
                }}
              >
                Accept
              </button>
              <button
                className="py-2 poppins-light border-1 bg-white"
                data-bs-dismiss="modal"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
      <SignInButton />
      <Footer />
    </div>
  );
}

export default Details;
