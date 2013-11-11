TrollPoll.Views.PollEdit = Backbone.View.extend({
	pollTemplate: JST["poll/edit"],
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
		console.log(formData);
		this.model.set(formData.poll);
		window.testing = formData.poll.responses;
		
		// this.model.pollResponses().reset(formData.poll.responses);
		console.log(this.model.pollResponses());
		if (!this.model.isValid()) {
			that.$(".errormsg").empty();
			this.model.validationError.forEach(function(errorMessage) {
				that.$(".errormsg").append("<p>" + errorMessage + "</p>");
			});
			return;
		}
		
		this.model.save({}, {
			success: function(data) {
				Backbone.history.navigate("/index", {trigger: true});
			},
			error: function(xhr, status, error) {
				that.$(".errormsg").empty();
				that.$(".errormsg").html('<span class="error">Error: ' + xhr.responseText + '</span>');
			}
		});
	},
	
	renderResponse: function(answer) {
		var response = typeof answer != 'string' ? "" : answer;
		var renderedContent = this.responseTemplate({
			count: this.counter,
			answer: response
		});

		this.$el.find('form').append(renderedContent);
		this.counter += 1;
	},
	
	render: function() {
		var that = this;
		var renderedContent = this.pollTemplate({
			title: "Edit Poll",
			poll: this.model
		});
		this.$el.html(renderedContent);
		this.model._pollResponses.each(function(response) {
			that.renderResponse(response.get('answer'));
		});
		return this;
	}
});