TrollPoll.Models.User = Backbone.Model.extend({
	urlRoot: "/users",
	
	validate: function() {
		var errors = [];
		
		if (!this.get('user').username || this.get('user').username.length == 0) {
			errors.push("Username can't be blank!");
		}
		if (!this.get('user').password || this.get('user').password.length == 0) {
			errors.push("Password can't be blank!");
		}
		
		return errors.length == 0 ?  undefined : errors;
	}
});