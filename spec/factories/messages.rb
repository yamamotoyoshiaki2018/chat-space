FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/yanagisawa.jpeg")
    user
    group
  end
end
