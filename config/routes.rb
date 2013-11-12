TrollPoll::Application.routes.draw do
  resources :users
  resources :polls, :only => [:index, :create, :show, :destroy, :update] do
    resources :votes, :only => [:index]
    resources :responses, :only => [:create, :update]
    resources :favorites, :only => [:create, :destroy]
  end
  resources :votes, :only => [:create]
  resources :favorites, :only => [:index]
  resource :session, :only => [:create, :destroy, :new]
  
  post "/sms", to: "votes#sms"
  root :to => "static#root"
end
