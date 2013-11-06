TrollPoll.Collections.Polls = Backbone.Collection.extend({
	url: "/polls",
	model: TrollPoll.Models.Poll
});