
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var stripe = require("stripe")(
  "sk_F2hmCJopv2QLLRHfwi43dtXzeafKe"
);
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/users', user.list);
// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://manage.stripe.com/account
stripe.setApiKey("sk_F2hmCJopv2QLLRHfwi43dtXzeafKe");
// 2424 2424 2424 2424
// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form
  app.post('/charge',
    function(req,res) {
      // obtain StripeToken
      var transaction = req.body;
      var stripeToken = transaction.stripeToken;
      // create charge
      var charge =
      {
        amount: 1*100, 
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
    res.sendfile('public/html/congrats.html');
    }
  );















http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
