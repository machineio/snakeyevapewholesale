fun.views.footer = Backbone.View.extend({

    events: {
        "click #login-btn": "loginStuff",
        "click #fun-signup": "signupStuff"
    },

    initialize: function(options) {
        fun.containers.footer = this.$el;
    },
    
    render: function(){
        
        this.$el.html(template);
        this.$el.show();

        if (!this.$el.html()){
            var template = _.template(
                fun.utils.getTemplate(fun.conf.templates.footer)
            );
            this.$el.html(template);
            
            // Cache the DOM stuff
            this.loginError = this.$('#signin-alert');
            // form inputs
            this.username = this.$('#username');
            this.password = this.$('#password');
        }

        $('#loginModal').modal({
            'show': true,
            'backdrop': 'static',
            'keyboard': true
        });
    },

    signupStuff: function(event){
        event.preventDefault();

        console.log('signup');
    },

    loginStuff: function(event){
        event.preventDefault();

        var loginError = this.loginError;
        var username = this.username.val();
        var password = this.password.val();
        var view = this;

        var loginSuccess = function(view, loginError){
            // Clear the stuff from the inputs ;)
            view.$('#username').val('');
            view.$('#password').val('');
            loginError.removeClass("show" ).addClass("hide");
            fun.utils.redirect(fun.conf.hash.dashboard);
        };
        
        fun.utils.login(username, password, {
            success : function(jqXHR, textStatus){
                // currently this success call is never executed
                // the success stuff is going on case 200 of the error function.
                // Why? well... I really don't fucking know...
                loginSuccess(view, loginError);
            },
            error : function(jqXHR, textStatus, errorThrown) {
                switch(jqXHR.status) {
                    case 403:
                        var message = fun.utils.translate("usernameOrPasswordError");
                        loginError.find('p').html(message);
                        loginError.removeClass("hide" ).addClass("show");
                        break;
                    case 200:
                        // Check browser support
                        if (typeof(Storage) != "undefined") {
                            // Store
                            localStorage.setItem("username", username);
                        }
                        loginSuccess(view, loginError);
                        $('#loginModal').modal('hide');
                        break;
                    default:
                        console.log('the monkey is down');
                        break;
                }
            }
        
        });

    }

});