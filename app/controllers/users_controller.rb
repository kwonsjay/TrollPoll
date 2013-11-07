class UsersController < ApplicationController
  # before_filter :require_current_user!, :only => [:show]
  # before_filter :require_no_current_user!, :only => [:create, :new]

  def create
    @user = User.new(params[:user])
    p @user
    if @user.save
      self.current_user = @user
      render :json => @user
    else
      render :json => @user.errors.full_messages
    end
  end

  def new
    @user = User.new
    render :new
  end

  def show
    if params.include?(:id)
      @user = User.find(params[:id])
      render :show
    else
      render :json => "User not found."
    end
  end
end
