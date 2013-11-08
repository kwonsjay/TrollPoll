TrollPoll.Collections.Responses = Backbone.Collection.extend({
	initialize: function(models, options) {
		this.poll = options.poll;
	},
	
	url: function() {
		return "/polls/" + this.poll.id + "/responses"
	},
	
	model: TrollPoll.Models.Response
});