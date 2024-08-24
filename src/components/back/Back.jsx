import { useNavigate } from "react-router-dom";

function Back({ prevCount }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(prevCount == undefined ? -1 : prevCount);
  };
  return (
    <div className="d-flex flex-row align-items-center ">
      <div>
        <i
          className="bi bi-arrow-left text-white back-icon"
          onClick={handleBack}
        ></i>
      </div>
      <h1 className="text-white poppins-light ps-4 fs-2">Back</h1>
    </div>
  );
}

export default Back;
