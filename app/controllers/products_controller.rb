class ProductsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    @products = Product.all
    #@order_item = current_order.order_items.new
    puts "@products.inspect #{@products.inspect}"
  end

  def new
    @product = Product.new
    if @product == nil
      flash[:alert] = "Product not found"
    end
    puts "@product.inspect #{@product.inspect}"
  end

  def create
    @product = Product.new product_params 

    if @product.valid?
       @product.save!
       redirect_to products_path
     else
       flash[:alert] = "There was an error with adding the product"
       render :new
     end
  end

  def show
    @product = Product.find params[:id]
    if @product == nil
      flash[:alert] = "Product not found"
      puts "no product found"
    end
    puts "@product.inspect #{@product.inspect}"
  end

  private
 
    def product_params
      params.require(:product).permit(:number,
                                      :name,
                                      :price,
                                      :size,
                                      :description,
                                      :brand)

    end

    def record_not_found
      #render plain: "404 Not Found", status: 404
      flash[:alert] = "Product not found"
    end

end

