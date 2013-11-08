TrollPoll.Views.UserCreation = Backbone.View.extend({
	template: JST["global/signup"],
	
	events: {
		"submit form": "submitUser"
	},
	
	submitUser: function(event) {
		event.preventDefault();
		var that = this;
		var formData = $(event.currentTarget).serializeJSON();
		var newUser = new TrollPoll.Models.User(formData);
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
	
	render: function() {
		var renderedContent = this.template({
			
		});
		this.$el.html(renderedContent);
		return this;
	}
});