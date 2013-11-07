TrollPoll.Views.HeaderView = Backbone.View.extend({
	template: JST["global/header"],
	
	events: {
		"click .signin": "signIn",
		"click .signout": "signOut"
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
	
	render: function() {
		console.log('rendering');
		var renderedContent = this.template({
			model: this.model
		});
		this.$el.html(renderedContent);
		return this;
	}
});