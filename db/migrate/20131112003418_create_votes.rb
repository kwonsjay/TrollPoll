class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.string :number, null: false
      t.integer :response_id, null: false
      t.integer :poll_id, null: false
      t.timestamps
    end
    add_index :votes, :number
    add_index :votes, :response_id
    add_index :votes, :poll_id
  end
end
