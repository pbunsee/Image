class OrderItemsController < ApplicationController
  def index
    @order_items = current_order.order_items.all
  end

  def new
    @order_item = current_order.order_item.new
  end

  def create
    puts "@product.inspect #{@product.inspect}"
    puts "current_order.inspect #{current_order.inspect}"
    @order_item = current_order.order_items.new order_item_params
    if @order_item.valid?
      current_order.save!
      flash[:notice] = "Item added to Order"
      redirect_to edit_order(@order.id)
    else
      flash[:alert] = "There was an error with adding the item to the order"
      redirect_to order_order_items_path(current_order, @order_item.id)
    end
  end

  def update
    # TBD
    @order_item = current_order.order_items.find(params[:id])
    @order_item.update_attributes order_item_params
  end

  def destroy
    # TBD
    @order_item = current_order.order_items.find(params[:id])
    #@order_item.destroy
    #@order_items = current_order.order_items
  end

private
  def order_item_params
    params.require(:order_item).permit(:product.id,
                                       :order.id,
                                       :unit_price,
                                       :quantity,
                                       :total_price)
  end

end
