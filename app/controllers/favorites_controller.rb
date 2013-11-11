class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.where(:user_id => current_user.id)
    render :json => @favorites
  end
  
  def create
    @favorite = current_user.favorites.build(params[:favorite])
    @favorite.poll_id = params[:poll_id]
    p @favorite
    if @favorite.save
      render :json => @favorite
    else
      render :json => @favorite.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    @favorite = Favorite.find_by_poll_id_and_user_id(params[:poll_id], current_user.id)
    if @favorite.destroy
      render :json => {}
    else
      render :json => "Request Failed.", :status => 422
    end
  end
end
