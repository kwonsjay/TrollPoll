class Response < ActiveRecord::Base
  attr_accessible :poll_id, :answer, :votes
  validates :answer, :poll, presence: true
  
  belongs_to :poll, :inverse_of => :responses
  has_many :votes, :dependent => :destroy
  
  def vote_count
    Vote.where(:response_id => self.id).count
  end
  
  def as_json(options)
    super(:methods => [:vote_count])
  end
end
