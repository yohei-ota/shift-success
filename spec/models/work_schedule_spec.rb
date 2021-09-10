require 'rails_helper'

RSpec.describe WorkSchedule, type: :model do
  before do
    @work_schedule = FactoryBot.build(:work_schedule)
  end

  describe "シフト申請希望" do
    context "シフト申請できるとき" do
      it "必要項目が存在すれば申請できる" do
        expect(@work_schedule).to be_valid
      end
      it "datetime_in,datetime_outがなくても申請できる" do
        @work_schedule.datetime_in = ""
        @work_schedule.datetime_out = ""
        expect(@work_schedule).to be_valid
      end
      it "add_requestがなくても申請できる" do
        @work_schedule.add_request = ""
        expect(@work_schedule).to be_valid
      end
      it "datetime_in < datetime_outなら申請できる" do
        @work_schedule.datetime_in = DateTime.now + 1
        @work_schedule.datetime_out = DateTime.now + 2
        expect(@work_schedule).to be_valid
      end
    end

    context "シフト希望申請できないとき" do
      it "holidayが空では申請できない" do
        @work_schedule.holiday = ""
        @work_schedule.valid?
        expect(@work_schedule.errors.full_messages).to include("Holiday is not included in the list")
      end
      it "datetime_in > datetime_outだと申請できない" do
        @work_schedule.datetime_in = DateTime.now + 2
        @work_schedule.datetime_out = DateTime.now + 1
        @work_schedule.valid?
        expect(@work_schedule.errors.full_messages).to include("Datetime out は勤務開始日時より遅い日時を入力してください")
      end
      # it "holidayがtrueの時datetime_inがあると申請できない" do
      #   @work_schedule.holiday = true
      #   @work_schedule.valid?
      #   expect(@work_schedule.errors.full_messages).to include("hoge")
      # end
      # it "holidayがtrueの時datetime_outがあると申請できない" do
      #   @work_schedule.holiday = true
      #   @work_schedule.valid?
      #   expect(@work_schedule.errors.full_messages).to include("hoge")
      # end
    end
  end
end
