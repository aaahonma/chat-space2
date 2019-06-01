# README


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|user_id|references|null: false, foreign_key: true, index: true|
|group_id|references|null: false, foreign_key: true, index: true|

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




## usresテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: false, index: true|
|email|integer|null: false, unique: false|
|password|integer|null: false, unique: true|

### Association
- has_many: members
- has_many: messages
- has_many: group, throuh::members



##groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, unique: false|
|name|references|null: false, unique: false, index: true|
|body|text|nill: false|

### Association
- has_many: users throuh::members
- has_many: members
- has_many: messages










