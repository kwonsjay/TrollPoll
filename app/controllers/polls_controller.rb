class PollsController < ApplicationController
  def index
    @polls = []
    @polls = Poll.where(:user_id => current_user.id) if !!current_user
    render :json => @polls
  end
  
  def create
    @poll = current_user.polls.build(params[:poll])
    @response_params = params[:responses]
    
    @response_params.each do |response|
      @poll.responses.build(response)
    end
    
    if @poll.save
      render :json => @poll
    else
      render :json => @poll.errors.full_messages
    end
  end
  
end
