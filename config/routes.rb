Rails.application.routes.draw do

  root 'setlists#index'

  resources :setlists
  resources :songs

  get 'setlists/:id/songs/new', to: 'setlists#new_song', as: :new_setlist_song
  get 'setlists/:id/songs/:song_id', to: 'songs#show_setlist_song', as: :setlist_song
  post '/setlists/:id/songs/new', to: 'setlists#add_song', as: :add_setlist_song
  delete '/setlists/:id/songs/:song_id', to: 'setlists#remove_song', as: :remove_song

  get '/songs/:id/setlists/new', to: 'songs#add_setlist', as: :add_setlist
  # probably won't need this route.  setlists not explicitly added to songs by user (yet)
  post '/songs/:id/setlists/new', to: 'songs#add_setlist'
  delete '/songs/:id/setlists/:setlist_id', to: 'setlists#add_song', as: :remove_setlist

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
