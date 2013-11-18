TrollPoll.Views.HeaderView = Backbone.View.extend({
	template: JST["global/header"],
	
	events: {
		"click .signin": "signIn",
		"click .signout": "signOut",
		"click .profile": "viewUser",
		"click .indexlink": "viewIndex",
		"click .signup": "redirectSignup"
	},
	
	initialize: function() {
		this.listenTo(this.model, "change remove reset", this.render);
	},
	
	signIn: function() {
		Backbone.history.navigate("/login", {trigger: true});
	},
	
	signOut: function() {
		$.ajax({
			type: "DELETE",
			url: "/session",
			success: function(data) {
				TrollPoll.currentUser.clear();
				TrollPoll.polls.reset([]);
				Backbone.history.navigate("/", {trigger: true});
			},
			error: function(xhr, status, error) {
				alert(xhr.responseText);
			}
		});
	},
	
	viewUser: function() {
		Backbone.history.navigate("/users/" + TrollPoll.currentUser.id + "/polls", {trigger: true});
	},
	
	viewIndex: function() {
		Backbone.history.navigate("/index", {trigger: true});
	},
	
	redirectSignup: function() {
		Backbone.history.navigate("/signup", {trigger: true});
	},
	
	render: function() {
		var renderedContent = this.template({
			model: this.model
		});
		this.$el.html(renderedContent);
		return this;
	}
});