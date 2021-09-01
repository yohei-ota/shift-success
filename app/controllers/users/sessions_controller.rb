# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  before_action :permmit_user, only:[:create]
  # GET /resource/sign_in
  # def new
  #   super
  # end

  
  # def create
    
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
  private
  def permmit_user
    if current_user.blank?
      redirect_to action: :new
    elsif current_user.group_id != params[:id].to_i
      sign_out_and_redirect(current_user)
    end
  end
end
