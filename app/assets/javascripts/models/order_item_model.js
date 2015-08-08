
var OrderItem = Backbone.Model.extend({
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
  },

  validate: function (attrs) {
    var errors = {};
    if (!attrs.product_id) errors.product_id = "Product must have an ID.";
    if (!attrs.quantity) errors.quantity = "Quantity of product must be specified.";

    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});

var OrderItemModel = new OrderItem;

var OrderItemCollection = Backbone.Collection.extend({
  model: OrderItemModel
});

