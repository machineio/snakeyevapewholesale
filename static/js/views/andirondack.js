fun.views.andirondack = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.andirondack = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.andirondack));
        this.$el.html(template);
        this.$el.show();
    }
});