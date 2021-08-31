FactoryBot.define do
  factory :group do
    group_name {Faker::Company.name}
  end
end
