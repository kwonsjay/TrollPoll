class Favorite < ActiveRecord::Base
  attr_accessible :poll_id, :user_id
  validates :poll_id, :user_id, :presence => true
  validates_uniqueness_of :user_id, :scope => :poll_id

  belongs_to :poll
  belongs_to :user

end
