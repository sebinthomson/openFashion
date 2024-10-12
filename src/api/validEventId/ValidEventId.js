import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL;

export default async function ValidEventId(eventId) {
  try {
    const res = await axios.get(`${baseURL}:${eventId}/check-api-status`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("API error", error);
    return {};
  }
}
