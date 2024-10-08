class MessagesController < ApplicationController
  
  def create
    @message = current_user.messages.build(message_params)

    if @message.save
      respond_to do |format|
        format.html { redirect_to products_path, notice: "Message was successfully created." }
        format.turbo_stream { flash.now[:notice] = "Message was successfully created." }
      end
    else
      @room = @message.room
      render 'rooms/show'
    end
  end
  def show
    @message = Message.find_by(id: params[:id])
    render partial: 'message', locals: { message: @message }
  end

  # def edit
  #   @message = Message.find_by(id: params[:id])
  # end

  def update
    @message = Message.find_by(id: params[:id])
    @message.touch
  end

  def message_liked
    @message = Message.find_by(id: params[:id])
    @liked = current_user.liked?(@message)
    render json: { liked: @liked }
  end

  private

  def message_params
    params.require(:message).permit(:room_id, :body)
  end
end