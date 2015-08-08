
window.APP = window.APP || {};
OrderItemRouter = Backbone.Router.extend({
  routes: {
    "orders/:id/order_items/new": "create",
    "orders/:id/order_items/index": "index",
    "orders/:id/order_items/edit": "edit",
    "orders/:id/order_items/view": "show"
  },

  initialize: function (options) {
    this.order_items = options.order_items;
    this.order_items.bind('reset', this.updateDebug, this);
    this.order_items.bind('add', this.updateDebug, this);
    this.order_items.bind('remove', this.updateDebug, this);
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.order_items.toJSON(), null, 4));
  },

  create: function () {
    this.currentView = new OrderItemNewView({
      order_items: this.order_items, order_item: new OrderItemModel()
    });
    $('#primary-content').html(this.currentView.render().el);
  },

  edit: function (id) {
    var order_item = this.order_items.get(id);
    this.currentView = new OrderItemEditView({order_item: order_item});
    $('#primary-content').html(this.currentView.render().el);
  },

  show: function (id) {
    var order_item = this.order_items.get(id);
    this.currentView = new OrderItemShowView({
      order_item: order_item
    });
    $('#primary-content').html(this.currentView.render().el);
  },

  index: function () {
    this.currentView = new OrderItemIndexView({
      order_items: this.order_items
    });
    $('#primary-content').html(this.currentView.render().el);
    // we would call to the index with
    // this.order_items.fetch()
    // to pull down the index json response to populate our collection initially
  }
});

var order_item_router = new OrderItemRouter({
      order_items: new OrderItemCollection()
});

