class UsersController < ApplicationController

  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.json { render :json => @users }
    end
  end

  def save
    @user = User.find(params[:id]);
    @user.message = params[:message]
    @user.returns = params[:returns]
    @user.available = params[:available]
    @user.save();
    respond_to do |format|
      format.js { render :json => "success".to_json  }
    end
  end
  
end
