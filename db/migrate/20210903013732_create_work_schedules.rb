class CreateWorkSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :work_schedules do |t|
      t.datetime   :datetime_in
      t.datetime   :datetime_out
      t.boolean    :holiday, null: false, default: false
      t.string     :add_request
      t.references :user,    null: false, foreign_key: true
      t.references :group,   null: false, foreign_key: true
      t.timestamps
    end
  end
end
