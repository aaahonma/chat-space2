# README


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user




## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: false, index: true|
|email|integer|null: false, unique: false|
|password|integer|null: false, unique: true|

### Association
- has_many :members
- has_many :messages
- has_many :groups, throuh::members



##groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|sting|null: false, unique: false, index: true|
|body|text|nill: false|

### Association
- has_many: users throuh::members
- has_many: members
- has_many: messages



##変更点
_message.html.haml
    各クラス名を下記の名前に統一
.message
  .upper-message
    .upper-message__user-name
      = message.user.name
    .upper-message__date
      = message.created_at.strftime("%Y/%m/%d %H:%M")
  .lower-meesage
    - if message.content.present?
      %p.lower-message__content
        = message.content


_chat-main.scss
    セレクタの名前を上記「_message.html.haml」のクラス名に合わせる


##画像投稿サイズがデカかったのでbrew install imagemagickを実行したらすでにインストールされていたが他諸々インストールされた
→ resize_to_file[300,300]にしたらOKだった



_form.htmlのチャットメンバーの部分を追加
  .chat-group-form__field.clearfix
    .chat-group-form__field--left
      %label.chat-group-form__label チャットメンバー
    .chat-group-form__field--right#add-member
      /追加したいユーザーを追加する先として指定しやすいように#add-memberとID化しておく
      #chat-group-users
        = f.hidden_field :user_ids, value: current_user.id, multiple: true
        /%input{name: 'chat_group[user_ids][]', type: "hidden"}
        /f.hiddenfieldで定義するとname属性の内容に自動でform_forのモデル名が入ってしまうのでinputタグを使用する
        /name: = paramsで表示するキー名 [モデル名_ids]= 中間テーブルへの
        - group.users.each do |user|
          .chat-group-user.clearfix
            .chat-group-user__name= user.nickname
            .chat-group-user__btn
              .chat-group-user__btn.chat-group-user__btn--remove 削除



