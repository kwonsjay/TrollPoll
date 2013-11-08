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
		
    $.ajax({
      type: "POST",
      url: "/polls/" + that.id + "/favorite",
      
      success: function (data) {
        that.set("favorited", true);
        that.set("favorite_count", data.favorite_count)
      }
    });
	},
	
	unfavorite: function() {
		var that = this;
		
    $.ajax({
      type: "DELETE",
      url: "/polls/" + that.id + "/favorite",
      
      success: function (data) {
        that.set("favorited", false);
        that.set("favorite_count", data.favorite_count)
      }
    });
	},
	
	pollResponses: function() {
		if (!this._pollResponses) {
			this._pollResponses = new TrollPoll.Collections.Responses([], {poll: this});
		}
		return this._pollResponses;
	},
	
	parse: function(serverAttributes, options) {
		this.pollResponses().reset(serverAttributes.responses);
		delete serverAttributes.responses;
		return serverAttributes;
	},
	
	toJSON: function() {
		var formData = _.extend({}, this.attributes);
		formData.responses = this.pollResponses().toJSON();
		delete formData.favorited;
		delete formData.favorite_count;
		return formData;
	}
});