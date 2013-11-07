module SessionsHelper
  def current_user
    User.find_by_session_token(session[:session_token])
  end

  def current_user=(user)
    @current_user = user
    session[:session_token] = user.session_token
  end
  
  def user_signed_in?
    return true if @current_user
    return false
  end

  def logout_current_user!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_current_user!
    if current_user.nil?
      render :json => "You must be logged in.", :status => 422
    end
  end
  
  def require_no_current_user!
    unless current_user.nil?
      render :json => "Already logged in!", :status => 422
    end
  end
end
