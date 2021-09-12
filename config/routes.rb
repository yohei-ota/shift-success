Rails.application.routes.draw do
  root to: "groups#new"
  resources :groups, only: [:index, :new, :create] do
    member do
      devise_for :admins, controllers: {
        sessions: 'admins/sessions',
        password: 'admins/passwords',
        registrations: 'admins/registrations'
      }
      devise_for :users, controllers: {
        sessions: 'users/sessions',
        password: 'users/passwords',
        registrations: 'users/registrations'
      }

      resources :user_posts, only: [:index]
      resources :admin_posts, only: [:index]
      resources :work_schedules, only: [:new, :create]
      resources :actual_works, only: [:new, :create, :edit, :update]
    end
  end
end
