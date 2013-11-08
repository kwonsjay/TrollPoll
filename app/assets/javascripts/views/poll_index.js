TrollPoll.Views.PollIndex = Backbone.View.extend({
	template: JST["poll/index"],
	
	events: {
		"click .btn": "newPoll"
	},
	
	initialize: function() {
		this.listenTo(this.collection, "change add reset remove", this.render);
	},
	
	newPoll: function() {
		Backbone.history.navigate("/polls/new", {trigger: true});
	},
	
	render: function() {
		var renderedContent = this.template({
			polls: this.collection
		});
		this.$el.html(renderedContent);
		return this;
	}
});