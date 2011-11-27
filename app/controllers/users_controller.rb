class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = current_user
  end

  def save
    user = User.find(params[:id]);
    user.message = params[:message];
    user.returns = params[:time];
    user.save();
    respond_to do |format|
      format.json { render :json => "saved" }
    end
  end

end
