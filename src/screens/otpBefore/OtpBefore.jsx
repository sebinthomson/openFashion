import { useNavigate } from "react-router-dom";
import Back from "../../components/back/Back";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { OTPInput } from "../../components/otpInput/OtpInput";
import { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../../contexts/DetailsContext";
import { setWithExpiry } from "../../utils/localstorage";
import GenerateOTPApi from "../../api/generateOTP/GenerateOTP";
import ValidateOTPApi from "../../api/validateOTP/validateOTP";

function OtpBefore() {
  const { phnNo, isRegistered } = useContext(DetailsContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [err, setErr] = useState({ otpError: "" });
  const [msg, setMsg] = useState("");
  const [countdown, setCountdown] = useState(600);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendTime, setResendTime] = useState(60);
  const eventID = localStorage.getItem("eventID");

  const handleSubmit = async () => {
    let check = true;
    if (otp.length === 0) check = true;
    Object.values(otp).forEach((n) => {
      if (!n.length) check = true;
    });
    check = await verifyOTP(otp.join().replaceAll(",", ""));
    if (check) {
      setErr({ otpError: "Please enter valid otp" });
    } else {
      if (isRegistered === true) {
        setWithExpiry("phnNo", phnNo, 86400000);
      }
      navigate("/gallery");
    }
  };

  const getOTP = async () => {
    const res = await GenerateOTPApi(eventID, phnNo);
    if (res?.message === "OTP generated and sent successfully") {
      setMsg("OTP generated successfully");
      setCountdown(600); 
      setResendCooldown(resendTime); 
      if (resendTime === 60) {
        setResendTime(120); 
      } else if (resendTime === 120) {
        setResendTime(300); 
      }
    }else{
      setErr({ otpError: "Error generating OTP" });
    }
  };

  const verifyOTP = async (otpJoined) => {
    const res = await ValidateOTPApi(eventID, phnNo, otpJoined);
    return res?.message === "invalid or expired otp";
  };

  useEffect(() => {
    if (eventID !== null) {
      if (phnNo && phnNo.length === 10) {
        getOTP();
      } else {
        navigate("/");
      }
    } else {
      navigate("/event-id");
    }
  }, [phnNo]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(
        () => setResendCooldown((prev) => prev - 1),
        1000
      );
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="row full-height" id="belowroot">
      <Navbar showLogout={true}/>
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
        ) : null}
        {msg.length ? (
          <div className="ps-3 d-flex">
            <div className="text-white fs-6">
              {msg} - Expires in {formatTime(countdown)}
            </div>
          </div>
        ) : null}
        <div className="pb-3 pt-5 d-flex gap-4">
          <div>
            <button
              className="bg-white py-3 px-3 text-black border poppins-light rounded-0"
              onClick={() => {
                if (resendCooldown === 0) {
                  getOTP()
                }
              }}
              disabled={resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Resend in ${formatTime(resendCooldown)}`
                : "Resend OTP"}
            </button>
          </div>
          <div>
            <button
              className="bg-white py-3 px-3 text-black border poppins-light rounded-0"
              onClick={handleSubmit}
            >
              Verify OTP <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OtpBefore;
