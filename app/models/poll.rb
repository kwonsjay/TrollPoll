class Poll < ActiveRecord::Base
  attr_accessible :user_id, :question, :private
  validates :user_id, :question, presence: true
  validates :private, :inclusion => {in: [true, false]}
  
  belongs_to :user
  has_many :responses, :inverse_of => :poll
  
  def favorited
    Favorite.exists?(:poll_id => self.id)
  end
  
  def favorite_count
    Favorite.where(:poll_id => self.id).count
  end
  
  def as_json(options)
    super(:include => [:responses], :methods => [:favorited, :favorite_count])
  end
  
end
