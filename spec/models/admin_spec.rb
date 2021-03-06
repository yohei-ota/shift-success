require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @admin = FactoryBot.build(:admin)
  end

  describe "管理ユーザー新規登録" do
    context "新規登録できるとき" do
      it "必要項目が存在すれば登録できる" do
        expect(@admin).to be_valid
      end
      it "passwordとpassword_confirmationが6文字以上で英数字混合なら登録できる" do
        @admin.password = "123abc"
        @admin.password_confirmation = "123abc"
        expect(@admin).to be_valid
      end
      it "codeが4桁の半角数字なら登録できる" do
        @admin.code = "1234"
        expect(@admin).to be_valid
      end
      it "codeが0から始まる数字でも登録できる" do
        @admin.code = "0123"
        expect(@admin).to be_valid
      end
    end

    context "新規登録できないとき" do
      it "nameが空では登録できない" do
        @admin.name = ""
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Name can't be blank")
      end
      it "emailが空では登録できない" do
        @admin.email = ""
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Email can't be blank")
      end
      it "emailに@が含まれていなければ登録できない" do
        @admin.email = "abc"
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Email is invalid")
      end
      it "passwordが空では登録できない" do
        @admin.password = ""
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Password can't be blank")
      end
      it "passwordとpassword_confirmationが不一致では登録できない" do
        @admin.password = "123abc"
        @admin.password_confirmation = "456def"
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Password confirmation doesn't match Password")
      end
      it "passwordが5文字以下では登録できない" do
        @admin.password = "123ab"
        @admin.password_confirmation = "123ab"
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Password is too short (minimum is 6 characters)")
      end
      it "passwordが英字のみでは登録できない" do
        @admin.password = "abcdef"
        @admin.password_confirmation = "abcdef"
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Password には半角英数字で入力してください")
      end
      it "passwordが全角だと登録できない" do
        @admin.password = "１２３ａｂｃ"
        @admin.password_confirmation = "１２３ａｂｃ"
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Password には半角英数字で入力してください")
      end
      it "codeが空では登録できない" do
        @admin.code = ""
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Code can't be blank")
      end
      it "codeが0未満では登録できない" do
        @admin.code = "-1234"
        @admin.valid?
        expect(@admin.errors.full_messages).to include("Code is invalid")
      end
      it "重複したemailが存在すれば登録できない" do
        @admin.save
        another = FactoryBot.build(:admin)
        another.email = @admin.email
        another.valid?
        expect(another.errors.full_messages).to include("Email has already been taken")
      end
    end
  end
end