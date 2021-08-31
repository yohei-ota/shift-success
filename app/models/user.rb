class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true
  PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?[\d])[a-z\d]+\z/i.freeze
  validates_format_of :password, with: PASSWORD_REGEX, message: "には半角英数字で入力してください"
  
  belongs_to :group, optional: true
  # has_many :work_schedules
  # has_many :messages, dependent: :destroy
  # has_many :user_admin_rooms, dependent: :destroy
  # has_many :rooms, through: :user_admin_rooms
end
