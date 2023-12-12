import { useState, useEffect } from "react";
import axios from 'axios';
import { API_BASE_URL } from "../config";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function AddSales() {
    /*Declared variables to add the product, quantity, amount and user details*/
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState("");
    const [user, setUser] = useState("");

/*Declared variables to add loading and navigate feature*/
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

/*Declared variable to add the protected route*/
     const CONFIG_OBJ={
        headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer "+localStorage.getItem("token")
        }
     }

     /*Function to be called when submit button is clicked and passing the protected route*/
    const addSales = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData={pname: productName, quantity: quantity, amount: amount}
        axios.post(`${API_BASE_URL}/addsales`, requestData, CONFIG_OBJ)
            .then((result) => {

                /*Checking conditions whether sales added successfully or not*/
                if(result.status===201){
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Sales added successfully!'
                    })
                }
                /*Setting the fields empty after adding the sales entry*/
                setProductName('');
                setQuantity('');
                setAmount('');
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
    /*useEffect to check whether the user logged in or not to display the add sales page*/
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("user"));
        if (!userInfo) {
          navigate("/");
        }
        setUser(userInfo);
      }, []);
    return (
        /*Add sales form*/
        <div className="container-fluid">
            <h3 style={{ textAlign: "center" }} className="mb-5 mt-5">Add Sales Entry</h3>
            <form onSubmit={(e)=>addSales(e)}>
                <div className=''>
                    <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
                    { /*Loading feature*/ }
                    {loading ? <div className="col-md-12 mt-3 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ''}
                        <div className="card-body">
                            <div className="mb-3">
                                <label for="exampleInputPname" className="form-label">Product Name</label>
                                <input required type="text" value={productName} onChange={(ev)=>setProductName(ev.target.value)} className="form-control" id="exampleInputPname" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputQuantity" className="form-label">Quantity</label>
                                <input required type="number" value={quantity} onChange={(ev)=>setQuantity(ev.target.value)} className="form-control" id="exampleInputQuantity" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputAmount" className="form-label">Amount</label>
                                <input required type="number" value={amount} onChange={(ev)=>setAmount(ev.target.value)} className="form-control" id="exampleInputAmount" aria-describedby="emailHelp" />
                            </div>
                            <div className='d-grid'>
                                <button type="submit" className="btn btn-danger" >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddSales;