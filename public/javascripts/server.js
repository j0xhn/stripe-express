// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://manage.stripe.com/account
stripe.setApiKey("sk_F2hmCJopv2QLLRHfwi43dtXzeafKe");

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form
module.exports = function(app){
  app.get('/stripe',
    function(req,res){
      // add a page here indicating that there is nothing to see
      res.send("Scram!")
    }
  );
  app.post('/stripe',
    function(req,res) {
      // obtain StripeToken
      var transaction = req.body;
      var stripeToken = transaction.stripeToken;
      var newCustomer = new Customer({token: stripeToken });
      newCustomer.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Success!");
        }
      });
      // create charge
      var charge =
      {
        amount: 10*100, 
        currency: 'USD',
        card: stripeToken
      };
      stripe.charges.create(charge,
        function(err, charge) {
          if(err)
            console.log(err);
          else
            {
              res.json(charge);
              console.log('Successful charge sent to Stripe!');
            };
        }       
      );
    // render congrats page
    res.render('congrats', { title: "Congrats!", charge: charge.amount/100.00});
    }
  );
};

