class Like < ApplicationRecord
  belongs_to :user
  belongs_to :message
  
  # broadcasts_to ->(like) { "room_#{like.message.room.id}" }, inserts_by: :replace

  # after_create_commit -> { broadcast_render_later_to "room_#{self.message.room.id}", partial: "messages/message_likes", locals: { message: self.message, initiator: self.user.id } }

  # after_destroy_commit -> { broadcast_render_later_to "room_#{self.message.room.id}", partial: "messages/message_likes", locals: { message: self.message, initiator: self.user.id } }

end
