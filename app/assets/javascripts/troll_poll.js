window.TrollPoll = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TrollPoll.polls = new TrollPoll.Collections.Polls();
		TrollPoll.polls.fetch({
			success: function() {
				new TrollPoll.Routers.TrollRouter($("#content"));
				Backbone.history.start();
			}
		});
  }
};

$(document).ready(function(){
  TrollPoll.initialize();
});
