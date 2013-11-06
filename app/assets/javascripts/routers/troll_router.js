TrollPoll.Routers.TrollRouter = Backbone.Router.extend({
	initialize: function($content) {
		this.$content = $content
	},
	
	routes: {
		"login": "loginUser",
		"index": "pollIndex"
	},
	
	loginUser: function() {
		var newLogIn = new TrollPoll.Views.LogIn({
		});
	},
	
	pollIndex: function() {
		console.log("INININININI");
		var newPollIndex = new TrollPoll.Views.PollIndex({
			collection: TrollPoll.polls
		});
		this._switchView(newPollIndex);
		this.$content.html(newPollIndex.render().$el);
	},
	
	_switchView: function(newView) {
		if (this._prevView) {
			this._prevView.remove();
		}
		this._prevView = newView;
	}
});