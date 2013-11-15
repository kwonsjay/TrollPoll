class VotesController < ApplicationController
  
  def index
    @vote_count = Vote.where(:response_id => params[:response_id]).count
    render :json => @vote_count
  end
  
  def create
  end
  
  def sms
    if valid_vote?
      @vote = Vote.new(
        { :number => params[:From],
          :response_id => @response.id,
          :poll_id => @response.poll_id }
      )
      if @vote.save
        thanks_for_voting
        @vote_count = Vote.where(:response_id => params[:Body]).count
        Pusher.trigger('trollpoll', 'rerender', {
          :response_id => params[:Body],
          :vote_count => @vote_count})
        render :json => @vote_count
      else
        thanks_but_no
        render :json => @vote.errors.full_messages
      end
    else
      thanks_but_no
      render :json => "", :status => 422
    end
  end
  
  private
  
  def valid_vote?
    @response = Response.find(params[:Body])
    if @response
      @vote = Vote.find_by_number_and_poll_id(params[:From], @response.poll_id)
      if @vote
        return false
      else
        return true
      end
    else
      return false
    end
  end
  
  def thanks_but_no
    @twilio_client = Twilio::REST::Client.new ENV["TWILIO_SID"], ENV["TWILIO_TOKEN"]
    
    @twilio_client.account.sms.messages.create(
    :from => "+1" + ENV["TWILIO_CALLER_NO"],
    :to => params[:From],
    :body => "You've already voted!"
    )
  end
  
  def thanks_for_voting
    @twilio_client = Twilio::REST::Client.new ENV["TWILIO_SID"], ENV["TWILIO_TOKEN"]
    
    @twilio_client.account.sms.messages.create(
    :from => "+1" + ENV["TWILIO_CALLER_NO"],
    :to => params[:From],
    :body => "Thanks for voting at TrollPoll!"
    )
  end
  
  def lets_blame_you
    @twilio_client = Twilio::REST::Client.new ENV["TWILIO_SID"], ENV["TWILIO_TOKEN"]
    
    @twilio_client.account.sms.messages.create(
    :from => "+1" + ENV["TWILIO_CALLER_NO"],
    :to => params[:From],
    :body => "Invalid vote!"
    )
  end
  
end
