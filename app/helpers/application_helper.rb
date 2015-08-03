module ApplicationHelper
 def current_order
   if session[:order_id]
     current_order = Order.find(session[:order_id])
   end
 end
end
