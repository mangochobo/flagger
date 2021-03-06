// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    //EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
    FeedListView.prototype.template = Handlebars.compile($("#feed-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    CreateFeedView.prototype.template = Handlebars.compile($("#createfeed-tpl").html());
    var service = new EmployeeService();
    service.initialize().done(function () {
        router.addRoute('', function() {
            console.log('empty');
            $('body').html(new HomeView(service).render().$el);
        });

        router.addRoute('employees/:id', function(id) {
            console.log('details');
            service.findById(parseInt(id)).done(function(employee) {
                $('body').html(new EmployeeView(employee).render().$el);
            });
        });
        
        router.addRoute('createfeed', function(id) {
            console.log('details');
            $('body').html(new CreateFeedView(service).render().$el);
        });

        router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();
        FastClick.attach(document.body);
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
	
/*	  $('.help-btn').on('click', function() {
        alert("Employee Directory v3.4");
    });
*/	
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */

}());
