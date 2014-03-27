##Buying a Private Island using Stripe & Node

>"The internet can make you rich.  Like have-your-own-private-island type of rich.  It's awesome" <br>
>&nbsp;-&nbsp;John D. Storey

Stripe is a payment processor that makes integration more simple.  Stripe sets itself apart from Paypal and Authorize.net by being a simplified and secure solution.Don't confuse it with online shopping carts like Shopify or Big Cartel.  It simply lets you integrate with those, or your own shopping cart.  Most similiar is [Braintree](https://www.braintreepayments.com/) that actually offers to waive $50,000 of fees and from what I can tell operates the same way as Stripe with an Auth key and server side processing.  Awesome.

The major security feature it gives is that there is no need to save or be responsible for the credit card information entered on your site. PCI compliance for 1,000,000 e-commerce transactions is expected to be $100,000+ for compliance. Stripe takes care of that for you.  Double Awesome.

For more information here is a site about [differences between PayPal and Stripe](https://memberful.com/blog/stripe-vs-paypal/) fees, security, customer service etc...

### Basic Usage

An authorization token can be generated through an included [Stripe.js file](https://stripe.com/docs/stripe.js) or a pre-made [Checkout](https://stripe.com/checkout) solution.  However, charging the card is done server side through one of their many [API Options](https://stripe.com/docs/api). 

Fork this repository, which was generated using an Express Generator to get started with a node/express template. Also if you haven't already setup an account go to [Stripe.com](https://stripe.com/) and set one up.  We'll be using their "testing dashboard". We'll start by using checkout.  
### Checkout
Insert this code into your view file.
```html
<form action="/charge" method="POST">
  <script
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_xofIegbkEkF0NuExZk6B8chSHTMvR"
    data-image="/images/Logo_Dark_.png"
    data-name="Show Me the Money"
    data-description="Let's do $1"
    data-amount="100">
  </script>
</form>
```
Go to your site and lickity split there is a button with a nifty checkout form that is even optimized for mobile. It doesn't actually work yet and if you try it will give you an error, but we'll be fixing that soon.
### Custom HTML + JS
Let's say we wanted to make our own form though.  Stripe also has some broiler plate code for that as well.  Just include this .js file in your index.html
```html
<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
```
and place the form where you'd like it on the page
```html
<div class='paymentForm'>
  <form action="/charge" method="POST" id="payment-form">
    <span class="payment-errors"></span>
 
    <div class="form-row">
      <label>
        <span>Card Number</span>
        <input type="text" size="20" data-stripe="number"/>
      </label>
    </div>
 
    <div class="form-row">
      <label>
        <span>CVC</span>
        <input type="text" size="4" data-stripe="cvc"/>
      </label>
    </div>
 
    <div class="form-row">
      <label>
        <span>Expiration (MM/YYYY)</span>
        <input type="text" size="2" data-stripe="exp-month"/>
      </label>
      <span> / </span>
      <input type="text" size="4" data-stripe="exp-year"/>
    </div>
    <button type="submit">Submit Payment</button>
  </form>
 </div>
```
Now try it out using a fake credit card number, any cvc, and exiration date in the future.  Here is a CC number to copy.
```html
4242 4242 4242 4242
```
You should be seeing an error saying "Cannot POST /charge".  That's because the token and other parameters are being submitted to your form's action endpoint.  However, you should be able to see in your "logs" section of stripe that an attempt was made with it's cooresponding parameters.  So now let's setup your server side to actually create a charge.
### Server
You'll want to add stripe to your app.js file, and set the key.
```js
var stripe = require("stripe")( "{ YOUR SK_KEY }" );
```
and then down below by the other app.get endpoints create one for /charge.  Notice this also has a "CONGRATULATIONS" page for you to re-direct to when a charge is successful.
```js
// Creates Routes
app.get('/', routes.index);
app.get('/users', user.list);
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
```
That's it!  Your on your way to making bookoo money using affiliate, MLM, PCP, CPA, USD, CNBC, or TNT practices.  Good luck and save me a room in the pool house of your mansion.

### But wait... that's not all
Everyone knows the real money is in residual income.  So our black diamond is creating a system that lets you do reocurring payments.  If you feel so inclined figure out how to do residual, add your code to this project and sumbit a pull request and you'll be on your way to becoming internet famous :)


