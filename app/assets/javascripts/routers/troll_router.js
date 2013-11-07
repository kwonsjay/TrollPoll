TrollPoll.Routers.TrollRouter = Backbone.Router.extend({
	initialize: function($content) {
		this.$content = $content
	},
	
	routes: {
		"": "root",
		"login": "loginUser",
		"index": "pollIndex",
		"signup": "registerUser"
	},
	
	root: function() {
		var newRootView = new TrollPoll.Views.RootView({
			
		});
		this._switchView(newRootView);
		this.$content.html(newRootView.render().$el);
	},
	
	loginUser: function() {
		var newLoginView = new TrollPoll.Views.LoginView({
		});
		this._switchView(newLoginView);
		this.$content.html(newLoginView.render().$el);
	},
	
	registerUser: function() {
		var newUserCreation = new TrollPoll.Views.UserCreation({
			
		});
		this._switchView(newUserCreation);
		this.$content.html(newUserCreation.render().$el);
	},
	
	pollIndex: function() {
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