class OrdersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    @orders = Order.all
  end

  def show
    if current_order
      @order = Order.find current_order
    else
      @order = Order.find params[:id]
    end
  end

  def new
    @order = Order.new
  end

  def create
    @order = Order.new order_params

    if @order.valid?
       @order.save!
       session[:order_id] = @order.id
       flash[:notice] = "Order saved"
       redirect_to orders_path
     else
       flash[:alert] = "There was an error with your order"
       redirect_to edit_order_path(@order.id)
     end
  end
  
  def edit
    @order = Order.find params[:id]
  end

  def destroy
    # TBD
    #when customer cancels an order, evaluate if it can be cancelled or if it has already shipped
    @order = Order.find(params[:id])
    #@order.destroy  - do a soft destroy - mark the status on the order as cancelled
  end

 private
   def order_params
     params.require(:order).permit(:subtotal,
                                   :tax,
                                   :shipping,
                                   :total,
                                   :order_status_id)
   end

   def record_not_found
     flash[:alert] = "Order #{params[:id]} not found"
     redirect_to orders_path
   end

end
