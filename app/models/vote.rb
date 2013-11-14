class Vote < ActiveRecord::Base
  attr_accessible :response_id, :poll_id, :number
  validates :response_id, :uniqueness => { :scope => [:number] }
  
  belongs_to :response
  belongs_to :poll
end
