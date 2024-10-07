import { useContext, useEffect, useState } from "react";
import Back from "../../components/back/Back";
import Footer from "../../components/footer/Footer";
import CustomImageList from "../../components/ImageList/ImageList";
import Navbar from "../../components/navbar/Navbar";
import DetectedFaceApi from "../../api/detectedFace/DetectedFace";
import UploadApi from "../../api/upload/Upload";
import { getWithExpiry, setWithExpiry } from "../../utils/localstorage";
import { Modal } from "bootstrap";
import axios from "axios";
import { DetailsContext } from "../../contexts/DetailsContext";
import { useNavigate } from "react-router-dom";

import JSZip from "jszip";
import { saveAs } from "file-saver";

function Result() {
  const { fname, lname, isRegistered, phnNo, email, img } =
    useContext(DetailsContext);
  const [selectedImagesIndex, setSelectedImagesIndex] = useState([]);
  const [detectedImages, setDetectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(true);
  const [downloadedCount, setDownloadedCount] = useState(0);

  const navigate = useNavigate();

  // const handleDownload = async () => {
  //   try {
  //     setDownloadLoading(true);

  //     const modalElement = document.getElementById("staticBackdrop");
  //     const modal = new Modal(modalElement);
  //     modal.show();
  //     for (let index = 0; index < selectedImagesIndex.length; index++) {
  //       if (!isDownloading) {
  //         break;
  //       }
  //       const imageUrl = selectedImagesIndex[index];
  //       const response = await axios.get(imageUrl, {
  //         responseType: "blob",
  //       });

  //       const imageBlob = new Blob([response.data]);
  //       const tempUrl = window.URL.createObjectURL(imageBlob);
  //       const link = document.createElement("a");
  //       link.href = tempUrl;
  //       link.setAttribute("download", `image_${index + 1}.jpg`);
  //       document.body.appendChild(link);
  //       link.click();
  //       window.URL.revokeObjectURL(tempUrl);
  //       link.remove();

  //       await new Promise((resolve) => setTimeout(resolve, 100));
  //       setDownloadedCount(index + 1);
  //     }

  //     setDownloadLoading(false);
  //     setIsDownloading(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDownload = async () => {
    try {
      setDownloadLoading(true);

      const modalElement = document.getElementById("staticBackdrop");
      const modal = new Modal(modalElement);
      modal.show();

      const zip = new JSZip();
      for (let index = 0; index < selectedImagesIndex.length; index++) {
        const imageUrl = selectedImagesIndex[index];
        const response = await axios.get(imageUrl, {
          responseType: "blob",
        });

        const imageBlob = new Blob([response.data]);
        zip.file(`image_${index + 1}.jpg`, imageBlob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "images.zip");

      setDownloadLoading(false);
      setIsDownloading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchImages = async (phnNo) => {
    setLoading(true);
    const res = await DetectedFaceApi(phnNo);
    setDetectedImages(res);
    setLoading(false);
  };

  const handleUploadApi = async (formData, phnNo) => {
    try {
      const res = await UploadApi(formData);
      if (
        res.message == "File successfully uploaded" ||
        res.message == "Mobile number already registered"
      ) {
        setWithExpiry("phnNo", phnNo, 86400000);
        fetchImages(phnNo);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.info(error);
    }
  };

  const handleCancelDownload = () => {
    if (downloadLoading) setIsDownloading(false);
  };

  useEffect(() => {
    if (isRegistered == false || isRegistered == true) {
      if (!isRegistered) {
        if (fname && lname && email && img && phnNo) {
          const formData = new FormData();
          formData.append("firstName", fname);
          formData.append("lastName", lname);
          formData.append("mobileNumber", phnNo);
          formData.append("email", email);
          formData.append("imageFile", img);
          handleUploadApi(formData, phnNo);
        }
      } else {
        if (phnNo) {
          setWithExpiry("phnNo", phnNo, 86400000);
          fetchImages(phnNo);
        }
      }
    } else {
      const phnNoLS = getWithExpiry("phnNo");
      if (phnNoLS != null) {
        fetchImages(phnNoLS);
      } else {
        navigate("/");
      }
    }
  }, [phnNo]);

  return (
    <div className="row full-height" id="belowroot">
      <Navbar />
      <div
        className="row w-100 bg-black px-3 py-4 gap-2 m-0"
        // style={{ maxWidth: "100vw" }}
      >
        <Back page={"/"} />
        {loading ? (
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
        ) : (
          <>
            <div className="pt-4 d-flex justify-content-between ">
              <div>
                <h3 className="text-white miama-font fs-1">Your result</h3>
              </div>
              <div>
                <select name="" id="" className="py-2 px-1 poppins-light">
                  <option value="">individuals</option>
                  <option value="">group</option>
                </select>
              </div>
            </div>
            <div className="pt-4 height-auto">
              <CustomImageList
                selectedImagesIndex={selectedImagesIndex}
                detectedImages={detectedImages}
                setSelectedImagesIndex={setSelectedImagesIndex}
                setDetectedImages={setDetectedImages}
                setLoading={setLoading}
              />
            </div>
            <div className="py-3 d-flex justify-content-center">
              {selectedImagesIndex.length != 0 && (
                <button
                  className="bg-white  px-5 py-3 text-black border  poppins-light rounded-0"
                  onClick={handleDownload}
                >
                  Download
                </button>
              )}
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-white rounded-0 modal-properties">
            <div className="modal-body">
              <div className="d-flex justify-content-center pb-4 pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 97.58 115.84"
                  height="80"
                  width="80"
                >
                  <defs>
                    <style>
                      {`.cls-1, .cls-2 {fill: none; stroke: #000; stroke-linecap: round; stroke-width: 4.5px;}
              .cls-1 {stroke-miterlimit: 10;}
              .cls-2 {stroke-linejoin: round;}`}
                    </style>
                  </defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_19" data-name="Layer 19">
                      <path d="M20.06,24.64a8.34,8.34,0,0,1-5.92-2.44,8.2,8.2,0,0,1-2.45-5.88,1.11,1.11,0,0,0-2.21,0A8.2,8.2,0,0,1,7,22.2,8.37,8.37,0,0,1,1.1,24.64a1.11,1.11,0,0,0,0,2.21,8.37,8.37,0,0,1,8.38,8.34,1.11,1.11,0,0,0,2.21,0,8.36,8.36,0,0,1,8.37-8.34,1.11,1.11,0,1,0,0-2.21ZM10.58,30.5a10.6,10.6,0,0,0-4.75-4.75,10.62,10.62,0,0,0,2.75-2,10.25,10.25,0,0,0,2-2.75,10.68,10.68,0,0,0,4.76,4.73A10.62,10.62,0,0,0,10.58,30.5Z" />
                      <path d="M91.45,19.48a6.28,6.28,0,0,1-6.3-6.25,1.18,1.18,0,0,0-2.36,0,6.28,6.28,0,0,1-6.3,6.25,1.18,1.18,0,1,0,0,2.36,6.29,6.29,0,0,1,6.3,6.27,1.18,1.18,0,0,0,2.36,0,6.3,6.3,0,0,1,6.3-6.27,1.18,1.18,0,0,0,0-2.36ZM84,23.77a8.82,8.82,0,0,0-3.11-3.11A8.61,8.61,0,0,0,84,17.57a8.61,8.61,0,0,0,3.11,3.09A8.82,8.82,0,0,0,84,23.77Z" />
                      <path d="M64.69,8.15a4.62,4.62,0,0,1,4.63,4.6,1.18,1.18,0,0,0,2.36,0,4.63,4.63,0,0,1,4.63-4.62,1.18,1.18,0,1,0,0-2.35,4.63,4.63,0,0,1-4.63-4.6,1.18,1.18,0,0,0-2.36,0,4.63,4.63,0,0,1-4.63,4.61,1.18,1.18,0,1,0,0,2.36Zm5.81-3.1A7.12,7.12,0,0,0,72.42,7,7,0,0,0,70.5,8.88,7.27,7.27,0,0,0,68.58,7,7.16,7.16,0,0,0,70.5,5.05Z" />
                      <path
                        className="cls-1"
                        d="M80.39,36.87a43.81,43.81,0,1,0,9.49,11.79"
                      />
                      <polyline
                        className="cls-2"
                        points="31.32 59.66 51.46 82.99 95.33 30.76"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="text-center text-black miama-font fs-4">
                  {downloadLoading ? "Downloading" : "Download Successful"}
                </h3>
              </div>
              {downloadLoading ? (
                <div className="d-flex justify-content-center">
                  <div>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                      <span>
                        {downloadedCount}/{selectedImagesIndex.length}
                      </span>
                    </div>
                    {/* <div
                      className="spinner-grow spinner-grow-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow spinner-grow-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow spinner-grow-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div> */}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="py-3 d-flex justify-content-center">
                {downloadLoading ? (
                  <button
                    className="bg-black text-white px-5 py-2 text-black border poppins-light rounded-0"
                    onClick={handleCancelDownload}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="bg-black text-white px-5 py-2 text-black border poppins-light rounded-0"
                    data-bs-dismiss="modal"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Result;
