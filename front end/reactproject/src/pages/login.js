import { useState } from "react";
import axios from 'axios';
import { API_BASE_URL } from "../config";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
/*Declared variables to login the user with email and password who has already registered*/
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
/*Declared variables to add loading and navigate feature*/
    const dispatch=useDispatch();
    const navigate=useNavigate();

    /*Function to be called when submit button is clicked*/
    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                /*Checking conditions whether user successfully logged in*/
                if (result.status === 200) {
                    setLoading(false);

                    /*Updating the user details in localStorage*/
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user))
                    dispatch({type: 'LOGIN_SUCCESS', payload: result.data.result.user})
                    Swal.fire({
                        icon: 'success',
                        title: 'user successfully loggedin'
                    })
                    navigate('/addsales');
                } 
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error
                })
            })
    }

    return (
        /*Login form*/
        <div className="container-fluid">
            <h3 style={{ textAlign: "center" }} className="mb-5 mt-5">Login Form</h3>
            <form onSubmit={(e)=>login(e)}>
                <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
                    {loading ? <div className="col-md-12 mt-3 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ''}
                    <div className="card-body">
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input required type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input required type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className='d-grid'>
                            <button type="submit" className="btn btn-danger">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Login;