import axios from "axios";

export default async function DetectedFaceApi(mNumber) {
  try {
    const res = await axios.get("/api/detected-faces", {
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
