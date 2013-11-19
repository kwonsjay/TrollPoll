window.TrollPoll = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		var currentUser = JSON.parse($("#bootstrapped_user").html());
		TrollPoll.currentUser = new TrollPoll.Models.User(currentUser.user);
    TrollPoll.polls = new TrollPoll.Collections.Polls();
		TrollPoll.polls.fetch({
			success: function() {
				new TrollPoll.Routers.TrollRouter($("#content"));
				Backbone.history.start();
			}
		});
		this._installSidebar($("#sidebar"));
		this._installHeader($("#header"));
  },
	_installHeader: function($header) {
		TrollPoll.headerView = new TrollPoll.Views.HeaderView({
			model: TrollPoll.currentUser
		});
		$header.html(TrollPoll.headerView.render().$el);
		// var newHeaderView = new TrollPoll.Views.HeaderView({
		// 	model: TrollPoll.currentUser
		// });
		// $header.html(newHeaderView.render().$el);
	},
	_installSidebar: function($sidebar) {
		var newSidebarView = new TrollPoll.Views.SidebarView();
		$sidebar.html(newSidebarView.render().$el);
	}
};

$(document).ready(function(){
  TrollPoll.initialize();
});
