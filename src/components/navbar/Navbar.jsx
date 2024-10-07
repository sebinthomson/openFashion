import { useNavigate } from "react-router-dom";

function Navbar({ showLogout = false }) {
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
                localStorage.removeItem("phnNo");
                navigate("/");
              }}
            >
              <i className="bi bi-box-arrow-right"></i>
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
