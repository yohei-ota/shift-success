FactoryBot.define do
  factory :user do
    transient do
      person { Gimei.name }
    end
    name                  {person}
    email                 {Faker::Internet.free_email}
    password              {'1a' + Faker::Internet.password(min_length: 6)}
    password_confirmation {password}
    hourly_wage           {Faker::Number.between(from: 100, to: 99999)}
    association :group
  end
end