import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;
    document.querySelector(".pe_signin_button").appendChild(script);

    window.phoneEmailListener = function (userObj) {
      navigate("/img-upload");
    };

    return () => {
      window.phoneEmailListener = null;
    };
  }, []);

  return (
    <div
      id="otp_button"
      className="pe_signin_button text-white"
      style={{ display: "none" }}
      data-client-id="11414015415614347812"
    ></div>
  );
};

export default SignInButton;
