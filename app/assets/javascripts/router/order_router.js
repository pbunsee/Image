
window.APP = window.APP || {};
OrderRouter = Backbone.Router.extend({
  routes: {
    "orders/new": "create",
    "orders/index": "index",
    "orders/:id/edit": "edit",
    "orders/:id/view": "show"
  },

  initialize: function (options) {
    this.orders = options.orders;
    this.orders.bind('reset', this.updateDebug, this);
    this.orders.bind('add', this.updateDebug, this);
    this.orders.bind('remove', this.updateDebug, this);
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.orders.toJSON(), null, 4));
  },

  create: function () {
    this.currentView = new OrderNewView({
      orders: this.orders, order: new OrderModel()
    });
    $('#primary-content').html(this.currentView.render().el);
  },

  edit: function (id) {
    var order = this.orders.get(id);
    this.currentView = new OrderEditView({order: order});
    $('#primary-content').html(this.currentView.render().el);
  },

  show: function (id) {
    var order = this.orders.get(id);
    this.currentView = new OrderShowView({
      order: order
    });
    $('#primary-content').html(this.currentView.render().el);
  },

  index: function () {
    this.currentView = new OrderIndexView({
      orders: this.orders
    });
    $('#primary-content').html(this.currentView.render().el);
    // we would call to the index with
    // this.orders.fetch()
    // to pull down the index json response to populate our collection initially
  }
});

var order_router = new OrderRouter({
      orders: new OrderCollection()
});

