Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'contest/active', to: 'contests#show_active'
      get 'contest/active/votes', to: 'contests#votes_summary'
      post 'contest/active/vote', to: 'votes#create'

    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
