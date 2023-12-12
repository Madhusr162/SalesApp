const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const SalesModel=mongoose.model("SalesModel");
const protectedRoute=require('../Middleware/protectedResource');

// Declaring variables to check for today's revenue
var start = new Date();
start.setHours(0,0,0,0);

var end = new Date();
end.setHours(23,59,59,999);

// sales route to display the sales 

router.get("/sales",protectedRoute,(req,res)=>{
    SalesModel.find({author: req.user._id})
    .populate("author","_id firstName lastName")
    .then((dbSales)=>{
        res.status(200).json({sales: dbSales})
    })
    .catch((error)=>{
        console.log(error);
    })
})
// top 5 sales route to display the top 5 sales of the particular user
router.get("/top5sales",protectedRoute,(req,res)=>{
    SalesModel.find({author: req.user._id}).sort({amount:-1}).limit(5)
    .populate("author","_id firstName lastName")
    .then((dbSales)=>{
        res.status(200).json({sales: dbSales})
    })
    .catch((error)=>{
        console.log(error);
    })
})
// today's revenue route to display the today's revenue of the particular user 
router.get("/todaysrevenue", protectedRoute, (req,res)=>{
    SalesModel.find({$and: [{author:req.user._id},{createdAt: {$gte: start, $lt: end}} ]})
    .populate("author","_id firstName lastName")
    .then((dbSales)=>{
        let totalRevenue = 0;

    dbSales.forEach(sale => {
      totalRevenue += sale.amount;
      
    });
    console.log(totalRevenue)
        res.status(200).json({totalRevenue})
    })
    .catch((error)=>{
        console.log(error);
    })
})
// add sales route to post the data of sales 
router.post("/addsales", protectedRoute,(req,res)=>{
    const {pname, quantity, amount} =req.body;
    let salesId=generateSalesId();
    if(!pname || !quantity || !amount){
        return res.status(400).json({error: "All fields are mandatory"});
    }
    req.user.password=undefined;
    const saleObj= new SalesModel({pname: pname,quantity: quantity, amount: amount, author: req.user, salesId})
saleObj.save()
.then((newSale)=>{
res.status(201).json({sale:newSale})
})
.catch((error)=>{
console.log(error);
})
});
// function to generate random sales id
function generateSalesId() {
    const length = 5; // Adjust the length of the ID as needed
    const characters = '0123456789';
    let salesId = 'S';
    for (let i = 0; i < length - 1; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      salesId += characters[randomIndex];
    }
    return salesId;
  }

module.exports=router;