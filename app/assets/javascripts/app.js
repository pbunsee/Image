var AppRouter = Backbone.Router.extend({
    routes: {
        "*actions": "defaultRoute"
    }
});

// Initiate the router
var app_router = new AppRouter;

app_router.on('route:defaultRoute', function(actions) {
    alert(actions);
})

//var product_router = new ProductRouter({
      //products: new ProductCollection()
//});

//var order_router = new OrderRouter({
      //orders: new OrderCollection()
//});

//var order_item_router = new OrderItemRouter({
      //order_items: new OrderItemCollection()
//});


// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

Backbone.history.getFragment();

alert( app_router.routes[Backbone.history.getFragment()] );


