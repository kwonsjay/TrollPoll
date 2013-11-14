class ResponsesController < ApplicationController
  
  def index
    @responses = Response.all
    render :json => @responses
  end
  
  def create
    @response = Response.new(params[:response])
    if @response.save
      render :json => @response
    else
      render :json => @response.errors.full_messages, :status => 422
    end
  end
end
