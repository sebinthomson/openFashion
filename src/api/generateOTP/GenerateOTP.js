import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL;

export default async function GenerateOTPApi(eventId, mobileNumber) {
  try {
    const res = await axios.post(
      `${baseURL}:${eventId}/generate-otp`,
      { mobile_number: mobileNumber },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    console.error("detected-faces api error", error);
    return {message:"error"}
  }
}
