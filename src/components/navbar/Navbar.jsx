import { useNavigate } from "react-router-dom";
import { DetailsContext } from "../../contexts/DetailsContext";
import { useContext } from "react";

function Navbar({ showLogout = false }) {
  const {
    setIsRegisterd,
    setImg,
    setFName,
    setLName,
    setPhnNoCC,
    setPhnNo,
    setEmail,
  } = useContext(DetailsContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-black header">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div>
          <img className="navbar-logo" src="/logo-tp.png" alt="Logo" />
        </div>
        {showLogout ? (
          <div className="pe-2">
            <button
              className="text-white poppins-light border-0 bg-transparent"
              onClick={() => {
                setIsRegisterd("")
                setImg(false)
                setFName("")
                setLName("")
                setPhnNoCC("+91")
                setPhnNo("")
                setEmail("")
                localStorage.removeItem("eventID");
                localStorage.removeItem("phnNo");
                navigate("/");
              }}
            >
              <i className="bi bi-box-arrow-right fs-1"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
