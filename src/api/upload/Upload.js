import Axios from "../axios/AxiosGo";

export async function uploadApi(fName, lName, email, mNumber, imageFile) {
  try {
    const data = JSON.stringify({
      firstName: fName,
      lastName: lName,
      email: email,
      mobileNumber: mNumber,
      imageFile: imageFile,
    });

    var topNDetails = {
      method: "post",
      url: "upload",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const uploadResponse = await Axios(topNDetails);

    console.log(uploadResponse);
  } catch (error) {
    console.error(error);
  }
}
