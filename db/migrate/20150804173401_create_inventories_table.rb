class CreateInventoriesTable < ActiveRecord::Migration
  def change
    create_table :inventories_tables do |t|
<<<<<<< HEAD
    	t.references :product, index: true, foreign_key: true
    	t.integer :count_on_hand, default: 0

=======
    	t.reference
    	t.integer :count_on_hand
>>>>>>> bb9e5edd15096b941b1493369939a7047c3a271d

    end
  end
end
