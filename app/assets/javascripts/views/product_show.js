ProductShowView = Backbone.View.extend({
  // the constructor
  initialize: function (options) {
    this.product = options.product;
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#showTemplate').html(), this.product.toJSON()));
    return this;
  }
});

