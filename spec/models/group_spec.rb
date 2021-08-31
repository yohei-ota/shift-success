require 'rails_helper'

RSpec.describe Group, type: :model do
  before do
    @group = FactoryBot.build(:group)
  end

  describe "グループ登録" do
    context "グループ登録できるとき" do
      it "グループ名が存在すれば登録できる" do
        expect(@group).to be_valid
      end
    end

    context "新規登録できないとき" do
      it "グループ名が空では登録できない" do
        @group.group_name = ""
        @group.valid?
        expect(@group.errors.full_messages).to include("Group name can't be blank")
      end
    end
  end
end