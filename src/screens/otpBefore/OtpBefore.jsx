import { useNavigate } from "react-router-dom";
import Back from "../../components/back/Back";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { OTPInput } from "../../components/otpInput/OtpInput";

function OtpBefore() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/img-upload");
  };
  return (
    <div className="row full-height">
      <Navbar />
      <div className="row w-100 bg-black px-3 py-4 gap-2 m-0">
        <Back />
        <div className="pt-4">
          <h3 className="text-white miama-font fs-1">Enter Your OTP</h3>
        </div>
        <div>
          <h6 className="text-white poppins-light lh-base">
            Please enter the OTP you received
          </h6>
        </div>
        <div className="ps-2 d-flex">
          <OTPInput length={4} />
        </div>
        <div className="py-3">
          <button className="bg-white py-3 px-5 text-black border  poppins-light rounded-0" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OtpBefore;
