TrollPoll.Collections.PollFavorites = Backbone.Collection.extend({
	url: '/favorites',
	model: TrollPoll.Models.Favorite
});