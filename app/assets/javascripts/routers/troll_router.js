TrollPoll.Routers.TrollRouter = Backbone.Router.extend({
	initialize: function($content) {
		this.$content = $content
	},
	
	routes: {
		"": "root",
		"login": "loginUser",
		"index": "pollIndex",
		"signup": "registerUser",
		"polls/new": "createPoll",
		"polls/:id": "displayPoll",
		"users/:id": "editUser",
		"users/:id/polls": "pollIndex"
	},
	
	root: function() {
		var newRootView = new TrollPoll.Views.RootView();
		this._switchView(newRootView);
	},
	
	loginUser: function() {
		var newLoginView = new TrollPoll.Views.LoginView();
		this._switchView(newLoginView);
	},
	
	registerUser: function() {
		var newUserCreation = new TrollPoll.Views.UserCreation();
		this._switchView(newUserCreation);
	},
	
	createPoll: function() {
		var newPollCreation = new TrollPoll.Views.PollCreation();
		this._switchView(newPollCreation);
	},
	
	displayPoll: function(id) {
		var newPollDetail = new TrollPoll.Views.PollDetail({
			model: TrollPoll.polls.get(id)
		});
		this._switchView(newPollDetail);
	},
	
	pollIndex: function() {
		var newPollIndex = new TrollPoll.Views.PollIndex({
			collection: TrollPoll.polls
		});
		this._switchView(newPollIndex);
	},
	
	_switchView: function(newView) {
		if (this._prevView) {
			this._prevView.remove();
		}
		this._prevView = newView;
		this.$content.html(newView.render().$el);
	}
});