let User = require('../db/models/UserSchema');
let CarouselProducts = require('../db/models/carouselSchema');
let SliderProduct = require('../db/models/sliderSchema');
let kidsUploadSchema = require('../db/models/kidsProductSchema');
let SubscriptionMails = require('../db/models/subscriptionSchema');
let womenUploadSchema = require('../db/models/womenProductSchema');
let userController = {
    signup: (body, next) => {
        let newUser = new User(body);
        newUser.save(function (err, user) {
            next(err, user);
        })
    }

}

let carouselController = {
    saveData: (body, next) => {
        let prdDetail = new CarouselProducts(body);
        prdDetail.save(function (err, user) {
            next(err, user);
        })
    }

}
let sliderController = {
    saveData: (body, next) => {
        let prdDetail = new SliderProduct(body);
        prdDetail.save(function (err, user) {
            next(err, user);
        })
    }

}
let womenUploadsController = {
    saveData : (body, next) => {
        let prdDetail = new womenUploadSchema(body);
        prdDetail.save(function (err, user) {
            next(err, user);
        })
    }

}
let kidsUploadsController = {
    saveData : (body, next) => {
        let prdDetail = new womenUploadSchema(body);
        prdDetail.save(function (err, user) {
            next(err, user);
        })
    }

}
let subscriptionController = {
    subscription: (body, next) => {
        let prdDetail = new SubscriptionMails(body);
        prdDetail.save(function (err, user) {
            next(err, user);
        })
    }

}

module.exports.userController = userController;
module.exports.carouselController = carouselController;
module.exports.sliderController = sliderController;
module.exports.kidsUploadsController = kidsUploadsController;
module.exports.womenUploadsController = womenUploadsController;
module.exports.subscriptionController = subscriptionController;