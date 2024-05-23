class AddStatusToContests < ActiveRecord::Migration[7.1]
  def change
    add_column :contests, :status, :boolean
  end
end
