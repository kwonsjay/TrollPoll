TrollPoll.Views.LoginView = Backbone.View.extend({
	template: JST["global/login"],
	
	events: {
		"submit form": "submitSession"
	},
	
	submitSession: function(event) {
		event.preventDefault();
		var that = this;
		$.ajax({
			type: "POST",
			url: "/session.json",
			data: {
				user: {
					username: this.$('#user_username').val(),
					password: this.$('#user_password').val()
				}
			},
			success: function(data) {
				TrollPoll.currentUser.set(data);
				console.log("login data set!");
				TrollPoll.polls.fetch({
					success: function() {
						// var url = "/#users/" + data.id;
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