TrollPoll.Views.RootView = Backbone.View.extend({
	template: JST["global/root"],
	
	events: {
		"click .btn": "newUser"
	},
	
	newUser: function() {
		Backbone.history.navigate("/signup", {trigger: true});
	},
	
	render: function() {
		var renderedContent = this.template({
			
		});
		this.$el.html(renderedContent);
		return this;
	}
});