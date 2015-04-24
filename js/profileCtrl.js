(function(app){

    var profileCtrl = function( ){
        console.log( 'profileCtrl' );
    };

    app.lazyRegisterController('profileCtrl',[profileCtrl]);

})(lazyloadapp);