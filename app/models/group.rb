class Group < ApplicationRecord
  has_many :admins
  has_many :users
  has_many :work_schedules

  validates :group_name, presence: true, uniqueness: true
end
