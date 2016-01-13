angular.module('app.services', [])

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://shootone.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

.factory('BlankService', [function(){

}])

.service('BlankService', [function(){

}]);

