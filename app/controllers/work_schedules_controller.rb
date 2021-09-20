class WorkSchedulesController < ApplicationController

  def new
    @today = Date.today
    @group = Group.find(params[:id])
    @schedules = WorkScheduleCollection.new
    @works = ActualWork.where(group_id: current_user.group_id).where(user_id: current_user.id).where("date >= ?", Date.today.month).order("date ASC")
  end

  def create
    @today = Date.today
    @group = Group.find(params[:id])
    @schedules = WorkScheduleCollection.new(schedule_collections_params)
    WorkScheduleCollection::COLLECTION_NUM.times do |i| #非表示にして月初になっている日付を「本日」から7日間分に変更
      @schedules.collections[i].datetime_in += (@today.day + 14 + i - 1) * 60 * 60 * 24
      @schedules.collections[i].datetime_out += (@today.day + 14 + i - 1) * 60 * 60 * 24
    end
    if @schedules.save
      redirect_to user_posts_path
    else
      render :new
    end
  end


  private

  def schedule_collections_params
    params
      .require(:work_schedule_collection)
      .permit({collections_attributes: [WorkScheduleCollection::REGISTRABLE_ATTRIBUTES]}, :add_request)
      .merge(user_id: current_user.id, group_id: params[:id])
  end
end
