function setCookie(obj, cookieName) {
  console.dir(obj);
  console.log("cookieName is: " + cookieName);
  var tempStr = JSON.stringify(obj);
  console.log("tempStr is: " + tempStr);
  Cookies.set(cookieName, tempStr);
}

function getCookie(cookieName) {
  console.log("get cookieName is: " + cookieName);
  var tempStr = Cookies.get(cookieName);
  var objName = JSON.parse(tempStr);
  //console.dir(objName);
  //return objName;
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
console.log("before document ready do some prep");
var arrCart = getCart();
console.dir(arrCart);

$(document).on('ready page:load',function(){

  console.log('ready!');

  //listen for onclick event on 'Add to Cart' link
  $('.add-btn').click(function(){
    console.log( "Handler for Add product into cart .click() called." );
    var line_item = $(this).data('line-item');
    console.dir(line_item);
    console.dir(arrCart);
    addItem(line_item);
    console.dir(arrCart);
    //getItem();
    getCookie('cart');
    console.dir(arrCart);
    
    //ideally shift this to another event listener on click of cart link
    console.log(_.size(arrCart));
    //_.reduce(arrCart.item,function(memo, num){ return memo + (num.price * num.qty); },0);
    //var numItems = _.reduce(_.each(arrCart,function(memo, num){ return memo + (num.price * 1); },0));
    //console.dir(numItems);


  var $inputs = $('.edit_product :input');

  // get an associative array of just the values.
  var values = {};
  $inputs.each(function() {
     values[this.name] = $(this).val();
  });
  console.log("grabbed the form vals");
  console.dir(values);
  });

});


