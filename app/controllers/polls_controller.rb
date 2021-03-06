class PollsController < ApplicationController
  def index
    @polls = Poll.all
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
  
  def destroy
    @poll = Poll.find(params[:id])
    if @poll.destroy
      render :json => {}
    else
      render @poll.errors.full_messages, :status => 422
    end
  end
  
  def update
    @poll = Poll.find(params[:id])
    @response_params = params[:responses]
    
    
    
    if @poll.update_attributes(params[:poll])
      render :json => @poll
    else
      render @poll.errors.full_messages, :status => 422
    end
  end
  
  def show
    @poll = Poll.find(params[:id])
    render :json => @poll
  end
end
