
var Product = Backbone.Model.extend({
  //serialize the data from the form 
  defaults: {
    id: "",
    name: "",
    price: "",
    size: "",
    brand: "",
    description: ""
  }
});


var ProductModel = new Product;

var ProductCollection = Backbone.Collection.extend({
  model: ProductModel
});


