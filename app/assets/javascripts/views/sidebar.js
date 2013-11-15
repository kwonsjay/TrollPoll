TrollPoll.Views.SidebarView = Backbone.View.extend({
	template: JST["global/sidebar"],
	
	events: {
		"click .intro": "redIntro",
		"click .sample": "redIndex"
	},
	
	redIntro: function() {
		Backbone.history.navigate("/", {trigger: true});
	},
	
	redIndex: function() {
		Backbone.history.navigate("/index", {trigger: true});
	},
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
});