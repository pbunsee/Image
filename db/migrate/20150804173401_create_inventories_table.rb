class CreateInventoriesTable < ActiveRecord::Migration
  def change
    create_table :inventories_tables do |t|
    	t.references :products, index: true, foreign_key: true
    	t.integer :count_on_hand, default: 0



    end
  end
end
