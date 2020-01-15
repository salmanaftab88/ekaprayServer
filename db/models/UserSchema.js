let mongoose = require("mongoose");
let userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    postalCode:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    province:{
        type:String,
        required:true
    },
    // cart:{
    //     type:Array,
    // }
});
let UserSchema = mongoose.model("user", userSchema);
module.exports = UserSchema;