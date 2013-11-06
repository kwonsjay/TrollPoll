class Poll < ActiveRecord::Base
  attr_accessible :user_id, :question, :private
  validates :user_id, :question, :private, presence: true
  
  belongs_to :user
  has_many :responses, :inverse_of => :poll
end
