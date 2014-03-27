//Set Publish Key
Stripe.setPublishableKey('pk_xofIegbkEkF0NuExZk6B8chSHTMvR');
var stripeResponseHandler = function(status, response) {
  var $form = $('#payment-form');
//use sample cc 4242 4242 4242 4242
  if (response.error) {
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    console.log(response);
    // token contains id, last4, and card type
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and re-submit
    $form.get(0).submit();
  }
};

jQuery(function($) {
  $('#payment-form').submit(function(e) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});