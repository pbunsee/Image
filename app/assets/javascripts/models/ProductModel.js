
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
