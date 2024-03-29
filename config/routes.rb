Rails.application.routes.draw do
  devise_for :users
  root to: 'groups#index' #rootは初期設定のアクション
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end