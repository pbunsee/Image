class PagesController < ApplicationController
	
  
  def home
  
  end

  def about
  end

  def storefront
    @products = Product.order(params[:sort]).paginate(page: params[:page], per_page: 15)
  end


end
