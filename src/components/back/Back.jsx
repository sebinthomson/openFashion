import { useNavigate } from "react-router-dom";

function Back({ page }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (page == "/") {
      localStorage.removeItem("phnNo");
    }
    if (page?.length) {
      navigate(page);
    }
  };
  return (
    <div className="d-flex flex-row align-items-center ">
      <div>
        <svg
          width="27"
          height="22"
          viewBox="0 0 27 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleBack}
        >
          <path
            d="M10.5958 21C8.33866 15.4422 6.22223 13.2698 0.999976 11C6.07489 8.09567 8.17143 5.86499 10.5958 0.999999"
            stroke="#FEFEFE"
            strokeWidth="0.6"
          />
          <line
            x1="1.53116"
            y1="11.2585"
            x2="26.8641"
            y2="11.2585"
            stroke="#FEFEFE"
            strokeWidth="0.6"
          />
        </svg>
      </div>
      <h1 className="text-white poppins-light ps-4 fs-2">Back</h1>
    </div>
  );
}

export default Back;
