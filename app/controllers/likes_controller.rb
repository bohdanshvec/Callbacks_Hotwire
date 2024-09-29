class LikesController < ApplicationController

  def create
    # binding.break
    @message = Message.find_by(id: params[:message_id])
    @like = Like.new(user: current_user, message: @message)
    @like.save
    @initiator = current_user.id
    @count = 0
    respond_to do |format|
      format.turbo_stream { Turbo::StreamsChannel.broadcast_render_later_to(
          "room_#{@message.room.id}", template: 'messages/message_likes', locals: { message: @message, initiator: @initiator, count: @count })}
    end
  end

  def destroy
    # binding.break
    @message = Message.find_by(id: params[:message_id])
    @like = Like.find_by(user: current_user, message: @message)
    @initiator = current_user.id
    @count = 0
    @like.destroy
    respond_to do |format|
      format.turbo_stream { Turbo::StreamsChannel.broadcast_render_later_to(
        "room_#{@message.room.id}", template: 'messages/message_likes', locals: { message: @message, initiator: @initiator, count: @count } )}
    end
  end

end