TrollPoll.Views.PollDetail = Backbone.View.extend({
	initialize: function(options) {
		var that = this;
		this.check = options.check;
		this.listenTo(this.model, "add change remove sync", this.render);
		this.listenTo(this.model, "add change remove sync", this.drawChart);
		var pusher = new Pusher('<%= Pusher.key %>');
		var channel = pusher.subscribe('trollpoll');
		channel.bind('rerender', function(data) {
			var rid = parseInt(data.response_id);
			that.model.pollResponses().get(rid).set({vote_count: data.vote_count});
			that.render();
			that.drawChart();
		});
	},
	
	template: JST['poll/detail'],

	events: {
		"click .favorite": "favoritePoll",
		"click .unfavorite": "unfavoritePoll",
		"click .index": "returnIndex",
		"click .delete": "deletePoll",
		"click .edit": "editPoll",
		"click .bar": "drawBar",
		"click .dot": "drawDot",
		"click .donut": "drawChart"
	},

	render: function() {
		var renderedContent = this.template({
			poll: this.model,
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	returnIndex: function() {
		Backbone.history.navigate("/index", {trigger: true});
	},

	favoritePoll: function() {
		this.model.favorite();
	},
	
	unfavoritePoll: function() {
		this.model.unfavorite();
	},
	
	deletePoll: function() {
		this.model.destroy({
			success: function() {
				Backbone.history.navigate("/index", {trigger: true});
			}
		});
	},
	
	editPoll: function() {
		Backbone.history.navigate("/polls/" + this.model.id + "/edit", {trigger: true});
	},
	
	drawChart: function () {
		var that = this;
    var items = [];
		this.model.pollResponses().each(function(response) {
			var count = parseInt(response.get('vote_count'));
			var color = that.randomColor();
			var rootEl = ".blk_" + response.get('id');
			var textEl = ".txt_" + response.get('id');
			if (count > 0) {
				items.push({value: count,
										color: color,
										title: '%%' + textEl
									});
			}
		});
		
		if (items.length > 0) {
			$("#chartspace").empty();
			this._raphael = Raphael("chartspace");
			
	    var pie = this._raphael.piechart(250, 200, 180, _.pluck(items, "value"), {
	        colors: _.pluck(items, "color"),
					legend: _.pluck(items, "title"),
					stroke: "#FFF",
					strokewidth: 2,
					donut: true
	    });
		
			pie.each(function() {
				var cssEl = this.label[1].attrs.text.match(/.txt_\d+/)[0].replace('txt', 'blk');
				var color = this.label[0].attrs.fill;
				$(cssEl).css({"background": color});
			  this.sector.scale(0, 0, this.cx, this.cy);
			  this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 1000, "bounce");
			});
		
	    pie.hover(function() {
				var sect = this.sector;
		    this.sector.scale(1.1, 1.1, this.cx, this.cy);
				pie.each(function() {
					if (this.sector.id === sect.id) {
						var percent = this.label[1].attrs.text.match(/^\d+%/)[0];
						popup = that._raphael.text(250, 200, percent).attr({
							"font": '40px Helvetica Neue',
							"font-weight": "100"
						});
						var cssEl = this.label[1].attrs.text.match(/.txt_\d+/)[0];
						$(cssEl).animate({"background-color": "#d1d1d1", "color": "#fff"}, 200, function() {
							$(this).animate({"background-color": "#fff", "color": "#9099a3"});
						});
					}
				});
	    }, function() {
	      this.sector.animate({
	        transform: 's1 1 ' + this.cx + ' ' + this.cy
	    }, 500, "bounce");
			popup.remove();
	    });
		}
	},
	drawBar: function () {
		var that = this;
    var items = [];
		this.model.pollResponses().each(function(response) {
			var count = parseInt(response.get('vote_count'));
			var color = that.randomColor();
			var rootEl = ".blk_" + response.get('id');
			var textEl = ".txt_" + response.get('id');
			// $(rootEl).css({"background": color});
			if (count > 0) {
				items.push({value: count,
										id: response.get('id'),
										color: color,
										vote: response.get('vote_count'),
										cssEl: rootEl
									});
			}
		});
		
		if (items.length > 0) {
			$("#chartspace").empty();
			this._raphael = Raphael("chartspace");
			
	    var bar = this._raphael.barchart(20, 20, 400, 400, _.pluck(items, "value"), {
	        colors: _.pluck(items, "color"),
					votes: _.pluck(items, "vote"),
					cssEls: _.pluck(items, "cssEl")
	    });
			bar.each(function() {
				var cssEl = this.bar.cssEl;
				var color = this.bar.attrs.fill;
				$(cssEl).css({"background": color});
			  this.bar.scale(0, 0, this.cx, this.cy);
			  this.bar.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 1000, "bounce");
			});
		
	    bar.hover(function() {
				var thisbar = this.bar;
		    this.bar.scale(1.1, 1.1, this.cx, this.cy);
				bar.each(function() {
					if (this.bar.id === thisbar.id) {
						popup = that._raphael.popup(this.bar.x, this.bar.y, this.bar.vote).attr({
								"font": '20px Helvetica Neue',
								"font-weight": "100"
						});
						var cssEl = this.bar.cssEl.replace(".blk", ".txt");
						$(cssEl).animate({"background-color": "#d1d1d1", "color": "#fff"}, 200, function() {
							$(this).animate({"background-color": "#fff", "color": "#9099a3"});
						});
					}
				});
	    }, function() {
	      this.bar.animate({
	        transform: 's1 1 ' + this.cx + ' ' + this.cy
		    }, 500, "bounce");
				popup.remove();
			});
		}
	},
	
	drawDot: function () {
		var that = this;
    var items = [];
		this.model.pollResponses().each(function(response) {
			var count = parseInt(response.get('vote_count'));
			var color = that.randomColor();
			var rootEl = ".blk_" + response.get('id');
			var textEl = ".txt_" + response.get('id');
			// $(rootEl).css({"background": color});
			if (count > 0) {
				items.push({value: count,
										id: response.get('id'),
										color: color,
										title: '%%' + textEl
									});
			}
		});
		
		if (items.length > 0) {
			$("#chartspace").empty();
			this._raphael = Raphael("chartspace");
			
	    var bar = this._raphael.barchart(250, 200, 180, 180, _.pluck(items, "id"),
					_.pluck(items, "value"), _.pluck(items, "value"), {
	        colors: _.pluck(items, "color"),
					axis: '1 1 1 1'
	    });
		}
		
			// pie.each(function() {
// 				var cssEl = this.label[1].attrs.text.match(/.txt_\d+/)[0].replace('txt', 'blk');
// 				var color = this.label[0].attrs.fill;
// 				$(cssEl).css({"background": color});
// 			  this.sector.scale(0, 0, this.cx, this.cy);
// 			  this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 1000, "bounce");
// 			});
// 		
// 	    pie.hover(function() {
// 				var sect = this.sector;
// 		    this.sector.scale(1.1, 1.1, this.cx, this.cy);
// 				pie.each(function() {
// 					if (this.sector.id === sect.id) {
// 						var percent = this.label[1].attrs.text.match(/^\d+%/)[0];
// 						popup = that._raphael.text(250, 200, percent).attr({
// 							"font": '40px Helvetica Neue',
// 							"font-weight": "100"
// 						});
// 						var cssEl = this.label[1].attrs.text.match(/.txt_\d+/)[0];
// 						$(cssEl).animate({"background-color": "#d1d1d1", "color": "#fff"}, 200, function() {
// 							$(this).animate({"background-color": "#fff", "color": "#9099a3"});
// 						});
// 					}
// 				});
// 	    }, function() {
// 	      this.sector.animate({
// 	        transform: 's1 1 ' + this.cx + ' ' + this.cy
// 	    }, 500, "bounce");
// 			popup.remove();
// 	    });
// 		}
	},
	randomColor: function() {
		return '#' + ('00000' + Math.floor(Math.random()*16777216).toString(16)).substr(-6);
	}
});