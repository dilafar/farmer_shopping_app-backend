const router = require('express').Router();
let Payment = require('../models/payment');

//payments add
router.route('/payAdd').post((req, res)=> {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;

    const accNo = req.body.accNo;
    const exDate = req.body.exDate;
    const cvv = req.body.cvv;

    const newPayment = new Payment({
        name,
        email,
        mobile,
        accNo,
        exDate,
        cvv

    });
    newPayment.save()
    .then(()=> res.json('payment details added!'))
    .catch(err => res.status(400).json('error: '+ err));
});

//get

router.route('/').get((req, res) => {
    Payment.find()
      .then(payments => res.json(payments))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports= router;