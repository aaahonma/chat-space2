class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name, null: false, unique: false, index: true
      t.integer :email, null: false, unique: false
      t.integer :password, null: false, unique: true
      t.timestamps
    end
  end
end
