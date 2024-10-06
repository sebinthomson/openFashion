import axios from "axios";

export default async function UploadApi(formData) {
  try {
    const res = await axios.post("/api/upload", formData, {
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
