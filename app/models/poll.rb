class Poll < ActiveRecord::Base
  attr_accessible :user_id, :question, :private
  validates :user_id, :question, presence: true
  validates :private, :inclusion => {in: [true, false]}
  
  belongs_to :user
  has_many :responses, :inverse_of => :poll, :dependent => :destroy
  has_many :votes, :dependent => :destroy
  has_many :favorites, :dependent => :destroy
  
  def favorite_count
    Favorite.where(:poll_id => self.id).count
  end
  
  def voted
    Vote.exists?(:poll_id => self.id)
  end
  
  def as_json(options)
    super(:include => [{:responses => {:methods => :vote_count}}, :favorites], :methods => [:favorite_count, :voted])
  end
  
end
