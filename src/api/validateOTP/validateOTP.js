import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL;

export default async function ValidateOTPApi(eventId, mobileNumber, otp) {
  try {
    const res = await axios.post(
      `${baseURL}:${eventId}/validate-otp`,
      { mobile_number: mobileNumber, otp: otp },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("res",res)
    return res.data;
  } catch (error) {
    console.error("detected-faces api error", error);
    return {message:"invalid or expired otp"};
  }
}
