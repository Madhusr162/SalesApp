var express=require('express');
var app=express();
var cors=require('cors');
const mongoose=require('mongoose');
const {MONGODB_URL}=require('./config')

mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", ()=>{
    console.log("DB connected");
});
mongoose.connection.on('error',(error)=>{
    console.log("Not able to connect to DB");
});

app.use(cors());
app.use(express.json());


require('./Models/UserModel');
require('./Models/SalesModel');

app.use(require('./Routes/UserRoutes'));
app.use(require('./Routes/SalesRoutes'));


app.listen(5000,()=>{
    console.log("server started");
})