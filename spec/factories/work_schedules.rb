FactoryBot.define do
  factory :work_schedule do
    datetime_in  {Date.today.days_since(14).beginning_of_week.day}
    datetime_out {Date.today.days_since(14).beginning_of_week.day}
    holiday      {false}
    add_request  {Faker::Lorem.sentence}
    association :user
    association :group
  end
end
