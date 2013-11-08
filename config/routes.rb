TrollPoll::Application.routes.draw do
  resources :users
  resources :polls, :only => [:index, :create, :show, :destroy] do
    resources :responses, :only => [:create, :update]
    resource :favorite, :only => [:create, :destroy]
  end
  resources :favorites, :only => [:index]
  resource :session, :only => [:create, :destroy, :new]
  root :to => "static#root"
end
