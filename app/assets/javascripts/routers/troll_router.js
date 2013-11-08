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
		"polls/:id": "displayPoll"
	},
	
	root: function() {
		var newRootView = new TrollPoll.Views.RootView();
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
	
	createPoll: function() {
		var newPollCreation = new TrollPoll.Views.PollCreation({
			
		});
		this._switchView(newPollCreation);
		this.$content.html(newPollCreation.render().$el);
	},
	
	displayPoll: function(id) {
		var that = this;
		var newFavorite = new TrollPoll.Models.Favorite({poll_id: id});
		newFavorite.fetch({
			success: function(model) {
				var favoritable;
				if (!model.id) {
					favoritable = true;
				}
				else {
					favoritable = false;
				}
				var newPollDetail = new TrollPoll.Views.PollDetail({
					model: TrollPoll.polls.get(id),
					favoritable: favoritable
				});
				that._switchView(newPollDetail);
				that.$content.html(newPollDetail.render().$el);
			}
		});
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