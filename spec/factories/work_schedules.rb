FactoryBot.define do
  factory :work_schedule do
    datetime_in  {DateTime.now + 1}
    datetime_out {DateTime.now + 2}
    holiday      {false}
    add_request  {Faker::Lorem.sentence}
    association :user
    association :group
  end
end
