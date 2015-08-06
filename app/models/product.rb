class Product < ActiveRecord::Base
  has_many :order_items
  has_many :orders, through: :order_items

  validates :name, presence: true
  validates :price, presence: true
  validates :image, presence: true



  has_attached_file :image, styles: { large: "600x600>", medium: "300x300>", small: "150x150>"}, 
                    :url => "/assets/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/:id/:style/:basename.:extension"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/


end
