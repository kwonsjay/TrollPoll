TrollPoll.Models.Response = Backbone.Model.extend({
	initialize: function(options) {
		this.poll = options.poll;
	},
	
	urlRoot: function() {
		return "/polls/" + this.poll.id + "/responses"
	},
	
	validate: function() {
		var errors = [];
		
		if (this.get("answer").length == 0) {
			errors.push("Answer choice can't be blank!");
		}
		return errors.length == 0 ? undefined : errors;
	},
	
	toJSON: function() {
		var formData = _.extend({}, this.attributes);
		delete formData.vote_count;
		return formData;
	}
});