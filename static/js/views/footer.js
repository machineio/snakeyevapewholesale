fun.views.footer = Backbone.View.extend({

    events: {
        "click #login-btn": "login",
        "click #fun-signup": "signupPopup",
        "click #signup-btn": "signup",
        "click #fun-login": "loginPopup"

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

            // Cache the DOM stuff
            this.signupError = this.$('#signup-alert');
            // Form inputs
            this.account = this.$('#signup_username');
            this.newAccount = this.account;
            this.firstName = this.$('#signup_firstname');
            this.lastName = this.$('#signup_lastname');
            this.email = this.$('#signup_email');
        }

        var account = localStorage.getItem("username", username);

        if (typeof account === undefined || account === null || account === ''){
            $('#signupModal').modal('hide');
            $('#loginModal').modal({
                'show': true,
                'backdrop': 'static',
                'keyboard': true
            });
        } else {
            $('#put_username').html(account);
            console.log(account);
            console.log('set this stuff up');
        }

        
    },

    loginPopup: function(event){
        event.preventDefault();
        console.log("login popup event");

        //test this stuff out
        $('#signupModal').modal('hide');
        $('#loginModal').modal({
            'show': true,
            'backdrop': 'static',
            'keyboard': false
        });
    },

    signupPopup: function(event){
        event.preventDefault();
        console.log("signup popup event");

        // test this shit out
        $('#loginModal').modal('hide');
        $('#signupModal').modal({
            'show': true,
            'backdrop': 'static',
            'keyboard': false
        });
    },

    login: function(event){
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
    },

    signup: function(event){
        'use strict';
        var signupError,
            view = this,
            account,
            firstName,
            lastName,
            password,
            confirmPassword,
            
            email,
            phoneNumber,
            countryCode,
            cleanNumber,

            rules,
            validationRules,

            stuff,
            callbacks,

            clxCustomerPayload,
            
            clxPayload,
            clxCallbacks,
            
            assignPayload,
            assignCallbacks,
            
            mangoModel,
            mangoPayload,
            validForm;
        
        event.preventDefault();

        signupError = this.signupError;
        account = this.account.val();
        firstName = this.firstName.val();
        lastName = this.lastName.val();
        password = this.password.val();
        confirmPassword = this.confirmPassword.val();
        email = this.email.val();
        
        //countryCode = this.PhoneNumber.intlTelInput("getSelectedCountryData")['dialCode'];

        //cleanNumber = this.PhoneNumber.intlTelInput("getNumber", intlTelInputUtils.numberFormat.NATIONAL);

        //phoneNumber = this.PhoneNumber.intlTelInput("getNumber");
        
        // form validation rules
        rules = {
            rules: {
                signup_username: {
                    minlength: 2,
                    required: true
                },
                signup_lastname: {
                    minlength: 2,
                    required: true
                },
                signup_firstname: {
                    minlength: 2,
                    required: true
                },
                signup_email: {
                    required: true,
                    email: true
                },
                signup_phone: {
                    required: true,
                    minlength: 8
                },
                signup_password: {
                    minlength: 8,
                    required: true
                },
                confirm_password: {
                    required: false,
                    minlength: 8,
                    equalTo: '#signup_password'
                    
                }
            }
        }
        validationRules = $.extend (rules, fun.utils.validationRules);

        $('#signup-form').validate(validationRules);
        
        // new user account callbacks
        callbacks = {
            success: function(){
                // Clear the stuff from the inputs ;)
                view.$('#signup_username').val('');
                view.$('#signup_email').val('');
                view.$('#signup_password').val('');
                view.$('#confirm_password').val('');
                view.$('#signup_phone').val('');

                signupError.hide();
                // login the created user
                fun.utils.login(account, password,
                    {
                        success : function(xhr, status){
                            // the right mutherfucking stuff is send the account
                            // to the dashboard, but you know...
                            // for some reasons the callback always return an error
                            // so we catch the status code; if 200 OK then the shit
                            // was a success and stuff.
                            fun.utils.redirect(fun.conf.hash.dashboard);
                        },
                        error : function(xhr, status, error) {
                            switch(xhr.status) {
                                case 403:
                                    var message = fun.utils.translate("usernameOrPasswordError");
                                    loginError.find('p').html(message);
                                    loginError.removeClass("hide" ).addClass("show");
                                    break;
                                case 200:
                                    $('#signupModal').modal('hide');
                                    
                                    // Check browser support
                                    if (typeof(Storage) != "undefined") {
                                        // Store
                                        localStorage.setItem("username", account);
                                    }
                                    fun.utils.redirect(fun.conf.hash.login);
                                    //loginSuccess(view, loginError);
                                    //$('#loginModal').modal('hide');
                                    break;
                                default:
                                    console.log('the monkey is down');
                                    break;
                            }
                        }
                    }
                );
            },

            error: function(model, error){
                // Catch duplicate errors or some random stuff
                signupError.show();
                // TODO: on error add class error and label to the input field
                if (error.responseText.indexOf('account') != -1){
                    signupError.find('p').html('Username is already taken.');
                }
                else if (error.responseText.indexOf('email') != -1){
                    signupError.find('p').html('Email is invalid or already taken.');
                }
                else {
                    signupError.find('p').html('what daa!?');
                }
            }
        };


        mangoPayload = {
            account: account,
            password: password,
            email: email,
            phone_number: phoneNumber,
            country_code: countryCode
        };
        
        // check for a valid form and create the new user account
        validForm = $('#signup-form').valid();
        if (validForm){

            console.log('wut?')
        }
    },

});