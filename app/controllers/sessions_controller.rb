class SessionsController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create, :new]
  before_filter :require_current_user!, :only => [:destroy]

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user.nil?
      render :json => "Invalid Credentials!", :status => 422
    else
      self.current_user = @user
      render :json => @user
    end
  end

  def destroy
    logout_current_user!
    render :json => {}
  end

  def new
    render :new
  end
end
