import axios from "axios";

export default async function ValidEventId(eventId) {
  try {
    console.log(eventId);
    const res = await axios.get("/api/check-api-status", {
      headers: { "Content-Type": "application/json", "x-user-port": eventId },
    });
console.log("res",res)
    return res.data;
  } catch (error) {
    console.error("API error", error);
  }
}
