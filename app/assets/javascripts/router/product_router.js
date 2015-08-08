
window.APP = window.APP || {};

ProductRouter = Backbone.Router.extend({
  routes: {
    "products/new": "create",
    "products/index": "index",
    "products/:id/edit": "edit",
    "products/:id/view": "show"
  },

  initialize: function (options) {
    this.products = options.products;
    this.products.bind('reset', this.updateDebug, this);
    this.products.bind('add', this.updateDebug, this);
    this.products.bind('remove', this.updateDebug, this);
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.products.toJSON(), null, 4));
  },

  create: function () {
    this.currentView = new OrderNewView({
      products: this.products, product: new ProductModel()
    });
    $('#primary-content').html(this.currentView.render().el);
  },

  edit: function (id) {
    var product = this.products.get(id);
    this.currentView = new OrderEditView({product: product});
    $('#primary-content').html(this.currentView.render().el);
  },

  show: function (id) {
    var product = this.products.get(id);
    this.currentView = new OrderShowView({
      product: product
    });
    $('#primary-content').html(this.currentView.render().el);
  },

  index: function () {
    this.currentView = new OrderIndexView({
      products: this.products
    });
    $('#primary-content').html(this.currentView.render().el);
    // we would call to the index with
    // this.products.fetch()
    // to pull down the index json response to populate our collection initially
  }
});

var product_router = new ProductRouter({
      products: new ProductCollection()
});

