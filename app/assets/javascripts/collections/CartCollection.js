var Cart = Backbone.Collection.extend({
  model: Product
});

var myCart = new Cart;


var item = myCart.create({
  id: <product id from the form ?>,
  size: <user's size selection from the form?>
});
serialize

