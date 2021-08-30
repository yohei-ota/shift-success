class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def create
    @group = Group.create(group_params)
    render :index
  end

  def index
    @group = Group.find(params[:id])
  end

  private
  def group_params
    params.require(:group).permit(:group_name)
  end
end
