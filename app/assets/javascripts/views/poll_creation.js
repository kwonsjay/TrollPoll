TrollPoll.Views.PollCreation = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, "add remove change sync", this.render);
		this.listenTo(this.model.pollResponses(), "add remove change sync", this.render);
	},
	
	pollTemplate: JST["poll/form"],
	
	events: {
		"click .create": "submitPoll",
		"click .edit": "editPoll",
		"click .add_response": "addResponse",
		"click .return": "returnIndex",
		"click .remove": "removeResponse",
		"click .dpoll": "deletePoll",
		"keyup :input": "saveKeys"
	},
	
	submitPoll: function(event) {
		event.preventDefault();
		var that = this;
		var formData = $("#form").serializeJSON();
		var newPoll = new TrollPoll.Models.Poll(formData.poll, {parse: true});
		if (!newPoll.isValid()) {
			that.$(".errormsg").empty();
			newPoll.validationError.forEach(function(errorMessage) {
				that.$(".errormsg").append("<span class='error'>Error: " + errorMessage + "</span>");
			});
			return;
		}
		
		newPoll.save({}, {
			success: function(data) {
				TrollPoll.polls.add(newPoll)
				Backbone.history.navigate("/polls/" + data.id, {trigger: true});
			},
			error: function(xhr, status, error) {
				that.$(".errormsg").empty();
				that.$(".errormsg").html('<span class="error">Error: ' + xhr.responseText + '</span>');
			}
		});
	},
	
	editPoll: function(event) {
		event.preventDefault();
		var that = this;
		var formData = $("#form").serializeJSON();
		this.model.set(formData.poll);
		if (!this.model.isValid()) {
			that.$(".errormsg").empty();
			this.model.validationError.forEach(function(errorMessage) {
				that.$(".errormsg").append("<p>" + errorMessage + "</p>");
			});
			return;
		}

		this.model.pollResponses().set(formData.poll.responses);
		this.model.pollResponses().models.forEach(function(model) {
			model.poll = that.model;
			model.save({}, {
			});
		});
		this.model.save({}, {
			wait: true,
			success: function() {
				that.model.trigger("sync");
				Backbone.history.navigate("/polls/" + that.model.id, {trigger: true});
			},
			error: function(xhr, status, error) {
				that.$(".errormsg").empty();
				that.$(".errormsg").html('<span class="error">Error: ' + xhr.responseText + '</span>');
			}
		});
	},
	
	returnIndex: function() {
		Backbone.history.navigate("/index", {trigger: true});
	},
	
	addResponse: function(event) {
		var newResponse = new TrollPoll.Models.Response({
			poll: this.model
		});
		this.model.pollResponses().add(newResponse);
	},
	
	removeResponse: function(event) {
		var that = this;
		var dataid = $(event.currentTarget).attr("data-id");
		var clicked = ".answer_" + dataid;
		$(clicked).effect("drop", 200, function() {
			var delResponse = that.model.pollResponses().models[parseInt(dataid)];
			if (delResponse.isNew()) {
				that.model.pollResponses().remove(delResponse);
			}
			else {
				delResponse.poll = that.model;
				delResponse.destroy();
			}
		});
	},
	
	deletePoll: function() {
		this.model.destroy({
			success: function() {
				Backbone.history.navigate("/index", {trigger: true});
			}
		});
	},
	
	render: function() {
		var renderedContent = this.pollTemplate({
			title: "New Poll",
			poll: this.model
		});
		this.$el.html(renderedContent);
		return this;
	}
});