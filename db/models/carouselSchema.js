let mongoose = require("mongoose");
let carouselSchema = mongoose.Schema({

    file:{
        type:String,
        // required:true
    },
 

});
let CarouselSchema = mongoose.model("CarouselProduct", carouselSchema);
module.exports = CarouselSchema;