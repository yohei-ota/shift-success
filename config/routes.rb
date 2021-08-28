Rails.application.routes.draw do
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

  root to: "starts#index"
  resources :user_posts, only: [:index]
  resources :admin_posts, only: [:index]
end
