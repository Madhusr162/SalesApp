import { useState } from "react";
import axios from 'axios';
import { API_BASE_URL } from "../config";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

function Register() {
/*Declared variables to register the user with firstname, lastname, email, password*/
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();


    /*Function to be called when submit button is clicked*/
    const register = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData={firstName: firstName, lastName: lastName, email, password}
        axios.post(`${API_BASE_URL}/register`, requestData)
            .then((result) => {
                /*Checking condition whether user successfully logged in*/
                if(result.status===201){
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'user successfully registered'
                    })
                    navigate('/')
                }
                /*Checking condition whether the email id already registered*/
                if(result.status===500){
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'user already registered'
                    })
                }
                 /*Setting the fields empty after registration*/
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
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
        /*Registration form*/
        <div className="container-fluid">
            <h3 style={{ textAlign: "center" }} className="mb-5 mt-5">Registration Form</h3>
            <form onSubmit={(e) => register(e)}>
                <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
                { /*Loading feature*/ }
                    {loading ? <div className="col-md-12 mt-3 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ''}
                    <div className="card-body">
                        <div className="mb-3">
                            <label for="exampleInputFname" className="form-label">First Name</label>
                            <input required type="text" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} className="form-control" id="exampleInputFname" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputLname" className="form-label">Last Name</label>
                            <input required type="text" value={lastName} onChange={(ev) => setLastName(ev.target.value)} className="form-control" id="exampleInputLname" aria-describedby="emailHelp" />
                        </div>
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
    )
}
export default Register;