fun.views.fogsbrew = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.fogsbrew = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.fogsbrew));
        this.$el.html(template);
        this.$el.show();
    }
});