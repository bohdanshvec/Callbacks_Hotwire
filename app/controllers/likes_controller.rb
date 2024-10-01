class LikesController < ApplicationController

  def create
    # binding.break
    @message = Message.find_by(id: params[:message_id])
    @like = Like.new(user: current_user, message: @message)
    @initiator = current_user.id
    @liked = current_user.liked?(@message)
    @count = 0
    if @like.save
      respond_to do |format|
        format.turbo_stream { Turbo::StreamsChannel.broadcast_render_later_to("room_#{@message.room.id}", template: 'messages/message_likes', locals: { message: @message, initiator: @initiator, liked: @liked, count: @count })}
      end
    end
  end

  def destroy
    # binding.break
    @message = Message.find_by(id: params[:message_id])
    @like = Like.find_by(user: current_user, message: @message)
    @initiator = current_user.id
    @like.destroy
    @liked = current_user.liked?(@message)
    @count = 0
    respond_to do |format|
      format.turbo_stream { Turbo::StreamsChannel.broadcast_render_later_to("room_#{@message.room.id}", template: 'messages/message_likes', locals: { message: @message, initiator: @initiator, liked: @liked, count: @count } )}
    end
  end

end


# class LikesController < ApplicationController
#   def create
#     Likes::CreateService.call current_user, Message.find_by(id: params[:message_id])
#   end

#   def destroy
#     Likes::DestroyService.call current_user, Message.find_by(id: params[:message_id])
#   end
# end