
function addItem(){
  console.log("adding item to cart");
}

function removeItem(){
  console.log("removing item from cart");
}

function createCart(){
  console.log("Creating cart");
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

$(document).on('ready page:load',function(){

  console.log('ready!');

  //listen for onclick event on Add Cart
  $('.add-btn').click(function(){
    console.log( "Handler for Add Cart .click() called." );
    line_item = $(this).data('line-item');
    console.dir(line_item);
  });
});


