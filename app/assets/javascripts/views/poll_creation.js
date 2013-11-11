TrollPoll.Views.PollCreation = Backbone.View.extend({
	pollTemplate: JST["poll/form"],
	responseTemplate: JST["poll/response"],
	counter: 0,
	
	events: {
		"submit form": "submitPoll",
		"click .add_response": "renderResponse"
	},
	
	submitPoll: function(event) {
		event.preventDefault();
		var that = this;
		var formData = $(event.currentTarget).serializeJSON();
		var newPoll = new TrollPoll.Models.Poll(formData.poll, {parse: true});
		if (!newPoll.isValid()) {
			that.$(".errormsg").empty();
			newPoll.validationError.forEach(function(errorMessage) {
				that.$(".errormsg").append("<p>" + errorMessage + "</p>");
			});
			return;
		}
		
		newPoll.save({}, {
			success: function(data) {
				TrollPoll.polls.add(newPoll)
				Backbone.history.navigate("/index", {trigger: true});
			},
			error: function(xhr, status, error) {
				that.$(".errormsg").empty();
				that.$(".errormsg").html('<span class="error">Error: ' + xhr.responseText + '</span>');
			}
		});
	},
	
	renderResponse: function() {
		var renderedContent = this.responseTemplate({
			count: this.counter,
			answer: ""
		});

		this.$el.find('form').append(renderedContent);
		this.counter += 1;
		return this;
	},
	
	render: function() {
		var renderedContent = this.pollTemplate({
			title: "New Poll"
		});
		this.$el.html(renderedContent);
		return this;
	}
});