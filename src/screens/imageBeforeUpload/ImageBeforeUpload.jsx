import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Back from "../../components/back/Back";
import { useNavigate } from "react-router-dom";

function ImageBeforeUpload() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tAndC] = useState([
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit amet consectetur.",
  ]);

  const updateFileName = () => {
    const fileInput = document.getElementById("fileInput");
    const fileLabel = document.getElementById("fileLabel");

    if (fileInput.files.length > 0) {
      fileLabel.textContent = fileInput.files[0].name;
    } else {
      fileLabel.textContent = "Attach your file here";
    }
  };

  return (
    <div className="row full-height">
      <Navbar />
      <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
        <Back prevCount={-2} />
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
                  onChange={updateFileName}
                />
                <span id="fileLabel">Attach your file here</span>
              </label>
            </div>
            <div className="py-3">
              <button
                className="bg-white py-3 px-5 text-black border poppins-light rounded-0"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Submit
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
>
  <div className="modal-dialog modal-dialog-centered modal-lg"> {/* Adjusted width to 'modal-lg' */}
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
            setLoading(true);
            setTimeout(() => {
              navigate("/gallery");
            }, 4000);
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

      <Footer />
    </div>
  );
}

export default ImageBeforeUpload;
