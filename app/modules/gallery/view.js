FL.gallery.template = $("#gallery-template").text();

FL.gallery.view = Backbone.View.extend({
	initialize : function(options) {
		this.prevCount = 0;
		this.nextCount = 16;
		this.collection = new FL.gallery.collection();
		this.collection.url = "";
		this.listenTo(this.collection, "sync", this.setData);
		FL.hub.scribe("search", this.getData, this);
	},
	events : {
		"click .prev" : "showPrev",
		"click .next" : "showNext",
		"click img" : "showSlideShow"
	},
	render : function() {
		this.$el.html(_.template(FL.gallery.template)({
			images : this.imageData.slice(this.prevCount, this.nextCount)
		}));
		this.$el.show();
	},
	getData : function(tag) {
		this.collection.fetch(this.getFetchOptions(tag));
	},
	getFetchOptions : function(tag) {
		return {
			url : "https://api.flickr.com/services/rest/?",
			type : "get",
			data : {
				method : "flickr.photos.search",
				tags : tag,
				api_key : "8538a0d0d2311e7c45c64d9c37b32d96",
				safe_search : "3",
				format : "json"
			},
			dataType : "jsonp",
			jsonpCallback : "jsonFlickrApi",
		};
	},
	setData : function(){
		this.imageData = this.collection.toJSON();
		this.render();
	},
	showPrev : function(){
		if(this.prevCount > 0){
			this.nextCount = this.prevCount;
			this.prevCount = this.prevCount - 16;
			if(this.prevCount < 0){
				this.prevCount = 0;
			}
			this.render();
		}
	},
	showNext : function(){
		if(this.nextCount < this.imageData.length){
			this.prevCount = this.nextCount;
			this.nextCount = this.nextCount + 16;
			if(this.nextCount >= this.imageData.length){
				this.nextCount = this.imageData.length;
			}
			this.render();
		}
	},
	showSlideShow : function(event){
		FL.hub.publish("show-slide-show", {
			images : this.imageData,
			index : this.$(event.currentTarget).data('index')
		});
	}
});