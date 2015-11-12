FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout',  {page: 'uploadForm'});
    },
    name: 'home'
});