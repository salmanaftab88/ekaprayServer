let mongoose = require("mongoose");
let KidsProductSchema = mongoose.Schema({

    file:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    saleprice:{
        type:String,
        required:true
    },
 

});
let KidsProducts = mongoose.model("KidsProduct",KidsProductSchema );
module.exports = KidsProducts;