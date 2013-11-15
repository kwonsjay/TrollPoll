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
		"users/:id": "viewUser",
		"users/:id/edit": "editUser",
		"users/:id/polls": "userPolls"
	},
	
	root: function() {
		var newRootView = new TrollPoll.Views.RootView();
		this._switchView(newRootView);
		newRootView.drawChart();
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
	
	viewUser: function(id) {
		if (this.userIru() && id == TrollPoll.currentUser.id) {
			var newUserView = new TrollPoll.Views.UserView({
				model: TrollPoll.currentUser
			});
			this._switchView(newUserView);
		}
		else {
			Backbone.history.navigate("/index", {trigger: true});
			this.invalidPermissions();
		}
	},
	
	createPoll: function() {
		if (this.userIru()) {
			var newPollCreation = new TrollPoll.Views.PollCreation({
				model: new TrollPoll.Models.Poll()
			});
			this._switchView(newPollCreation);
		}
		else {
			Backbone.history.navigate("/", {trigger: true});
		}
	},
	
	displayPoll: function(id) {
		var poll = TrollPoll.polls.get(id);
		if (!!poll) {
			var newPollDetail = new TrollPoll.Views.PollDetail({
				model: poll,
			});
			this._switchView(newPollDetail);
			if (poll.get('voted')) {
				newPollDetail.drawChart();
			}
		}
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
		if (cuid != id) {
			Backbone.history.navigate("/index", {trigger: true});
			this.invalidPermissions();
		}
		else {
			var polls = TrollPoll.polls.where({user_id: cuid});
			var newCollection = new TrollPoll.Collections.Polls(polls);
			var newPollIndex = new TrollPoll.Views.PollIndex({
				collection: newCollection,
				title: "My"
			});
			this._switchView(newPollIndex);
		}
	},
	
	editPoll: function(id) {
		var cuid = TrollPoll.currentUser.id;
		var poll = TrollPoll.polls.get(id);
		if (this.userIru() && poll.get('user_id') == cuid) {
			var newPollEdit = new TrollPoll.Views.PollCreation({
				model: poll
			});
			this._switchView(newPollEdit);
		}
		else {
			Backbone.history.navigate("/polls/" + id, {trigger: true});
			this.invalidPermissions();
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
	},
	
	invalidPermissions: function() {
		$("#errors").html("<i class='icon-ios7-locked'></i>").fadeIn("slow").delay(2000).fadeOut("slow");
	}
});