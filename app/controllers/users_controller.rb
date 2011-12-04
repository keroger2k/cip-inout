class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = current_user
  end

  def save
    user = User.find(params[:id]);
    user.message = params[:message]
    user.returns = params[:returns]
    user.available = params[:available]
    user.save();
    respond_to do |format|
      format.json { render :json => "saved" }
    end
  end

  def update
    @users = User.where('email != ?', current_user.email)
    respond_to do |format|
      format.json { render :json => @users }
    end
  end
end
