class Product < ActiveRecord::Base
  has_many :order_items

  has_attached_file :image, styles: { large: "600x600>", medium: "300x300>", small: "150x150#"}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  #default_scope { where(active: true) }
end
