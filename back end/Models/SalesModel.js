const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// Defining the sales schema
const salesSchema = new mongoose.Schema({

    salesId: {
        type: String,
        required: true
    },
    pname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "UserModel"
    }
}, { timestamps: true });


mongoose.model("SalesModel", salesSchema);