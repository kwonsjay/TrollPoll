window.TrollPoll = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TrollPoll.polls = new TrollPoll.Collections.Polls();
		TrollPoll.currentUser = new TrollPoll.Models.User();
		this._installHeader($("#header"));
		new TrollPoll.Routers.TrollRouter($("#content"));
		Backbone.history.start();		
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
