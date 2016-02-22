'use strict';

var Hello = React.createClass({

	propTypes : {
		fname : React.PropTypes.string.isRequired,
		lname : React.PropTypes.string.isRequired
	},

	render : function() {
		return React.DOM.span(null, 'REACT JS Hello ' + this.props.fname + ' '
				+ this.props.lname);
	}
});


var app = angular.module('jhipstermavenApp')
    .controller('MainController', function ($scope, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
            // Add Person values to REACT JS
            $scope.person = { fname: 'Clark', lname: 'Kent' };
        });
    });


app.value("Hello", Hello);

app.directive('hello', function(reactDirective) {
	return reactDirective(Hello);
});
