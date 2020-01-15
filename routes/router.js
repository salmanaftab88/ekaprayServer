let express = require('express');
let router = express.Router();
let userController = require('../user-controller/usercontroller').userController;
let carouselController = require('../user-controller/usercontroller').carouselController;
sliderController = require('../user-controller/usercontroller').sliderController;
let womenUploadsController = require('../user-controller/usercontroller').womenUploadsController;
// let kidsUploadsController = require('../user-controller/usercontroller').kidsUploadsController;
let subscriptionController = require('../user-controller/usercontroller').subscriptionController;
const slider = require('../db/models/sliderSchema');
let WomenUploadSchema = require('../db/models/womenProductSchema');
let bodyParser = require('body-parser')
let multer = require('multer');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const mainCrousel = require('../db/models/carouselSchema');
const getSubsUser = require('../db/models/subscriptionSchema');
const image2base64 = require('image-to-base64');


let storageconf = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, require('path').resolve(__dirname, '../uploads/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
let conf = multer({ storage: storageconf });

const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
});
let fs = require('fs')

router.post('/uploads', conf.single('file'), function (req, res) {
  let newBody = JSON.parse(JSON.stringify(req.body));
  newBody.file = '/uploads/' + req.file.originalname
  carouselController.saveData(newBody, function (err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  })
});
router.post('/womenUploads', conf.array('file', 3), function (req, res) {
  let newBody = JSON.parse(JSON.stringify(req.body));
  let getimages = req.files;
  let a = getimages.map(image => {
    return '/uploads/' + image.filename
  })
  console.log(a)
  newBody.file = a
  // newBody.file = '/uploads/' + req.file.originalname
  // getsubscribedUserdata.find()
  womenUploadsController.saveData(newBody, function (err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  })
});

router.post('/kidsUploads', conf.single('file'), function (req, res) {
  let newBody = JSON.parse(JSON.stringify(req.body));
  newBody.file = '/uploads/' + req.file.originalname
  // getsubscribedUserdata.find()
  womenUploadsController.saveData(newBody, function (err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  })
});

router.get('/getSliderProducts', function (req, res) {
  slider.find({}).sort({ _id: 'desc' })
    .exec((err, searchdata) => {
      if (err) {
        return res.json({ success: false, err: err }) 
      }

      console.log('data', searchdata)

      res.json(searchdata)
    })
  // slider.find({}, function (err, slider) {
  //   if (err) {
  //     res.send(500);
  //   }
  //   else {
  //     res.json(slider);
  //   }
  // });
});

router.get("/kidsProducts", (req, res) => {

  WomenUploadSchema.find({ cats: 'Kids' }).sort({ _id: 'desc' })
    .exec((err, searchdata) => {
      if (err) {
        return res.json({ success: false, err: err }) 
      }

      console.log('data', searchdata)

      res.json(searchdata)
    })

  // WomenUploadSchema.find({ cats: "Kids" }, (err, searchdata) => {
  //   if (err) {
  //     return res.json({ success: false, err: err })
  //   }

  //   res.json(searchdata)
  // })

})
router.post('/sliderUploads', conf.array('file', 3), function (req, res) {
  let newBody = JSON.parse(JSON.stringify(req.body));
  // newBody.file = '/uploads/' + req.file.originalname
  let getimages = req.files;
  let a = getimages.map(image => {
    return '/uploads/' + image.filename
  })
  console.log(a)
  newBody.file = a
  sliderController.saveData(newBody, function (err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  })
});
router.get('/showCrouselProduct', function (req, res) {
  mainCrousel.find({}, function (err, mainCrousel) {
    if (err) {
      res.send(500);
    }
    else {
      res.json(mainCrousel);
    }
  });
});
router.get('/getSubscribedUsers', function (req, res) {
  getSubsUser.find({}, function (err, data) {
    if (err) {
      res.send(500);
    }
    else {
      res.json(data);
    }
  });
});
//delete router
router.delete('/del/:id', conf.single('file'), function (req, res) {
  // console.log(req.params.cname);
  // let filePath = 'E:/Gamica project/clientProject/brandclothing-master/server' + req.body.file;
  mainCrousel.findByIdAndDelete(req.params.id, (err, users) => {
    let filePath = require('path').resolve(__dirname, '.././uploads') + users.file;
    if (err) {
      res.send(500);
    }
    else {
      fs.unlink(filePath, function () {
        res.json({ success: true });
        // res.redirect('/');
      });
    }
  })
})
router.delete('/delProduct/:id', conf.array('file', 3), function (req, res) {
  // let filePath = 'E:/Gamica project/clientProject/brandclothing-master/server' + req.body.file;
  slider.findByIdAndDelete(req.params.id, (err, users) => {
    users.file.forEach(function (item) {
      // console.log(filePath);
      if (err) {
        res.send(500);
      }
      else {
        fs.unlinkSync(filepath = require('path').resolve(__dirname, '.././uploads') + item, function () {
          // res.redirect('/');
        });
      }
    })
    res.json({ success: true });
  })
})
router.delete('/delWomenproducts/:id', function (req, res) {
  // let filePath = 'E:/Gamica project/clientProject/brandclothing-master/server' + req.body.file;
  WomenUploadSchema.findByIdAndDelete(req.params.id, (err, users) => {
    users.file.forEach(function (item) {


      // console.log(filePath);
      if (err) {
        res.send(500);
      }
      else {
        fs.unlinkSync(filepath = require('path').resolve(__dirname, '.././uploads') + item, function () {
          // res.redirect('/');
        });
      }
    })
    res.json({ success: true });
  })
})

