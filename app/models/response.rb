class Response < ActiveRecord::Base
  attr_accessible :poll_id, :answer
  validates :answer, :poll, presence: true
  
  belongs_to :poll, :inverse_of => :responses
end
