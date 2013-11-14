TrollPoll.Views.UserView = Backbone.View.extend({
	template: JST["global/user"],
	
	render: function() {
		var renderedContent = this.template({
			user: this.model
		});
		this.$el.html(renderedContent);
		return this;
	}
})