// router.get('/changeimg', function (req, res) {
//   WomenUploadSchema.findById(req.params.id, (err, users) => {
//     users.file.forEach(function (item) {


//       // console.log(filePath);
//       if (err) {
//         res.send(500);
//       }
//       else {
//         fs.unlinkSync(filepath = require('path').resolve(__dirname, '.././uploads') + item, function () {
//           // res.redirect('/');
//         });
//       }
//     })
//     res.json({ success: true });
//   })
// })



//update router
router.put('/update/:qid', conf.array('file', 3), function (req, res) {
  let getBody = req.body
  // let getBody = JSON.parse(JSON.stringify(req.body));v
  if (req.files.length) {
    // getBody.file = '/uploads/' + req.file.originalname
    var getimgz = req.files;
    var getpath = getimgz.map(image => {
      return '/uploads/' + image.filename
    })
    // console.log(a)
    getBody.file = getpath
  }
  slider.findByIdAndUpdate({ _id: req.params.qid }, getBody, function (err, user) {

    if (req.files.length) {
      user.file.forEach(function (item) {


        // console.log(filePath);
        if (err) {
          res.send(500);
        }
        else {
          fs.unlinkSync(filepath = require('path').resolve(__dirname, '.././uploads') + item, function () {
            // res.redirect('/');
          });
        }
      })
      res.json({ success: true });
    } else {
      res.json({ success: true });

    }
  })
})
//new added code
router.put('/womenupdation/:woid', conf.array('file', 3), function (req, res) {
  // let getBody = JSON.parse(JSON.stringify(req.body));
  let getBody = req.body
  if (req.files.length) {
    // getBody.file = '/uploads/' + req.file.originalname
    var getimgz = req.files;
    var getpath = getimgz.map(image => {
      return '/uploads/' + image.filename
    })
    // console.log(a)
    getBody.file = getpath
  }
  WomenUploadSchema.findByIdAndUpdate({ _id: req.params.woid }, getBody, function (err, user) {

    if (req.files.length) {
      user.file.forEach(function (item) {


        // console.log(filePath);
        if (err) {
          res.send(500);
        }
        else {
          fs.unlinkSync(filepath = require('path').resolve(__dirname, '.././uploads') + item, function () {
            // res.redirect('/');
          });
        }
      })
      res.json({ success: true });
    } else {
      res.json({ success: true });

    }
  })
})
router.delete('/delkidsproducts/:id', function (req, res) {
  // let filePath = 'E:/Gamica project/clientProject/brandclothing-master/server' + req.body.file;
  WomenUploadSchema.findByIdAndDelete(req.params.id, (err, users) => {
    users.file.forEach(function (item) {
      // console.log(filePath);
      if (err) {
        res.send(500);
      }
      else {
        fs.unlinkSync(filepath = require('path').resolve(__dirname, '.././uploads') + item, function () {
          // res.redirect('/');
        });
      }
    })
    res.json({ success: true });
  })
})
router.put('/kidsupdation/:kidid', conf.array('file', 3), function (req, res) {
  // let getBody = JSON.parse(JSON.stringify(req.body));
  let getBody = req.body
  if (req.files.length) {
    // getBody.file = '/uploads/' + req.file.originalname
    var getimgz = req.files;
    var getpath = getimgz.map(image => {
      return '/uploads/' + image.filename
    })
    // console.log(a)
    getBody.file = getpath
  }
  WomenUploadSchema.findByIdAndUpdate({ _id: req.params.kidid }, getBody, function (err, user) {

    if (req.files.length) {
      user.file.forEach(function (item) {


        // console.log(filePath);
        if (err) {
          res.send(500);
        }
        else {
          fs.unlinkSync(filepath = require('path').resolve(__dirname, '.././uploads') + item, function () {
            // res.redirect('/');
          });
        }
      })
      res.json({ success: true });
    } else {
      res.json({ success: true });

    }
  })
})
//ending new added code
router.post('/subscription', function (req, res) {
  subscriptionController.subscription(req.body, function (err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  })

  var nodemailer = require('nodemailer');
  var myvalue = req.body.email;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ekapraycontactus@gmail.com',
      pass: 'ahmadtariq'
    }
  });

  var mailOptions = {
    from: 'ekapraycontactus@gmail.com',
    to: myvalue,
    subject: 'Ekapray',
    text: 'Thanks for subscribing us we will send you all latest updates Regards: Ekapray'
  };

  var mailOption = {
    from: 'ekaprayy@gmail.com',
    to: 'ekaprayy@gmail.com',
    subject: 'Ekapray-Subscription',
    text: myvalue + " has subscribed on Ekapray"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.json({ success: true });
    }
  });
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.json({ success: true });
    }
  });

})

