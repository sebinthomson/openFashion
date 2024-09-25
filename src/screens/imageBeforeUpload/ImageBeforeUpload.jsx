import { useState, useRef, useContext } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Back from "../../components/back/Back";
import { useNavigate } from "react-router-dom";
import { config_termsconditions } from "../../../config";
import UploadApi from "../../api/upload/Upload";
import { DetailsContext } from "../../contexts/DetailsContext";

function ImageBeforeUpload() {
  const { fname, lname, phnNo, email } = useContext(DetailsContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const modalRef = useRef(null);

  const [tAndC] = useState(config_termsconditions);

  const updateFileName = () => {
    const fileInput = document.getElementById("fileInput");
    const fileLabel = document.getElementById("fileLabel");

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      fileLabel.textContent = file.name;
      setImg(file);
      setErrorMessage("");
      setUploadMessage("Image Uploaded");
    } else {
      fileLabel.textContent = "Attach your file here";
      setImg(null);
    }
  };

  const handleSubmit = () => {
    if (!img) {
      setErrorMessage("Please upload an image before submitting.");
    } else {
      setErrorMessage("");
      if (modalRef.current) {
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
      }
    }
  };

  const handleAccept = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", fname);
      formData.append("lastName", lname);
      formData.append("mobileNumber", phnNo);
      formData.append("email", email);
      formData.append("imageFile", img);
      const res = await UploadApi(formData);
      if (res?.error) {
        console.log(res.error);
      } else {
        localStorage.setItem("mNumber", phnNo);
        navigate("/gallery");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row full-height" id="belowroot">
      <Navbar />
      <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
        <Back page={"img-upload"} />
        {!loading ? (
          <>
            <div className="pt-4">
              <h3 className="text-white miama-font fs-1">Upload your image</h3>
            </div>
            <div>
              <h6 className="text-white poppins-light lh-base">
                This helps to find all your shots
              </h6>
            </div>
            <div className="">
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
            </div>
            {errorMessage && (
              <div className="text-danger mt-2">{errorMessage}</div>
            )}
            {uploadMessage && (
              <div className="text-white mt-2">{uploadMessage}</div>
            )}
            <div className="pb-3 pt-5">
              <button
                className="bg-white py-3 px-5 text-black border poppins-light rounded-0"
                type="button"
                onClick={handleSubmit}
              >
                {img ? "Search Images" : "Submit"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="pt-4">
              <h3 className="text-white miama-font fs-1">Searching......</h3>
            </div>
            <div>
              <h6 className="text-white poppins-light lh-base">
                Fetching Your Result
              </h6>
            </div>
            <div className="ps-2"> </div>
            <div className="container">
              <div className="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
              </div>
            </div>
            <div className="bg-black" style={{ height: "45px" }}></div>
          </>
        )}
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

      <Footer value={loading} />
    </div>
  );
}

export default ImageBeforeUpload;
