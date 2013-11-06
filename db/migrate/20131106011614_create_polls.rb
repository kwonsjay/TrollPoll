class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.string :question, null: false
      t.boolean :private, null: false, default: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :polls, :user_id
  end
end
