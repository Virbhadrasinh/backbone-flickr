FL.search.template = $("#search-template").text();

FL.search.view = Backbone.View.extend({
	initialize : function(options) {
		this.model = new FL.search.model();
		this.listenTo(this.model, "change:tag", this.publishSearchEvent);
		this.render();
	},
	events : {
		"click .js-search" : "search",
		"keydown .js-search-tag" : "searchOnEnter"
	},
	render : function() {
		this.$el.html(FL.search.template);
	},
	search : function() {
		this.model.set("tag", this.$el.find(".js-search-tag").val());
	},
	searchOnEnter : function(event){
		if(event.keyCode == 13) {
	        this.search();       
	    }
	},
	publishSearchEvent : function() {
		FL.hub.publish("search", this.model.get('tag'));
		this.$el.hide();
	}
});