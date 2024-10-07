import { useNavigate } from "react-router-dom";
import Back from "../../components/back/Back";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { OTPInput } from "../../components/otpInput/OtpInput";
import { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../../contexts/DetailsContext";
import { setWithExpiry } from "../../utils/localstorage";

function OtpBefore() {
  const { phnNo, isRegistered } = useContext(DetailsContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [err, setErr] = useState({ otpError: "" });

  const handleSubmit = () => {
    let check = true;
    if (otp.length == 0) check = true;
    Object.values(otp).map((n) => {
      if (!n.length) {
        check = true;
      }
    });
    if (otp.join() === ["1", "1", "2", "2"].join()) {
      check = false;
    }
    if (check) {
      setErr({ otpError: "Please enter valid otp" });
    } else {
      if (isRegistered == true) {
        setWithExpiry("phnNo", phnNo, 86400000);
      }
      navigate("/gallery");
    }
  };

  useEffect(() => {
    if (phnNo && phnNo.length != 10) {
      navigate("/");
    }
  }, [phnNo]);

  return (
    <div className="row full-height" id="belowroot">
      <Navbar />
      <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
        <Back page={"/signup"} />
        <div className="pt-4">
          <h3 className="text-white miama-font fs-1">Enter Your OTP</h3>
        </div>
        <div>
          <h6 className="text-white poppins-light lh-base">
            Please enter the OTP you received
          </h6>
        </div>
        <div className="ps-2 d-flex">
          <OTPInput length={4} setOtpSend={setOtp} otp={otp} />
        </div>
        {err.otpError.length ? (
          <div className="ps-3 d-flex">
            <div className="text-danger">{err.otpError}</div>
          </div>
        ) : (
          ""
        )}
        <div className="pb-3 pt-5">
          <button
            className="bg-white py-3 px-5 text-black border  poppins-light rounded-0"
            onClick={handleSubmit}
          >
            Verify OTP <i className="bi bi-arrow-right"></i>{" "}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OtpBefore;
