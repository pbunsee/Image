class AddColumnsToProduct < ActiveRecord::Migration
  def change
  	add_column :products, :size, :string
  	add_column :products, :description, :string
  	add_column :products, :brand, :string
  	remove_column :products, :active, :boolean

  end
end
