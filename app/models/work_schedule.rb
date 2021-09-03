class WorkSchedule < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validate :each_duplicate_check
  validate :duplicate_check
  validate :time_check

  # シフト希望があるなら開始と終了両方ないといけない
  def each_duplicate_check
    errors.add(:datetime_in, "希望時間は両方入力してください") if (self.datetime_in.present? && self.datetime_out.blank?) || (self.datetime_in.blank? && self.datetime_out.present?)
  end
  # 休み希望とシフト希望両立してはいけない
  def duplicate_check
    errors.add(:holiday, "勤務希望と休み希望が重複しています") if (self.holiday == true) && (self.datetime_in.exist? || self.datetime_out.exist?)
  end
  # 開始と終了時刻に矛盾があってはいけない
  def time_check
    # errors.add(:datetime_out, "は勤務開始日時より遅い日時を入力してください") if self.datetime_in > self.datetime_out
  end
end
