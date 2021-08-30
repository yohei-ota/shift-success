class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def create
    if Group.exists?(group_params)
      @group = Group.where(group_name: group_params[:group_name])
      redirect_to groups_path(@group.ids)
    else
      @group = Group.create(group_params)
      redirect_to groups_path(@group.id)
    end

  end

  def index
    @group = Group.find(params[:format])
  end

  private
  def group_params
    params.require(:group).permit(:group_name)
  end
end
