class WorkSchedulesController < ApplicationController

  def new
    @today = Date.today
    @group = Group.find(params[:id])
    @schedules = WorkScheduleCollection.new
  end

  def create
    @today = Date.today
    @group = Group.find(params[:id])
    @schedules = WorkScheduleCollection.new(schedule_collections_params)
    # binding.pry
    if @schedules.save
      redirect_to user_posts_path
    else
      render :new
    end
  end

  private

  # def c_params
  #   params.require(:work_schedule).permit(:datetime_in, :datetime_out, :holiday).merge(user_id: current_user.id, group_id: params[:id])
  # end
  def schedule_collections_params
    params
      .require(:work_schedule_collection)
      .permit(collections_attributes: WorkScheduleCollection::REGISTRABLE_ATTRIBUTES)
      .merge(user_id: current_user.id, group_id: params[:id])
  end
end