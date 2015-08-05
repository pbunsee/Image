class Order::OrderItemsController < ApplicationController
  def create
    @order = current_order
    @order_item = @order.order_items.new order_item_params
    if @order_item.valid?
      @order.save!
      flash[:notice] = "Item added to Order"
      redirect_to edit_order(@order.id)
    else
      flash[:alert] = "There was an error with adding the item to the order"
      redirect_to order_order_items_path(@order.id, @order_item.id)
    end
  end

  def update
    # TBD
    @order = current_order
    @order_item = @order.order_items.find(params[:id])
    @order_item.update_attributes(order_item_params)
    @order_items = @order.order_items
  end

  def destroy
    # TBD
    @order = current_order
    @order_item = @order.order_items.find(params[:id])
    @order_item.destroy
    @order_items = @order.order_items
  end

private
  def order_item_params
    params.require(:order_item).permit(:product_id,
                                       :order_id,
                                       :unit_price,
                                       :quantity,
                                       :total_price)
  end

end
