FL.images.template = $("#images-template").text();

FL.images.view = Backbone.View.extend({
	initialize : function(options) {
		this.render();
		FL.hub.scribe("show-slide-show", this.showSlideShow, this);
	},
	events : {
		"click .prev" : "showPrev",
		"click .next" : "showNext",
		"click .close" : "hideSlideShow"
	},
	render : function() {
		this.$el.html(_.template(FL.images.template)());
	},
	showSlideShow : function(data) {
		this.$el.show();
		this.currentIndex = data.index;
		this.images = data.images;
		this.dataLength = data.images.length;
		$('.modal-backdrop').show();
		this.showImage();
	},
	hideSlideShow : function(){
		this.$el.hide();
		$('.modal-backdrop').hide();
	},
	showImage : function(){
		var image = this.images[this.currentIndex];
		var src = "https://farm" + image.farm + ".staticflickr.com/"
						+ image.server + "/" + image.id + "_" + image.secret
						+ "_c.jpg";
		
		this.$el.find("img").attr("src", src).attr("alt", image.title).attr("title", image.title);
	},
	showPrev : function(){
		if(this.currentIndex === 0) {
			this.currentIndex = this.dataLength - 1;
		} else {
			this.currentIndex--;
		}
		this.showImage();
	},
	showNext : function(){
		if(this.currentIndex === (this.dataLength -1)) {
			this.currentIndex = 0;
		} else {
			this.currentIndex++;
		}
		this.showImage();
	}
});