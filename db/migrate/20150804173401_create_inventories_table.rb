class CreateInventoriesTable < ActiveRecord::Migration
  def change
    create_table :inventories_tables do |t|
    	t.reference
    	t.integer :count_on_hand

    end
  end
end
