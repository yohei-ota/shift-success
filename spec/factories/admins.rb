FactoryBot.define do
  factory :admin do
    transient do
      person { Gimei.name }
    end
    name                  {person}
    email                 {Faker::Internet.free_email}
    password              {'1a' + Faker::Internet.password(min_length: 6)}
    password_confirmation {password}
    group_name            {Faker::Lorem.sentence}
    pay_day               {Faker::Date.between(from: '2020-01-01', to: '2200-01-01')}
    dead_line             {Faker::Date.between(from: '2020-01-01', to: '2200-01-01')}
  end
end