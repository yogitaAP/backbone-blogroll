// Backbone Model

var Blog = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		url: ''
	}
});

//Backbone Collection

var Blogs = Backbone.Collection.extend({

});

//instantiate a Collection
var blogs = new Blogs();

//Backbone Views

var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',

	events: {
		'click .edit-blog': 'edit',
		'click .update-blog': 'update',
		'click .cancel-blog': 'cancel',
		'click .delete-blog': 'delete'
	},

	edit: function() {
		$('.edit-blog, .delete-blog').hide();
		$('.update-blog,  .cancel-blog').show();

		var author = this.$('.author').html();
		var title = this.$('.title').html();
		var url = this.$('.url').html();

		this.$('.author').html('<input type="text" class="author-update" value=' + author + '>');
		this.$('.title').html('<input type="text" class="title-update" value=' + title + '>');
		this.$('.url').html('<input type="text" class="url-update" value=' + url + '>');
	},

	update: function() {
		this.model.set('author', $('.author-update').val());
		this.model.set('title', $('.title-update').val());
		this.model.set('url', $('.url-update').val());
	},

	cancel: function() {
		blogsView.render();
	},

	delete: function() {
		this.model.destroy();
	}, 

	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var BlogsView = Backbone.View.extend({
	model: blogs,
	tagName: 'tr',

	el: $('.blogs-list'),

	initialize: function() {
		var that = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				that.render();
			}, 2000)
		}, this);

		this.model.on('remove', this.render, this);
	},

	render: function() {
		var that = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			that.$el.append((new BlogView({model: blog})).render().$el)
		});
		return this;
	}
});

var blogsView = new BlogsView();



$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		})
		blogs.add(blog);
		$('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');

	})
});





