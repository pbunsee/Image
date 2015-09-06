function supports_localStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function addToCart(objLineItem){
  console.log("Adding to cart");
  //var product_master = $(this).data('line-item');

  // Get product master record to enrich cart data
  // Use gon.watch to auto-fetch product master record updates (without any additional code)

  // Must have the test if any gon variables are set before trying to use it to prevent exception being thrown
  if ( gon ) {

    // optional interval on gon.watch method is not set so the product variable is refreshed from server-side once
    // can set an interval: gon.watch('yourVariable', optionalInterval, callbackFn); 
    // but beware of creating heavy traffic between client-side and ruby back-end with frequent watch refreshes

    var product_master = gon.watch('product', function isProductUpdated(product){
                            // Inventory and Price are important to consider when adding to cart and on checkout  
                            // Is there sufficient inventory to fulfill the order?
                            // Has the price changed? If yes, recalculate pricing in the cart                  
                            if ( product.quantity_in_stock != null && product.quantity_in_stock > 0 ) {
                               arrCart.push(objLineItem);
                               console.dir(arrCart);
                             } else
                             {
                              //TBD Change this alert to an exception msg placed in pop-up modal or on product page
                               alert("Out of stock. This item has been placed on back-order for you.");
                             }
                           }
                         );
  }
  console.log("product_master");
  console.dir(product_master);
}
  
// Global variables
console.log("Init global variables");
var order = [];

$(document).on('ready page:load',function(){
  console.log('ready!');

  if ( supports_localStorage() )
  { console.log("This browser supports HTML5 localStorage"); }
  else
  { console.log("localStorage is not supported on this browser!!"); }

  $('.add-btn').click(function(){
    console.log( "Handler for Add product into cart called." );

    //localStorage stores the data as string - JSON.parse to convert from string to object
    if ( localStorage.getItem("cart") === null )
      { 
      console.log("Cart does not exist in localStorage. Creating a new cart...");
      } 
    else
      {
      console.log("Cart from localStorage.");
      var tempCart = localStorage.getItem("cart");
      order = JSON.parse(tempCart);
      console.log("order from localStorage order");
      console.dir(order);
      }

    // get an array of the values scraped from the show product form
    var $inputs = $('.edit_product :input');
    var productValues = {};
    $inputs.each(function() {
      tempStr = this.name;
      tempStr = tempStr.replace("product[","");
      tempStr = tempStr.replace("]","");
      if (!tempStr || tempStr == "" || tempStr == '""') { 
        console.log("don't want this key/val pair!"); 
      } 
      else
      { 
        productValues[tempStr] = $(this).val() 
      };
    });

    delete productValues["description"];
    productValues["qty"] = 1;

    console.log("product - stripped out description");
    console.dir(productValues);

    order.push(productValues);

    console.log("order ");
    console.dir(order);

    localStorage.setItem("cart", JSON.stringify(order));

    function calcLineItemTotal(){
      var line_total = _.map(order,function(d){ 
                         console.log("d: ");
                         console.dir(d);
                         console.dir(d.price);
                         console.dir(parseFloat(d.price).toFixed(2));
                         console.dir(d.qty);
                         console.dir(parseInt(d.qty));
                         return (parseFloat(d.price).toFixed(2) * parseInt(d.qty)); });

      console.dir(line_total);
      return line_total;
      //var numItems = _.reduce(_.each(order,function(memo, num){ return memo + (num.price * 1); },0));
                       //return memo + (parseFloat(num.price).toFixed(2) * parseInt(num.qty)); }, 0);
    }

    function listOrder(){
      //var removeTable = '#orderList';
      //$(removeTable).remove();

      // Display line items in cart div
      var dataTable = $("<table></table>").attr('id','orderList');
      $('#cart').append( $(dataTable) );
      $(dataTable).addClass("table table-striped table-bordered table-hover table-condensed table-responsive");
      $(dataTable).append( $("<thead>").append( $("<th>").append("Brand"))
                                       .append( $("<th>").append("Name"))
                                       .append( $("<th>").append("Size"))
                                       .append( $("<th>").append("Unit Price")) 
                                       .append( $("<th>").append("Qty")) 
                                       .append( $("<th>").append("Total")) 
                         );
 
      $(dataTable).append( $('<tr>') );

      //dataSet = _.sortBy(dataSet,function(d){ return -d.value; });
      order.map(function(d,i){
                           var trow = $(dataTable).find('tbody tr:last');
                           var tcell = $("<td>");
                           //var parseKey = handleDataType(d.key);
                           //$(tcell).html(parseKey);
                           $(tcell).html(d["brand"]);
                           $(tcell).appendTo($(trow));
                           var tcell = $("<td>");
                           $(tcell).html(d["name"]);
                           $(tcell).appendTo($(trow));
                           var tcell = $("<td>");
                           $(tcell).html(d["size"]);
                           $(tcell).appendTo($(trow));
                           var tcell = $("<td>");
                           $(tcell).html('$ ' + parseFloat(d["price"]).toFixed(2));
                           $(tcell).appendTo($(trow));
                           var tcell = $("<td>");
                           $(tcell).html(parseInt(d["qty"]));
                           $(tcell).appendTo($(trow));
                           var tcell = $("<td>");
                           var lineTotalPrice = parseFloat(d["price"]).toFixed(2) * parseInt(d["qty"]);
                           $(tcell).html('$ ' + lineTotalPrice);
                           $(tcell).appendTo($(trow));
                           $(dataTable).find('tbody tr:last').after($(trow));
                           $(dataTable).append( $('<tr>') );
                         } );


       //$('#cart-line-items').append( $(line) );
    }
    listOrder();

  });
});


