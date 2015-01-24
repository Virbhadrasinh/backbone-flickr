FL.gallery.collection = Backbone.Collection.extend({
	model : FL.gallery.model,
	parse : function(response) {
		var photos = response.photos.photo;
		for (var i = 0; i < photos.length; i++) {
			photos[i]["index"] = i;
		}
		return photos;
	}
});