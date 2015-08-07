
var order_item = Backbone.Model.extend({
  // get the product_id from the form when user adds to cart
  // create the order and get its order.id
  // get the unit_price from the product model which must be fetched each time user adds to cart
  // increment quantity each time an item for this product_id is added to cart
  // default total_price to zero and calculate it each time an item is added to cart

  defaults: {
    product_id: "",
    order_id: "",
    unit_price: "",
    quantity: "",
    total_price: ""
  }
});
