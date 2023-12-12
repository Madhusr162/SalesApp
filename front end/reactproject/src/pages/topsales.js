import { useState, useEffect } from "react";
import axios from 'axios';
import { API_BASE_URL } from "../config";
import { useNavigate } from 'react-router-dom';

function TopSales() {
    /*Declared variables to the topsales and user details*/
    const [Sales, setSales] = useState([]);
    const [user, setUser] = useState("");

    const navigate = useNavigate();

    /*Declared variable to add the protected route*/
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
     /*Function to fetch data using axios*/
    const topSales = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/top5sales`, CONFIG_OBJ);
            console.log(response.data);
            setSales(response.data.sales);

        } catch (err) {

            console.error(err.message);
        }
    }
    /*useEffect to check whether the user logged in or not to display the top sales page*/
    useEffect(() => {
        topSales();
        let userInfo = JSON.parse(localStorage.getItem("user"));
        if (!userInfo) {
          navigate("/");
        }
        setUser(userInfo);
    }, [])

    return (
        // Creating table format to display the top 5 sales of the user
            <div className="container-fluid">
                <h3 style={{ textAlign: "center" }} className="mb-5 mt-5">TOP 5 SALES</h3>
                <table className="table table-danger table-striped-columns justify-content-center">
                    <thead>
                        <tr >
                            <th scope="col">#</th>
                            <th scope="col">Sales id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Sale Amount</th>
                        </tr>
                    </thead>
                        <tbody>
                        
                            {/* Using map function to fetch array of data from backend */}
                        {Sales.map((item, index) => {
                            return (
                            <tr key={index}> 
                                       
                                <th scope="row">{index+1}</th>
                                <td >{item.salesId}</td>
                                <td >{item.pname}</td>
                                <td >{item.quantity}</td>
                                <td >{item.amount}</td>
                        
                            </tr>)
                        })
                    }
                        </tbody>
                </table>
            </div>

    )
}
export default TopSales;