class Group < ApplicationRecord
  has_many :admins
  has_many :users

  validates :group_name, presence: true, uniqueness: true
end