router.post('/contactus', function (req, res) {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ekaprayy@gmail.com',
      pass: 'ahmadtariq'
    }
  });

  var mailOptions = {
    from: "ekaprayy@gmail.com",
    to: "ekapraycontactus@gmail.com",
    subject: 'Some one want to contact from your site reply as soon as poosible',
    html: '<strong style="color:red;">Name: </strong>' + req.body.name + '<br/><br/>\
      <strong style="color:red;">Email: </strong>' + req.body.email + '<br/><br/>\
      <strong style="color:red;">Phone No: </strong>'+ req.body.number + '<br/><br/>\
      <strong style="color:red;">Complain: </strong>'+ req.body.message + ' '
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.json({ success: true });
    }
  });
})
//sign-in-code-for-admin

let users = [
  {
    id: 1,
    email: 'ahmadtariq@ekapray.com',
    password: '38P27d$HPuPfp#'
  },
];
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  for (let user of users) {
    if (email == user.email && password == user.password) {
      let token = jwt.sign({ id: user.id, email: user.email }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
      res.json({
        sucess: true,
        err: null,
        token
      });
      break;
    }
    else {
      res.status(401).json({
        sucess: false,
        token: null,
        err: 'Username or password is incorrect'
      });
    }
  }
});
// router.get('/', jwtMW, (req, res) => {
//   res.send('You are authenticated');
// });

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

//search 

router.post("/searchdata", (req, res) => {
  let searchdata = req.body.searchCatigoires


  WomenUploadSchema.find({ brandname: searchdata }, (err, searchdata) => {
    if (err) {
      return res.json({ success: false, err: err })
    }

    res.json(searchdata)
  })

});

router.get("/womenProducts", (req, res) => {

  WomenUploadSchema.find({ cats: 'Women' }).sort({ _id: 'desc' })
    .exec((err, searchdata) => {
      if (err) {
        return res.json({ success: false, err: err }) 
      }

      console.log('data', searchdata)

      res.json(searchdata)
    })

  // WomenUploadSchema.find({ cats: "Women" }, (err, searchdata) => {
  //   if (err) {
  //     return res.json({ success: false, err: err })
  //   }

  //   res.json(searchdata)
  // })

})
router.get("/menProducts", (req, res) => {
  WomenUploadSchema.find({ cats: 'Men' }).sort({ _id: 'desc' })
  .exec((err, searchdata) => {
    if (err) {
      return res.json({ success: false, err: err }) 
    }

    console.log('data', searchdata)

    res.json(searchdata)
  })
})

