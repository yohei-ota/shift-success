class GroupsController < ApplicationController
  
  def index
    @group = Group.find(params[:format])
  end

  
  def new
    @group = Group.new
  end

  def create
    if Group.exists?(group_params)
      @group = Group.where(group_name: group_params[:group_name])
      redirect_to groups_path(@group.ids)
    else
      @group = Group.new(group_params)
      if @group.valid?
        @group.save
        redirect_to groups_path(@group.id)
      else
        render :new
      end
    end

  end


  private
  def group_params
    params.require(:group).permit(:group_name)
  end
end
