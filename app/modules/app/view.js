FL.app.template = $("#app-template").text();

FL.app.view = Backbone.View.extend({
	initialize : function(options) {
		this.render();
		this.objSearchView = new FL.search.view({
			el : $(".flickr-search-container")
		});
		
		this.objGalleryView = new FL.gallery.view({
			el : $(".flickr-grid-container")
		});
		
		this.objImagesView = new FL.images.view({
			el : $(".flickr-image-container")
		});
	},
	render : function() {
		this.$el.html(FL.app.template);
	}
});