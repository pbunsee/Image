
var Order = Backbone.Model.extend({
  // calculate the subtotal each time an item is added to the cart
  // apply a fixed (hard-coded) tax rate for now
  // apply a flat-rate shipping fee for now
  // calculate the total each time an item is added to the cart
  // set a default order_status_id for 'placed' (possible statuses = in process, shipped, cancelled, placed)

  defaults: {
    subtotal: "",
    tax: "",
    shipping: "",
    total: "",
    order_status_id: ""
  }

});

var OrderModel = new Order;

var OrderCollection = Backbone.Collection.extend({
  model: OrderModel
});

