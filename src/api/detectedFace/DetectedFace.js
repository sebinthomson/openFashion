 import Axios from "../axios/Axios.js"

export async function DetectedFaceApi(mNumber) {
  try {
    var topNDetails = {
      method: "get",
      url: `/api/detected-faces?mobile_number=${encodeURIComponent(mNumber)}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const detectedFaceResponse = await Axios(topNDetails);

    console.log(detectedFaceResponse);
  } catch (error) {
    console.error(error);
  }
}
