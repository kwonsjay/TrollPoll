TrollPoll.Views.RootView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(TrollPoll.currentUser, "change", this.render);
		this.listenTo(TrollPoll.currentUser, "change", this.drawChart);
	},
	
	template: JST["global/root"],
	
	events: {
		"click .submit": "newUser",
		"click .guest": "loginGuest",
		"click .green": "expand",
		"click .yellow": "minimize",
		"click .red": "shake"
	},
	
	newUser: function() {
		Backbone.history.navigate("/signup", {trigger: true});
	},
	
	loginGuest: function() {
		var that = this;
		$.ajax({
			type: "POST",
			url: "/session.json",
			data: {
				user: {
					username: "guest",
					password: "password"
				}
			},
			success: function(data) {
				TrollPoll.currentUser.set(data, {silent: true});
				TrollPoll.polls.fetch({
					success: function() {
						TrollPoll.headerView.render();
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
	
	drawChart: function () {
		var that = this;
		$("#rootchart").empty();
		this._raphael = Raphael("rootchart");
		
		var colors = [];
		
		for(var i = 0; i < 7; i++) {
			colors.push(this.randomColor());
		}
		
    var pie = this._raphael.piechart(150, 150, 120, [1,1,1], {
        colors: colors,
				stroke: "#FFF",
				strokewidth: 1,
				donut: true,
				donutFill: "#333"
    });
	
		pie.each(function() {
		  this.sector.scale(0, 0, this.cx, this.cy);
		  this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 1000, "bounce");
		});
	
    pie.hover(function() {
			var sect = this.sector;
	    this.sector.scale(1.1, 1.1, this.cx, this.cy);
    }, function() {
      this.sector.animate({
        transform: 's1 1 ' + this.cx + ' ' + this.cy
    }, 500, "bounce");
    });
	},
	
	randomColor: function() {
		return '#' + ('00000' + Math.floor(Math.random()*16777216).toString(16)).substr(-6);
	},
	
	expand: function() {
		$(".graphic").animate({"width": "100%"}, 1000);
	},
	
	minimize: function() {
		$('.window').toggle("blind", 1000);
		$('.btmbar').toggle("blind", 1000);
	},
	
	shake: function() {
		$(".graphic").effect("shake", 300);
	},
	
	render: function() {
		console.log("THIS SHOULD ONLY RENDER ONCE");
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
});