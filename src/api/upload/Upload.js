import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL;

export default async function UploadApi(eventId, formData) {
  try {
    const res = await axios.post(`${baseURL}:${eventId}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("detected-faces api error", error);
    return error.response.data;
  }
}
