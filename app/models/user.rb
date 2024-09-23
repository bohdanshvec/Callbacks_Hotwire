class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :room_members, dependent: :destroy
  has_many :rooms, through: :room_members
  has_many :messages, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_messages, through: :likes, source: :message

  def member_of?(room)
    room.users.include?(self)
  end

  def name
    email.split('@').first
  end
end
