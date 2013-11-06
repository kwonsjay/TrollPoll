class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.string :answer, null: false
      t.integer :poll_id
      t.timestamps
    end
    add_index :responses, :poll_id
  end
end
