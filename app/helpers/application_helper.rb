module ApplicationHelper
 def current_order
   if session[:order_id]
     current_order = Order.find(session[:order_id])
   end
 end
 # def current_user
 #   if session[:user_id]
 #     current_user = User.find(session[:user_id])
    
 #   end
 # end

#  def formatted_price(amount)
#   sprintf("$%0.2f", amount / 100.0)
# end
end

