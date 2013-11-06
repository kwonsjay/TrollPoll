class PollsController < ApplicationController
  def index
    @polls = Poll.where(:user_id => current_user.id)
    render :json => @polls
  end
end
