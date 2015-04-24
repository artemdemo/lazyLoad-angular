(function(app){

    var mainCtrl = function( $scope, loadJSFactory ){
        loadJSFactory.load('js/profileCtrl.js')
            .then(function(){
                console.log('script loaded');
            });
    };

    app.controller('mainCtrl',['$scope', 'loadJSFactory', mainCtrl]);

})(lazyloadapp);