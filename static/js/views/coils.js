fun.views.coils = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.coils = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.coils));
        this.$el.html(template);
        this.$el.show();
    }
});