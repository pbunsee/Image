OrderItemNewView = Backbone.View.extend({
  events: {
    "click button.save": "save"
  },

  // the constructor
  initialize: function (options) {
    this.order_item  = options.order_item;
    this.order_items = options.order_items;
    this.order_item.bind('invalid', this.showErrors, this);
  },

  showErrors: function (order_item, errors) {
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
    this.order_item.set({
      product_id: this.$el.find('input[name=product_id]').val(),
      order_id: this.$el.find('input[name=order_id]').val(),
      unit_price: this.$el.find('input[name=unit_price]').val(),
      quantity: this.$el.find('input[name=quantity]').val(),
      order_status_id: this.$el.find('input[name=order_status_id]').val(),
      total_price: this.$el.find('input[name=total_price]').val()
    });
    if (this.order_item.isValid()){
      // add it to the collection
      this.order_items.add(this.order_item);
      // this.order_item.save();
      // redirect back to the index
      window.location.hash = "order_items/index";
    }
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#formTemplate').html(), this.order_item.toJSON()));
    return this;
  }

});
