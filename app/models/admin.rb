class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :authentication_keys => [:code, :email]

  validates :name, :code, presence: true
  validates :code, format: { with: /\A[0-9]+\z/ } ,length: { minimum: 4 }
  PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?[\d])[a-z\d]+\z/i.freeze
  validates_format_of :password, with: PASSWORD_REGEX, message: "には半角英数字で入力してください"
  validates :pay_day, :dead_line, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 32 }
  validates :pay_day, :dead_line, format: { with: /\A[0-9]+\z/ }

  belongs_to :group, optional: true
  # has_many :daily_reports
  # has_many :messages, dependent: :destroy
  # has_many :user_admin_rooms, dependent: :destroy
  # has_many :rooms, through: :user_admin_rooms
end
