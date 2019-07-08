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




## usresテーブル

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










