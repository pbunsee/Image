function setCookie(obj, cookieName) {
  console.dir(obj);
  var tempStr = JSON.stringify(obj);
  console.log("tempStr is: " + tempStr);
  Cookies.set(cookieName, tempStr);
}

function getCookie(cookieName) {
  var tempStr = Cookies.get(cookieName);
  var objName = JSON.parse(tempStr);
  //console.dir(objName);
  arrCart = objName;
  return arrCart;
}

function removeCookie(){
  //erase the cookie if it hasn't already expired
}

function addItem(line_item){
  console.log("adding item to cart");
  addToCart(line_item);
  setCookie(arrCart, 'cart');
  console.dir(arrCart);
}

function getItem(){
  //console.log("getting item from cart");
  //var line_item = getCookie('lineItemCookie');
  //console.dir(line_item);
  // if no cart object have to get the cart cookie, convert to object and then navigate the object to find the line_item object
}

function removeItem(){
  console.log("removing item from cart");
  //removeCookie('lineItemCookie', line_item);
  // if no cart object have to get the cart cookie, convert to object and then navigate the object to find the line_item object
  removeFromCart(line_item);
}

/*
function getCart() {
  console.log("Getting a cart");
  // instantiate the cart array if it doesn't already exist
  if (typeof arrCart == "undefined") {
    console.log("New cart");
    var tempCart = [];
  }
  return tempCart;
  console.dir(tempCart);
}
*/

function getCart() {
  console.log("Getting the cart");
  if ( typeof arrCart == "undefined" ) {
    var cartFromCookie = getCookie('cart');
    if ( typeof cartFromCookie == "undefined" ) {
      console.log("cart cookie not found");
      console.log("New cart");
      var newCart  = [];
      return newCart;
      console.log("newCart");
      console.dir(newCart);
    } else
    {
      return cartFromCookie;
      console.log("cartFromCookie");
      console.dir(cartFromCookie);
    }
  } else
  {
    return arrCart;
    console.log("arrCart");
    console.dir(arrCart);
  }
}

function addToCart(objLineItem){
  console.log("Adding to cart");
  arrCart.push(objLineItem);
  console.dir(arrCart);
}

function removeFromCart(objLineItem){
  console.log("Removing line item from cart");
  var atIndex = arrCart.indexOf(objLineItem);
  arrCart.splice(atIndex, 1);
  console.dir(arrCart);
}

function emptyCart(){
  console.log("Emptying cart");
}

function checkout(){
  console.log("Checking out cart");
}

function incrementQty(){
  console.log("Incrementing product inventory");
}

function decrementQty(){
  console.log("Decrementing product inventory");
}

// set the cart as global variable
console.log("Init global variables");
var arrCart = getCart();
console.dir(arrCart);

$(document).on('ready page:load',function(){
  console.log('ready!');

  //listen for onclick event on 'Add to Cart' link
  $('.add-btn').click(function(){
    console.log( "Handler for Add product into cart .click() called." );

    // Keep product master record available to enrich cart data
    var product_master = $(this).data('line-item');
    console.dir(product_master);
    console.dir(product_master);

    // get an associative array of just the values from the show product form
     var $inputs = $('.edit_product :input');
     var productValues = {};
     $inputs.each(function() {
        tempStr = this.name;
        tempStr = tempStr.replace("product[","");
        tempStr = tempStr.replace("]","");
        if (!tempStr || tempStr == "" || tempStr == '""') { 
          console.log("don't want this key/val pair!"); 
        } else
        { 
          if ( tempStr == "id" || tempStr == "size" ) {
            productValues[tempStr] = $(this).val() 
          }
        };
     });
     console.log("grabbed the form vals");
     console.dir(productValues);

    // construct a new object to store only product.id and product size
    var core_line_item = _.map(productValues, function(key, val) {
                                     return [val, key] ;
                                 }
                              );

    core_line_item = _.flatten(core_line_item);
    console.log("core_line_item");
    console.dir(core_line_item);

    // persist the core_line_item to cookie
    addItem(core_line_item);
    console.dir(arrCart);

    //getItem();

    getCookie('cart');
    console.dir(arrCart);

    // create enriched cart
    // create cart facade - dump the arrCart object into div cart-line-items on layout
    $('#cart-line-items').html('<p>oh</p>');
    $('#cart-line-items').html('<p>oh</p>');


    //ideally shift this to another event listener on click of cart link
    console.log(_.size(arrCart));
    //_.reduce(arrCart.item,function(memo, num){ return memo + (num.price * num.qty); },0);
    //var numItems = _.reduce(_.each(arrCart,function(memo, num){ return memo + (num.price * 1); },0));
    //console.dir(numItems);

  });
});


