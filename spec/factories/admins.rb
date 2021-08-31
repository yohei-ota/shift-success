FactoryBot.define do
  factory :admin do
    transient do
      person { Gimei.name }
    end
    name                  {person}
    email                 {Faker::Internet.free_email}
    password              {'1a' + Faker::Internet.password(min_length: 6)}
    password_confirmation {password}
    code                  {Faker::Number.leading_zero_number(digits: 4)}
    pay_day               {Faker::Number.between(from: 1, to: 31)}
    dead_line             {Faker::Number.between(from: 1, to: 31)}
    association :group
  end
end