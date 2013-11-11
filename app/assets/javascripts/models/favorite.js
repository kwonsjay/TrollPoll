TrollPoll.Models.Favorite = Backbone.Model.extend({
	initialize: function(options) {
		this.poll = options.poll;
	},
	
	urlRoot: function() {
		return "/polls/" + this.get("poll_id") + "/favorites"
	}
});