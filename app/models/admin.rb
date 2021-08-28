class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :authentication_keys => [:group_name, :email]

  validates :name, :group_name, presence: true
  
  # has_many :daily_reports
  # has_many :messages, dependent: :destroy
  # has_many :user_admin_rooms, dependent: :destroy
  # has_many :rooms, through: :user_admin_rooms
end
