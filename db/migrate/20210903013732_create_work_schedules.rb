class CreateWorkSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :work_schedules do |t|

      t.timestamps
    end
  end
end
