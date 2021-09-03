class WorkSchedulesController < ApplicationController

  def new
    @group = Group.find(params[:id])
    @schedule = WorkSchedule.new
  end

  def create
  end
end
