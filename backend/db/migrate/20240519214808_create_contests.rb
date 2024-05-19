class CreateContests < ActiveRecord::Migration[7.1]
  def change
    create_table :contests do |t|
      t.references :first_participant, null: false, foreign_key: { to_table: :participants }
      t.references :second_participant, null: false, foreign_key: { to_table: :participants }

      t.timestamps
    end
  end
end
