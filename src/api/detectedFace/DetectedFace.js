import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL;

export default async function DetectedFaceApi(eventId, mNumber) {
  try {
    const res = await axios.get(`${baseURL}:${eventId}/detected-faces`, {
      params: {
        mobile_number: mNumber,
      },
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    console.error("detected-faces api error", error);
  }
}
