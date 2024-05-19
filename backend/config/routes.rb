Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contests do
        member do
          get :votes_summary
        end
        resources :votes, only: [:create]
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
