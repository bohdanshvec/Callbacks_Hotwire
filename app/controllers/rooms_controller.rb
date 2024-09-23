class RoomsController < ApplicationController
  # before_action :authenticate_user!, only: %i[show]
  before_action :set_room, only: %i[show]
  # before_action :user_roommember, only: %i[show]

  def index
    @rooms = Room.all
  end

  def show
    @message = Message.new(room: @room)
  end

  private

  def set_room
    @room = Room.find_by(id: params[:id])
  end

  def user_roommember
    unless current_user.member_of?(@room)
      flash[:warning] = 'You are not a member of this room.'
      redirect_to root_path
    end
  end
end