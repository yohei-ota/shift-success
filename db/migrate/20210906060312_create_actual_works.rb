class CreateActualWorks < ActiveRecord::Migration[6.0]
  def change
    create_table :actual_works do |t|
      t.integer    :user_id,             null: false
      t.date       :date,                null: false
      t.string     :datetime_in_actual
      t.string     :datetime_out_actual
      t.boolean    :holiday_actual,      null: false, default: false
      t.float      :over_early_time,     default: 0
      t.references :group,               null: false, foreign_key: true
      t.timestamps
    end
  end
end
