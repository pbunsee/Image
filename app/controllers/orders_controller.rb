class OrdersController < ApplicationController

  def show
    @orders = Order.all
    if @orders == nil
      flash[:alert] = "No orders found"
    end
  end

  def new
    @order = Order.new
  end

  def create
    @order = Order.new(order_params)

    if @order.valid?
       @order.save!
       session[:order_id] = @order.id
       redirect_to orders_path
     else
       flash[:alert] = "There was an error with your order"
       render :new
     end
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

  private
    def order_params
      params.require(:order).permit(:subtotal,
                                    :tax,
                                    :shipping,
                                    :total,
                                    :order_status_id)
    end
end
