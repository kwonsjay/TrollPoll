TrollPoll.Views.PollIndex = Backbone.View.extend({
	template: JST["poll/index"],
	
	initialize: function() {
		this.listenTo(this.collection, "change add reset remove", this.render);
	},
	
	render: function() {
		var renderedContent = this.template({
			polls: this.collection
		});
		this.$el.html(renderedContent);
		return this;
	}
});