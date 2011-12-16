class UsersController < ApplicationController
  respond_to :html, :json

  def index
    @users = User.all
    respond_with(@users);
  end

  def save
    @user = User.find(params[:id]);
    @user.update_attributes(params[:user])
    @user.returns = params[:returns]
    @user.available = params[:available]
    @user.message = params[:message]
    @user.save();
    respond_to do |format|
      format.js { render :json => "success".to_json  }
    end
  end
  
end
