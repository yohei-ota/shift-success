class CreateWorkSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :work_schedules do |t|
      t.time       :datetime_in
      t.time       :datetime_out
      t.boolean    :holiday, default: false
      t.references :user,    null:false, foreign_key: true
      t.references :group,   null:false, foreign_key: true
      t.timestamps
    end
  end
end
