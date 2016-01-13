angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('creationCompteCtrl', function($scope) {

})
   
.controller('listShootCtrl', function($scope, Items) {
	$scope.items = Items;
})
      
.controller('creationCtrl', function($scope, Items) {
	$scope.items = Items;

	$scope.addSeance = function(seance){
			$scope.items.$add({
			date : seance.date,
			discipline : seance.discipline,
			lieu : seance.lieu,
			importance : seance.importance,
		});
	};
})
   
.controller('competitionCtrl', function($scope) {

})
   
.controller('tirCtrl', function($scope) {

})
   
.controller('séAnceCtrl', function($scope) {

})
 