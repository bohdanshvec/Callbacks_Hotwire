class Like < ApplicationRecord
  belongs_to :user
  belongs_to :message

  # broadcasts_to ->(like) { "likes" }, inserts_by: :replace

  # after_create_commit -> { broadcast_replace_to "lakes", partial: "messages/message" }

  # after_destroy_commit -> { broadcast_replace_to "lakes", partial: "messages/message" }

end
