class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.references :user, null: false, unique: false
      t.string :name, null: false, unique: false, index: true
      t.text :body, nill: false
      t.timestamps
    end
  end
end
