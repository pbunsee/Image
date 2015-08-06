class ProductsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    @products = Product.all
  end

  def new
    @product = Product.new
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
    puts "@product.inspect #{@product.inspect}"
  end

  def edit
    @product = Product.find params[:id]
  end

  def update
    @product = Product.find params[:id]
    @product.update product_params
    redirect_to products_path
  end

  def destroy
    @product = Product.find params[:id]
    @product.destroy
    redirect_to products_path
    flash[:notice] = "Selected product has been deleted"
  end

  private
    def product_params
      params.require(:product).permit(:number,
                                      :name,
                                      :price,
                                      :size,
                                      :description,
                                      :brand,
                                      :image)
    end

    def record_not_found
      flash[:alert] = "Product #{params[:id]} not found"
      redirect_to products_path
    end

    before_filter :check_for_cancel, :only => [:create, :update]

    def check_for_cancel
      if params[:button]
        redirect_to products_path
      end
    end

end

