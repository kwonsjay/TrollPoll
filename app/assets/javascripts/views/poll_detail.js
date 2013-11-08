TrollPoll.Views.PollDetail = Backbone.View.extend({
	initialize: function(options) {
		this.listenTo(this.model, "add change remove sync", this.render);
	},
	
	template: JST['poll/detail'],

	events: {
		"click .favorite": "favoritePoll",
		"click .unfavorite": "unfavoritePoll",
		"click .index": "returnIndex",
		"click .delete": "deletePoll",
		"click .edit": "editPoll"
	},

	render: function() {
		var renderedContent = this.template({
			poll: this.model,
		});

		this.$el.html(renderedContent);
		return this;
	},
	
	returnIndex: function() {
		Backbone.history.navigate("/index", {trigger: true});
	},

	favoritePoll: function() {
		this.model.favorite();
	},
	
	unfavoritePoll: function() {
		this.model.unfavorite();
	},
	
	deletePoll: function() {
		this.model.destroy({
			success: function() {
				Backbone.history.navigate("/index", {trigger: true});
			}
		});
	},
	
	editPoll: function() {
		console.log("In Edit View");
	}
});