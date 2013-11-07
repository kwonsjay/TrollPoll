class Poll < ActiveRecord::Base
  attr_accessible :user_id, :question, :private
  validates :user_id, :question, presence: true
  validates :private, :inclusion => {in: [true, false]}
  
  belongs_to :user
  has_many :responses, :inverse_of => :poll
  has_one :favorite
end
