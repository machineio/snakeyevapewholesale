fun.Router = Backbone.Router.extend({

    /*
     Seed routes


    
    vapingGuide: '#vaping-guide',
    industryResearch: '#industry-research',
    fillingTank: '#filling-tank',
    fillingCartomizers: '#filling-cartomizers',
    aboutRebuildables: '#about-rebuildables',
    coilBuilding: '#coil-building',
    rdaWcottonAgi: '#rda-w-cotton-agi',
    buildingRbaKayfun: '#building-rba-kayfun',



    */
    routes: {
        "": "home",
        "home": "home",
        "landing": "landing",
        "signup": "signup",
        "login": "login",

        "dashboard": "dashboard",        
        "dashboard/a:account": "dashboard",
        "dashboard/a:account/o:org": "dashboard",

        "vaping-guide": "vapingGuide",
        "industry-research": "industryResearch",
        "filling-tank": "fillingTank",
        "filling-cartomizers":"fillingCartomizers",
        "about-rebuildables": "aboutRebuildables",
        "coil-building": "coilBuilding",
        "rda-w-cotton-agi":"rdaWcottonAgi",
        "building-rba-kayfun":"buildingRbaKayfun",

        "reports": "reports",
        "reports/p:page": "reports",

        "settings": "settings",
        "logout": "logout"
    },
 
    initialize: function(options){
        //this.appView = options.appView;
    
        // navigation bar
        fun.instances.navbar = new fun.views.navbar({
            el:"#fun-navbar"
        });

        // sub header
        fun.instances.subheader = new fun.views.subheader({
            el:"#fun-subheader"
        });

        // landing
        fun.instances.landing = new fun.views.landing({
            el:"#fun-landing"
        });

        // login
        fun.instances.login = new fun.views.login({
            el:"#fun-login"
        });

        // dashboard
        fun.instances.dashboard = new fun.views.dashboard({
            el:"#fun-dashboard"
        });

        // reports
        fun.instances.reports = new fun.views.reports({
            el:"#fun-reports"
        });

        // signup
        fun.instances.signup = new fun.views.signup({
            el:"#fun-signup"
        });
        
        // settings
        fun.instances.settings = new fun.views.settings({
            el:"#fun-settings"
        });

        // vaping guide
        fun.instances.vapingGuide = new fun.views.vapingGuide({
            el:"#fun-vaping-guide"
        });

        // industry research
        fun.instances.industryResearch = new fun.views.industryResearch({
            el:"#fun-industry-research"
        });

        // filling-tank
        fun.instances.fillingTank = new fun.views.fillingTank({
            el:"#fun-filling-tank"
        });

        // filling-cartomizers
        fun.instances.fillingCartomizers = new fun.views.fillingCartomizers({
            el:"#fun-filling-cartomizers"
        });

        // about-rebuildables
        fun.instances.aboutRebuildables = new fun.views.aboutRebuildables({
            el:"#fun-about-rebuildables"
        });

        // coil-building 
        fun.instances.coilBuilding = new fun.views.coilBuilding({
            el:"#fun-coil-building"
        });

        // rda-w-cotton-agi 
        fun.instances.rdaWcottonAgi = new fun.views.rdaWcottonAgi({
            el:"#fun-rda-w-cotton-agi"
        });

        // building-rba-kayfun
        fun.instances.buildingRbaKayfun = new fun.views.buildingRbaKayfun({
            el:"#fun-building-rba-kayfun"
        });

        // building-rba-kayfun
        fun.instances.rbaWdualHelios = new fun.views.rbaWdualHelios({
            el:"#fun-rba-w-dual-helios"
        });


        // footer
        fun.instances.footer = new fun.views.footer({
            el:"#fun-footer"
        });
    },
    
    home: function(){
        if(fun.utils.loggedIn()){
            fun.utils.redirect(fun.conf.hash.dashboard);
        } else {
            fun.utils.redirect(fun.conf.hash.landing);
        }
    },

    landing: function(){
        fun.utils.hideAll();
        fun.utils.showLanding();
        //fun.instances.navbar.render();
        //fun.instances.landing.render();
        fun.instances.footer.render();
    },

    vapingGuide: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.vapingGuide.render();
        fun.instances.footer.render();
    },

    industryResearch: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.industryResearch.render();
        fun.instances.footer.render();
    },

    fillingTank: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.fillingTank.render();
        fun.instances.footer.render();
    },

    fillingCartomizers: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.fillingCartomizers.render();
        fun.instances.footer.render();
    },

    aboutRebuildables: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.aboutRebuildables.render();
        fun.instances.footer.render();
    },

    coilBuilding: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.coilBuilding.render();
        fun.instances.footer.render();
    },

    rdaWcottonAgi: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.rdaWcottonAgi.render();
        fun.instances.footer.render();
    },

    buildingRbaKayfun: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.buildingRbaKayfun.render();
        fun.instances.footer.render();
    },

    rbaWdualHelios: function(){
        fun.utils.hideAll();
        fun.utils.hideLanding();
        fun.instances.rbaWdualHelios.render();
        fun.instances.footer.render();
    },

    dashboard: function(){

        fun.utils.hideAll();

        //fun.instances.navbar.render();
        //fun.instances.landing.render();
        fun.instances.footer.render();
    },

    signup: function(){
        var signup = translate('signup');
        if(fun.utils.loggedIn()){
            fun.utils.redirect(fun.conf.hash.dashboard);
        } else {
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.subheader.render('Signup');
            fun.instances.signup.render();
        }
        //fun.instances.footer.render();
    },
    
    login: function(){
        var login = translate('login');
        if(fun.utils.loggedIn()){
            fun.utils.redirect(fun.conf.hash.dashboard);
        } else {
            fun.utils.hideAll();
            fun.instances.navbar.render();
            //fun.instances.subheader.render(login);
            fun.instances.login.render();
        }
        //fun.instances.footer.render();
    },

    reports: function(page){
        'use strict';
        if(fun.utils.loggedIn()){

            fun.utils.hideAll();

            fun.instances.navbar.render();

            fun.instances.reports.render();
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        
        //fun.instances.footer.render();
    },

    settings: function(){
        var settings = translate('settings');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.subheader.render(settings);
        fun.instances.settings.render();
        //fun.instances.footer.render();
    },

    logout: function(){
        //var goodBye = translate('goodBye');
        fun.utils.logout();
        //fun.utils.hideAll();
        //fun.instances.navbar.render()
        //fun.instances.subheader.render(goodBye);      
        //fun.instances.login.render();
        //fun.instances.footer.render();
        fun.utils.redirect('http://snakeyevapeshop.com');
        //fun.utils.redirect(fun.conf.hash.home);
    }

});

// init the shit out of this
$(function(){
    fun.instances.router = new fun.Router();
    Backbone.history.start();
});