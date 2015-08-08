OrderNewView = Backbone.View.extend({
  // functions to fire on events
  events: {
    "click button.save": "save"
  },

  // the constructor
  initialize: function (options) {
    this.order  = options.order;
    this.orders = options.orders;
    this.order.bind('invalid', this.showErrors, this);
  },

  showErrors: function (order, errors) {
    this.$el.find('.error').removeClass('error');
    this.$el.find('.alert').html(_.values(errors).join('<br>')).show();
    // highlight the fields with errors
    _.each(_.keys(errors), _.bind(function (key) {
      this.$el.find('*[name=' + key + ']').parent().addClass('error');
    }, this));
  },

  save: function (event) {
    event.stopPropagation();
    event.preventDefault();

    // update our model with values from the form
    this.order.set({
      subtotal: this.$el.find('input[name=subtotal]').val(),
      tax: this.$el.find('input[name=tax]').val(),
      shipping: this.$el.find('input[name=shipping]').val(),
      total: this.$el.find('input[name=total]').val(),
      order_status_id: 1,
      // just setting random number for id would set as primary key from server
      order_id: Math.floor(Math.random() * 100) + 1
    });
    if (this.order.isValid()){
      // add it to the collection
      this.orders.add(this.order);
      // this.order.save();
      // redirect back to the index
      window.location.hash = "orders/index";
    }
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#formTemplate').html(), this.order.toJSON()));
    return this;
  }
});

