TrollPoll.Views.UserCreation = Backbone.View.extend({
	template: JST["global/signup"],
	
	events: {
		// "submit form": "submitUser",
		"click .submit": "submitUser",
		"keypress :input": "keyAction"
	},
	
	submitUser: function() {
		var that = this;
		var formData = $("#form").serializeJSON();
		var newUser = new TrollPoll.Models.User(formData);
		if (!newUser.isValid()) {
			that.$(".errormsg").empty();
			newUser.validationError.forEach(function(errorMessage) {
				that.$(".errormsg").append("<span class='error'>Error: " + errorMessage + "</span><br>");
			});
			return;
		}
		newUser.save({}, {
			success: function(data) {
				TrollPoll.currentUser.set(data);
				console.log("signup data set!");
				TrollPoll.polls.fetch({
					success: function() {
						Backbone.history.navigate("/index", {trigger: true});
					}
				});
			},
			error: function(xhr, status, error) {
				that.$(".errormsg").empty();
				that.$(".errormsg").html('<span class="error">Error: ' + xhr.responseText + '</span>');
			}
		});
	},
	
	keyAction: function(e) {
		if (e.keyCode == 13) {
			this.submitUser();
		}
	},
	
	render: function() {
		var renderedContent = this.template({
			
		});
		this.$el.html(renderedContent);
		return this;
	}
});