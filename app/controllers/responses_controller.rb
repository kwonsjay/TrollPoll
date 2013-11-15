class ResponsesController < ApplicationController
  
  def index
    @responses = Response.all
    render :json => @responses
  end
  
  def create
    @response = Response.new(params[:response])
    @response.poll_id = params[:poll_id]
    if @response.save
      render :json => @response
    else
      render :json => @response.errors.full_messages, :status => 422
    end
  end
  
  def update
    @response = Response.find(params[:id])
    if @response.update_attributes(params[:response])
      render :json => @response
    else
      render :json => @response.errors.full_messages
    end
  end
  
  def destroy
    @response = Response.find(params[:id])
    if @response.destroy
      render :json => {}
    else
      render :json => "Unsuccessful Destroy", :status => 422
    end
  end
end
