class Group < ApplicationRecord
  has_many :admins
  has_many :users
end
