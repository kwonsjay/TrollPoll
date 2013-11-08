TrollPoll.Views.PollDetail = Backbone.View.extend({
	initialize: function(options) {
		this.favoritable = options.favoritable;
		this.listenTo(this.model, "add change remove", this.render);
	},
	
	template: JST['poll/detail'],

	events: {
		"click .favorite": "favoritePoll",
		"click .unfavorite": "unfavoritePoll",
		"click .index": "returnIndex"
	},

	render: function() {
		console.log(this.favoritable);
		var renderedContent = this.template({
			poll: this.model,
			favoritable: this.favoritable
		});

		this.$el.html(renderedContent);
		return this;
	},
	
	returnIndex: function() {
		Backbone.history.navigate("/index", {trigger: true});
	},

	favoritePoll: function() {
		var that = this;
		newFavorite = new TrollPoll.Models.Favorite({poll_id: this.model.id});
		newFavorite.save({}, {
			url: "polls/" + this.model.id + "/favorite",
			success: function() {
				that.model._pollFavorites.add(newFavorite);
				that.favoritable = false;
				console.log("success");
				that.render();
			},
			error: function() {
				alert("Saving favorite didn't work");
			}
		});
	},
	
	unfavoritePoll: function() {
		var that = this;
		$.ajax({
			type: "DELETE",
			url: "/polls/" + this.model.id + "/favorite",
			success: function(data) {
				that.favoritable = true;
				console.log("YIIIIIIII");
				that.render()
			}
		});
	}
});