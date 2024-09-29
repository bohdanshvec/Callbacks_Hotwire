class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user

  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user

  validates :body, presence: true

  broadcasts_to ->(message) { "room_#{message.room.id}" }, inserts_by: :prepend

  # after_create_commit -> { broadcast_prepend_to "room_#{self.room.id}", partial: "messages/message", locals: { message: self } }

  # after_update_commit -> { broadcast_replace_to "room_#{self.room.id}", partial: "messages/message", locals: { message: self } }
end
