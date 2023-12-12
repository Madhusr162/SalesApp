import { useState, useEffect } from "react";
import axios from 'axios';
import { API_BASE_URL } from "../config";
import { useNavigate } from 'react-router-dom';

function TodaysRevenue(){
    /*Declared variables to get the total revenue and user details*/
    const [TotalRevenue, setTotalRevenue]=useState(0);
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
    const totalRevenue = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/todaysrevenue`, CONFIG_OBJ);
            console.log(response.data.totalRevenue);
            setTotalRevenue(response.data.totalRevenue);
        } catch (err) {

            console.error(err.message);
        }
    }
    /*useEffect to check whether the user logged in or not to display today's revenue page*/
    useEffect(() => {
        totalRevenue();
        let userInfo = JSON.parse(localStorage.getItem("user"));
        if (!userInfo) {
          navigate("/");
        }
        setUser(userInfo);
    }, [])
    return(
        // h1 style to display the today's revenue
        <div className="container-fluid">
            <h1 style={{textAlign: "center"}} className="mb-5 mt-5">Today's Revenue is: {TotalRevenue}</h1>
            
        </div>
    );
}
export default TodaysRevenue;