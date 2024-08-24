import React, { useState, useRef } from "react";

export const OTPInput = ({ length = 4 }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    if (value === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <>
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          style={{
            width: "52px",
            height: "52px",
            margin: "5px",
            textAlign: "center",
            fontSize: "18px",
            border: "1px solid #ccc",
            backgroundColor: "transparent",
            padding: "0",
            boxSizing:"border-box"
          }}
          className="text-white"
        />
      ))}
    </>
  );
};
