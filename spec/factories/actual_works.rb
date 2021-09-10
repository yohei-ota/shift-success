FactoryBot.define do
  factory :actual_work do
    user_id             {1}
    date                {2222/12/31}
    datetime_in_actual  {0000}
    datetime_out_actual {1230}
    holiday_actual      {false}
    over_early_time     {0.0}
    association :group
  end
end
