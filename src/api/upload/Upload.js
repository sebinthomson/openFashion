import axios from "axios";

export default async function UploadApi(formData) {
  try {
    const res = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response",res)
    return res;
  } catch (error) {
    console.error("detected-faces api error", error);
    return error.response.data;
  }
}
