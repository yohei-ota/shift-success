require 'rails_helper'

RSpec.describe ActualWork, type: :model do
  before do
    @actual_work = FactoryBot.build(:actual_work)
  end

  describe "シフト作成・保存" do
    context "シフト保存できるとき" do
      it "必要項目が存在すれば保存できる" do
        expect(@actual_work).to be_valid
      end
      it "holiday_actualがtrueの時、datetime_in_actual,datetime_out_actualがなくても保存できる" do
        @actual_work.holiday_actual = true
        @actual_work.datetime_in_actual = ""
        @actual_work.datetime_out_actual = ""
        expect(@actual_work).to be_valid
      end
      it "datetime_in_actual < datetime_out_actualなら保存できる" do
        @actual_work.datetime_in_actual = DateTime.now + 1
        @actual_work.datetime_out_actual = DateTime.now + 2
        expect(@actual_work).to be_valid
      end
    end

    context "シフト保存できないとき" do
      it "user_idが空では保存できない" do
        @actual_work.user_id = ""
        @actual_work.valid?
        expect(@actual_work.errors.full_messages).to include("User can't be blank")
      end
      it "dateが空では保存できない" do
        @actual_work.date = ""
        @actual_work.valid?
        expect(@actual_work.errors.full_messages).to include("Date can't be blank")
      end
      it "holiday_actualが空では保存できない" do
        @actual_work.holiday_actual = ""
        @actual_work.valid?
        expect(@actual_work.errors.full_messages).to include("Holiday actual is not included in the list")
      end
      it "datetime_in_actual > datetime_out_actualだと保存できない" do
        @actual_work.datetime_in_actual = DateTime.now + 2
        @actual_work.datetime_out_actual = DateTime.now + 1
        @actual_work.valid?
        expect(@actual_work.errors.full_messages).to include("Datetime out actual は勤務開始日時より遅い日時を入力してください")
      end
      it "holiday_actualがtrueの時datetime_in_actualがあると保存できない" do
        @actual_work.holiday_actual = true
        @actual_work.valid?
        expect(@actual_work.errors.full_messages).to include("Holiday actual 勤務希望と休み希望が重複しています")
      end
      it "holiday_actualがtrueの時datetime_out_actualがあると保存できない" do
        @actual_work.holiday_actual = true
        @actual_work.valid?
        expect(@actual_work.errors.full_messages).to include("Holiday actual 勤務希望と休み希望が重複しています")
      end
    end
  end
end
