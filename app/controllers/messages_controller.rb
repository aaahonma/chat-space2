class MessagesController < ApplicationController

  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = Message.create(content: message_params[:content], image: message_params[:image], group_id: @group.id, user_id: current_user.id)
    respond_to do |format|
      format.html { redirect_to group_messages_path(@group)  }
      format.json
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end

#message_paramsで定義されたものを入れる.11行目に。
#Group.find(1)を見つけてね。２４行目。@groupに現在表示されているgroupを代入されている。

#１１行目でmessageを作る。どんなメッセージですかという情報を入れる。gruoup_id: @group

