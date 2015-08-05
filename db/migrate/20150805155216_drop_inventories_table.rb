class DropInventoriesTable < ActiveRecord::Migration
  def change
    drop_table :inventories_tables
  end
end
