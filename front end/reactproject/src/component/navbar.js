
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function NavBar() {

/*Declared variables to for dispatch and navigate feature*/
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*Logout function to define what should happen after clicking on logout*/
  const logout = () => {
    Swal.fire({
      icon: 'success',
      title: 'user successfully loggedout'
    })
    /*Removing the user details from local storage after logout*/
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-danger" >
      <a className="navbar-brand" href="#" style={{ color: "white" }}>SALES APP</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/addsales" className="nav-link" aria-current="page" style={{ color: "white" }}>ADD SALES</Link>
          </li>
          <li className="nav-item">
            <Link to="/topsales" className="nav-link" style={{ color: "white" }} >TOP 5 SALES</Link>
          </li>
          <li className="nav-item">
            <Link to="/todaysrevenue" className="nav-link" style={{ color: "white" }}>TODAY'S TOTAL REVENUE</Link>
          </li>
          {/*Login button will be empty after successfull login*/}
          {localStorage.getItem("token") == null ?<li className="nav-item">
            <Link to="/" className="nav-link" style={{ color: "white" }}>LOGIN</Link>
          </li>:""}
          {/*Register button will be empty after successfull login*/}
          {localStorage.getItem("token") == null ?<li className="nav-item">
            <Link to="/register" className="nav-link" style={{ color: "white" }}>REGISTER</Link>
          </li>:""}
          {/*Logout button will be displayed after successfull login*/}
          {localStorage.getItem("token") !== null ?< li className="nav-item">
          <Link to="/" id='logout' className="nav-link" style={{ color: "white" }} onClick={() => logout()}>LOGOUT</Link>
        </li>:""}
      </ul>
    </div>
</nav >
    );
}
export default NavBar;