class UsersController < ApplicationController

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
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      render :json => @user
    else
      render :json => @user.errors.full_messages, :status => 422
    end
  end

  def show
    @user = User.find(params[:id])
    render :json => @user
  end
  
  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render :json => {}
    else
      render :json => @user.errors.full_messages, :status => 422
    end
  end
  
end
