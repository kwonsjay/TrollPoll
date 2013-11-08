class AddVotesColumnToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :votes, :integer, default: 0
  end
end
