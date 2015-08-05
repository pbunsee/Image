class Order < ActiveRecord::Base
  has_many :products, through: :order_items
  has_many :order_items

  before_save :set_order_values

  before_create :set_order_status

  #belongs_to :order_status

private
  def set_order_values
    calc_subtotal 
    calc_tax 
    calc_shipping 
    calc_total
  end

  def calc_subtotal
    order_items.collect { |oi| oi.valid? ? (oi.quantity * oi.unit_price) : 0 }.sum
    self[:subtotal] = calc_subtotal
  end

  def set_order_status
    # assume one status for now - add to this algorithm TBD
    self.order_status_id = 1
  end

  def calc_tax
    #assume 10% tax for now
    self[:tax] = calc_subtotal * 10/100
  end

  def calc_shipping
    #assume flat fee shipping for now $20
    self[:shipping] = 20
  end

  def calc_total
    self[:total] = calc_subtotal + calc_tax + calc_shipping
  end

end
