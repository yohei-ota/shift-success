class ApplicationController < ActionController::Base
  before_action :configure_pemitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(resource)
    case resource
    when User
      user_posts_path
    when Admin
      admin_posts_path
    end
  end


  private
  def configure_pemitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :hourly_wage, :group_name, :pay_day, :dead_line])
    devise_parameter_sanitizer.permit(:edit, keys: [:name, :hourly_wage, :group_name, :pay_day, :dead_line])
    devise_parameter_sanitizer.permit(:update, keys: [:name, :hourly_wage, :group_name, :pay_day, :dead_line])
  end
end
