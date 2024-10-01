Rails.application.routes.draw do
  devise_for :users

  resources :rooms, only: %i[index, show]

  resources :messages, only: %i[create show update destroy] do    
    member do
      get 'message_like'
    end
    resource :likes, only: %i[create destroy]
  end

  root 'rooms#index'
end