// send mail to subscribed Users 
router.post('/sendMails', conf.single('file'), function (req, res) {
  var nodemailer = require('nodemailer');
  var title = req.body.title;
  var mails = req.body.mails;
  var description = req.body.description;
  // var imge = req.file.originalname;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ekaprayy@gmail.com',
      pass: 'ahmadtariq'
    }
  });
  mails.forEach(function (to, i, array) {
    var mailOptions = {
      from: 'ekaprayy@gmail.com',
      subject: 'Ekapray "make your own choice"',
      // html: '<h1>' + title + '</h1>',
      html: '<div style="border:1px solid #f5f5f5; border-radius:5px; text-align:center; width:90%; float:left;"><div style="padding:10px;"><h2 style="color:red;">' + title + '</h2>\
      <a href="https://www.ekapray.com"><img src="cid:asdasd7" style="width:29%;"/><img src="cid:1234" style="float:left; border-radius:4px;" width="200px"/></a><br><br>\
      <span style="float:right; font-family:sans-serif; color:#737373;">'+ description + '</span>\
      <div/></div>',
      attachments: [{
        filename: '"' + req.file.originalname + '"',
        path: require('path').resolve(__dirname, '../uploads/uploads') + '/' + req.file.originalname,
        cid: '1234' //same cid value as in the html img src
      },
      {
        filename: 'logo.png',
        path: require('path').resolve(__dirname, '../uploads') + '/logo.png',
        cid: 'asdasd7' //same cid value as in the html img src
      }
      ],
    };
    mailOptions.to = to;
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json({ success: true });
      }
    });
  });

})
//check out router
router.post('/buyNow', function (req, res) {
  console.log(req.body)
  var nodemailer = require('nodemailer');
  var productdata = req.body.a;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ekaprayy@gmail.com',
      pass: 'ahmadtariq'
    }
  });

  var content = productdata.cartNewItems.reduce(function (a, b) {
    return a + '<tr><td>' + b.description + '</td><td>' + b.price + '</td><td>' + b.amount + '</td></tr>';
  }, '');

  var mailOptions = {
    from: 'ekaprayy@gmail.com',
    to: 'ekaprayy@gmail.com',
    subject: 'Order Details',
    html: '<div style="text-align:justify;"><table border="2px"><thead><tr><th>Description</th><th>Price</th><th>quantity</th></tr></thead><tbody>' +
      content + '</tbody></table><br>\
      <strong>Total purchase items by the customer: </strong>"'+ productdata.cartNewItems.length + '"<br>\
    <strong>Customer Details: </strong><br>\
    <span>Name: </span>"'+ productdata.name + '"<br>\
    <span>Email: </span>"'+ productdata.email + '"<br>\
    <span>Phone No: </span>"'+ productdata.phone + '"<br>\
    <span>Country: </span>"'+ productdata.country + '"<br>\
    <span>City: </span>"'+ productdata.city + '"<br>\
    <span>Address: </span>"'+ productdata.address + '"<br>\
    <span>Total Amount with shipping charges: </span>"'+ productdata.totalamount + '"\
    </div>'
  };
  var mailOption = {
    from: 'ekaprayy@gmail.com ',
    to: '' + productdata.email + '',
    subject: 'Your Order Details : ekapray.com',
    html: '<div style="text-align:justify;"><table border="2px"><thead><tr><th>Description</th><th>Price</th><th>quantity</th></tr></thead><tbody>' +
      content + '</tbody></table><br>\
    <strong>Total purchase items by the customer: </strong>"'+ productdata.cartNewItems.length + '"<br>\
  <strong>Customer Details: </strong><br>\
  <span>Name: </span>"'+ productdata.name + '"<br>\
  <span>Email: </span>"'+ productdata.email + '"<br>\
  <span>Phone No: </span>"'+ productdata.phone + '"<br>\
  <span>Country: </span>"'+ productdata.country + '"<br>\
  <span>City: </span>"'+ productdata.city + '"<br>\
  <span>Address: </span>"'+ productdata.address + '"<br>\
  <span>Total Amount with shipping charges: </span>"'+ productdata.totalamount + '"\
  </div>'
  };



  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.json({ success: true });
    }
  });

})

module.exports = router;