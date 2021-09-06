class CreateActualWorks < ActiveRecord::Migration[6.0]
  def change
    create_table :actual_works do |t|
      t.datetime   :datetime_in_actual,  null: false
      t.datetime   :datetime_out_autual, null: false
      t.boolean    :holiday_actual,      null: false
      t.float      :over_early_time,     null: false, default: 0
      t.references :user,                null: false, foreign_key: true
      t.references :group,               null: false, foreign_key: true
      t.timestamps
    end
  end
end
