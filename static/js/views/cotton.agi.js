fun.views.rdaWcottonAgi = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */

    events : {

    },
    
    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.rdaWcottonAgi = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.rdaWcottonAgi));
        this.$el.html(template);
        this.$el.show();
    }
});