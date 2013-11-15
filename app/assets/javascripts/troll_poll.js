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
		this._installHeader($("#header"));
  },
	_installHeader: function($header) {
		var newheaderView = new TrollPoll.Views.HeaderView({
			model: TrollPoll.currentUser
		});
		$header.html(newheaderView.render().$el);
	}
};

$(document).ready(function(){
  TrollPoll.initialize();
});
