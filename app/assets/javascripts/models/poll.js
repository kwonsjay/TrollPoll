TrollPoll.Models.Poll = Backbone.Model.extend({
	urlRoot: "/polls",
	
	validates: function() {
		var errors = [];
		
		if (this.get('question').length == 0) {
			errors.push("Question can't be blank!");
		}
		
		return errors.length == 0 ?  undefined : errors;
	},
	
	favorite: function() {
		var that = this;
		var cuid = TrollPoll.currentUser.id;
		this.pollFavorites().create({poll_id: this.id, user_id: cuid}, {
			wait: true,
			success: function() {
				that.set("favorite_count", that.get("favorite_count") + 1);
			}
		});
		
	},
	
	unfavorite: function() {
		var that = this;
		var cuid = TrollPoll.currentUser.id;
		console.log("DELETING THIS");
		console.log(this.pollFavorites().findWhere({poll_id: this.id, user_id: cuid}));
		this.pollFavorites().findWhere({poll_id: this.id, user_id: cuid}).destroy({
			wait: true,
			success: function() {
				that.set("favorite_count", that.get("favorite_count") - 1);
			}
		});
	},
	
	pollFavorites: function() {
		if (!this._pollFavorites) {
			this._pollFavorites = new TrollPoll.Collections.PollFavorites([], {poll: this});
		}
		return this._pollFavorites;
	},
	
	pollResponses: function() {
		if (!this._pollResponses) {
			this._pollResponses = new TrollPoll.Collections.Responses([], {poll: this});
		}
		return this._pollResponses;
	},
	
	parse: function(serverAttributes, options) {
		this.pollResponses().reset(serverAttributes.responses);
		this.pollFavorites().reset(serverAttributes.favorites);
		delete serverAttributes.responses;
		delete serverAttributes.favorites;
		return serverAttributes;
	},
	
	toJSON: function() {
		var formData = _.extend({}, this.attributes);
		formData.responses = this.pollResponses().toJSON();
		delete formData.favorite_count;
		return formData;
	}
});