let mongoose = require("mongoose");
let WomenProductScehma = mongoose.Schema({

    file:[String],
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
    brandname:{
        type:String,
        required:true
    },
    brief:{
        type:String,
        required:true
    },
    cats:{
        type:String,
        required:true
    }
 

});
let WomenProducts = mongoose.model("WomenProduct",WomenProductScehma );
module.exports = WomenProducts;