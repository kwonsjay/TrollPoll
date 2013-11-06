class ResponsesController < ApplicationController
  def create
    @response = Response.new(params[:response])
    if @response.save
      render :json => @response
    else
      render :json => @response.errors.full_messages
    end
  end
  
  def destroy
    @response = Response.find(params[:id])
    if @response.destroy
      render :json => "successfully destroyed"
    else
      render :json => "cannot destroy!"
    end
  end
  
end
