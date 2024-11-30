import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL;

export default async function GetEventDetails(eventId) {
  try {
    const res = await axios.get(`${baseURL}:${eventId}/get_event/`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("API error", error);
    return {message:"error"};
  }
}
