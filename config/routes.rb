TrollPoll::Application.routes.draw do
  resources :users do
    resources :favorites, :only => [:index]
  end
  resources :polls, :only => [:index, :create, :show, :destroy] do
    resources :responses, :only => [:create, :update]
    resource :favorite, :only => [:create, :destroy]
  end
  resource :session, :only => [:create, :destroy, :new]
  root :to => "static#root"
end
