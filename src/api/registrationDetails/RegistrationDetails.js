import axios from "axios";

export default async function RegistrationDetailsApi(mNumber) {
  try {
    const res = await axios.get("/api/registration-details", {
      params: {
        mobile_number: mNumber,
      },
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    console.error("registration details api error", error);
  }
}
