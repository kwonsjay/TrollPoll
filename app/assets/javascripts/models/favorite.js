TrollPoll.Models.Favorite = Backbone.Model.extend({
	urlRoot: function() {
		return "/polls/" + this.get('poll_id') + "/favorite"
	}
});