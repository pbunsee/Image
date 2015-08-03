class OrdersController < ApplicationController

  def show
   @orders = Order.all
   if @orders == nil
     render :text => "No orders found"
   end
  end

  def new
   @order = Order.new
   session[:order_id] = @order.id
  end

  def create
   @order = current_order
  end
  
  def edit
   begin
     @order = Order.find params[:id]
   rescue
       flash[:alert] = "Order not found"
       redirect_to orders_path
   end
  end

  def destroy
   @order = Order.find(params[:id])
   #@order.destroy
  end

end
