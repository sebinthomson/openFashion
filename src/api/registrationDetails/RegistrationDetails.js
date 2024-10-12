import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL;

export default async function RegistrationDetailsApi(eventId, mNumber) {
  try {
    const res = await axios.get(`${baseURL}:${eventId}/registration-details`, {
      params: {
        mobile_number: mNumber,
      },
      headers: { "Content-Type": "application/json" },
    });
    console.log("response", res);
    return res.data;
  } catch (error) {
    if (error?.response?.data?.message != "Mobile number not registered")
      console.error("registration details api error", error);
    return error.response.data;
  }
}
