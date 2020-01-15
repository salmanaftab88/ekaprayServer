let mongoose = require("mongoose");
let subscriptionSchema = mongoose.Schema({

    email:{
        type:String,
        // required:true
    },
 

});
let SubscriptionSchema = mongoose.model("Subscription", subscriptionSchema);
module.exports = SubscriptionSchema;