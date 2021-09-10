class ActualWork < ApplicationRecord
  belongs_to :group


  with_options presence: true do
    validates :user_id, :date
  end
  validates :holiday_actual, inclusion: {in: [true, false]}
  validate :each_duplicate_check
  validate :duplicate_check
  validate :duplicate_check_another
  validate :time_check
  # validate :now_time_check

  # シフト希望があるなら開始と終了両方ないといけない
  def each_duplicate_check
    errors.add(:datetime_in_actual, "希望時間は両方入力してください") if (self.datetime_in_actual.present? && self.datetime_out_actual.blank?) || (self.datetime_in_actual.blank? && self.datetime_out_actual.present?)
  end
  # 休み希望とシフト希望両立してはいけない
  def duplicate_check
    errors.add(:holiday_actual, "勤務希望と休み希望が重複しています") if (self.holiday_actual == false) && (self.datetime_in_actual == "" || self.datetime_out_actual == "")
  end
  def duplicate_check_another
    errors.add(:holiday_actual, "勤務希望と休み希望が重複しています") if (self.holiday_actual == true) && (self.datetime_in_actual.present? || self.datetime_out_actual.present?)
  end
  # 開始と終了時刻に矛盾があってはいけない
  def time_check
    if self.datetime_in_actual.present? || self.datetime_out_actual.present?
      errors.add(:datetime_out_actual, "は勤務開始日時より遅い日時を入力してください") if self.datetime_in_actual > self.datetime_out_actual
    end
  end
  # 過去の日時は受け付けない
  # def now_time_check
  #   if self.datetime_in_actual.present? || self.datetime_out_actual.present?
  #     errors.add(:datetime_in_actual, "日時を正しく入力してください") if self.datetime_in_actual < DateTime.now
  #   end
  # end

end
