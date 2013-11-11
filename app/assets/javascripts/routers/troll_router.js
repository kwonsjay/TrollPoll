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
		"polls/:id/edit": "editPoll",
		"users/:id/edit": "editUser",
		"users/:id/polls": "userPolls"
	},
	
	root: function() {
		var newRootView = new TrollPoll.Views.RootView();
		this._switchView(newRootView);
	},
	
	loginUser: function() {
		if (!this.userIru()) {
			var newLoginView = new TrollPoll.Views.LoginView();
			this._switchView(newLoginView);
		}
		else {
			var cuid = TrollPoll.currentUser.id;
			Backbone.history.navigate("/users/" + cuid + "/polls", {trigger: true});
		}
	},
	
	registerUser: function() {
		if (!this.userIru()) {
			var newUserCreation = new TrollPoll.Views.UserCreation();
			this._switchView(newUserCreation);
		}
		else {
			var cuid = TrollPoll.currentUser.id;
			Backbone.history.navigate("/users/" + cuid + "/polls", {trigger: true});
		}
	},
	
	createPoll: function() {
		if (this.userIru()) {
			var newPollCreation = new TrollPoll.Views.PollCreation();
			this._switchView(newPollCreation);
		}
		else {
			Backbone.history.navigate("/", {trigger: true});
		}
	},
	
	displayPoll: function(id) {
		var newPollDetail = new TrollPoll.Views.PollDetail({
			model: TrollPoll.polls.get(id),
		});
		this._switchView(newPollDetail);
	},
	
	pollIndex: function() {
		var polls = TrollPoll.polls.where({private: false});
		var newCollection = new TrollPoll.Collections.Polls(polls);
		var newPollIndex = new TrollPoll.Views.PollIndex({
			collection: newCollection,
			title: "Public"
		});
		this._switchView(newPollIndex);
	},
	
	userPolls: function(id) {
		var cuid = TrollPoll.currentUser.id;
		var polls = TrollPoll.polls.where({user_id: cuid});
		var newCollection = new TrollPoll.Collections.Polls(polls);
		var newPollIndex = new TrollPoll.Views.PollIndex({
			collection: newCollection,
			title: "My"
		});
		this._switchView(newPollIndex);
	},
	
	editPoll: function(id) {
		var cuid = TrollPoll.currentUser.id;
		var poll = TrollPoll.polls.get(id);
		if (this.userIru() && poll.get('user_id') == cuid) {
			var newPollEdit = new TrollPoll.Views.PollEdit({
				model: poll
			});
			this._switchView(newPollEdit);
		}
		else {
			Backbone.history.navigate("/polls/" + id, {trigger: true});
		}
	},
	
	editUser: function(id) {
		var newUserDetail = new TrollPoll.Views.UserDetail();
		this._switchView(newUserDetail);
	},
	
	userIru: function() {
		var cuid = TrollPoll.currentUser.id;
		return !!cuid;
	},
	
	_switchView: function(newView) {
		if (this._prevView) {
			this._prevView.remove();
		}
		this._prevView = newView;
		this.$content.html(newView.render().$el);
	}
});