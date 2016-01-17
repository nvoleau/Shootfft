angular.module('app.controllers', [])
  
.controller('SignInCtrl', [
  '$scope', '$rootScope', '$firebaseAuth', '$window',
  function ($scope, $rootScope, $firebaseAuth, $window) {
     // check session
     $rootScope.checkSession();
     $scope.user = {
        email: "",
        password: ""
     };
     $scope.validateUser = function () {
        $rootScope.show('Please wait.. Authenticating');
        var email = this.user.email;
        var password = this.user.password;
        if (!email || !password) {
           $rootScope.notify("Please enter valid credentials");
           return false;
        }
        $rootScope.auth.$authWithPassword( {
           email: email,
           password: password
        })
        .then(function (user) {
          $rootScope.hide();
          $rootScope.userEmail = email;
          $window.location.href = ('#/bucket/list');
        }, function (error) {
          $rootScope.hide();
          if (error.code == 'INVALID_EMAIL') {
            $rootScope.notify('Invalid Email Address');
          }
          else if (error.code == 'INVALID_PASSWORD') {
            $rootScope.notify('Invalid Password');
          }
          else if (error.code == 'INVALID_USER') {
            $rootScope.notify('Invalid User');
          }
          else {
            $rootScope.notify('Oops something went wrong. Please try again later');
          }
        });
     }
  }
])
   
.controller('SeancesCtrl', ['$stateParams','$scope', '$rootScope','$firebase','$firebaseObject','$ionicModal',function($stateParams,$scope,$rootScope,$firebase,$firebaseObject,$ionicModal){
	var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
 	console.log($stateParams.key);
  	$scope.seances = $firebaseObject(bucketListRef.child($stateParams.key));
  	$rootScope.seances = $scope.seances;


  $ionicModal.fromTemplateUrl('templates/newSession.html', function(modal) {
  $scope.newTemplate = modal;
  });

  $scope.addSession = function() {
    $scope.newTemplate.show();
  };

}])

.controller('SignUpCtrl', [
    '$scope', '$rootScope', '$firebaseAuth', '$window',
    function ($scope, $rootScope, $firebaseAuth, $window) {
      $scope.user = {
        email: "",
        password: ""
      };
      $scope.createUserAppli = function () {
        var email = this.user.email;
        var password = this.user.password;

        if (!email || !password) {
          $rootScope.notify("Please enter valid credentials");
          return false;
        }

        $rootScope.show('Please wait.. Registering');

        $rootScope.auth.$createUser({
        email: email,
        password: password
      }).then(function(user) {
        //$scope.message = "User created with uid: " + userData.uid;
 			$rootScope.hide();
          $rootScope.userEmail = email;
          $window.location.href = ('#/bucket/list');
      }).catch(function(error) {
        $scope.error = error;
        $rootScope.hide();
            if (error.code == 'INVALID_EMAIL') {
              $rootScope.notify('Invalid Email Address');
            }
            else if (error.code == 'EMAIL_TAKEN') {
              $rootScope.notify('Email Address already taken');
            }
            else {
              $rootScope.notify('Oops something went wrong. Please try again later');
            }
      });

      }
    }
  ])

.controller('myListCtrl', function($rootScope, $scope, $window, $ionicModal, $firebase) {
  $rootScope.show("Please wait... Processing");
  $scope.list = [];
  var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
  bucketListRef.on('value', function(snapshot) {
    var data = snapshot.val();

    $scope.list = [];

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].isCompleted == false) {
          data[key].key = key;
          $scope.list.push(data[key]);
        }
      }
    }

    if ($scope.list.length == 0) {
      $scope.noData = true;
    } else {
      $scope.noData = false;
    }
    $rootScope.hide();
  });

  $ionicModal.fromTemplateUrl('templates/newItem.html', function(modal) {
    $scope.newTemplate = modal;
  });

  $scope.newTask = function() {
    $scope.newTemplate.show();
  };

  $scope.markCompleted = function(key) {
    $rootScope.show("Please wait... Updating List");
    var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail) + '/' + key);
    itemRef.update({
      isCompleted: true
    }, function(error) {
      if (error) {
        $rootScope.hide();
        $rootScope.notify('Oops! something went wrong. Try again later');
      } else {
        $rootScope.hide();
        $rootScope.notify('Successfully updated');
      }
    });
  };

  $scope.deleteItem = function(key) {
    $rootScope.show("Please wait... Deleting from List");
    var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef.child(key).remove(function(error) {
      if (error) {
        $rootScope.hide();
        $rootScope.notify('Oops! something went wrong. Try again later');
      } else {
        $rootScope.hide();
        $rootScope.notify('Successfully deleted');
      }
    });
  };
})


.controller('newSession', function($rootScope, $scope, $window, $firebase,$firebaseArray) {
  $scope.data = {
    session: "",
    tir:"",
    point:"",
    horaire:""
  };
  $scope.close = function() {
    $scope.modal.hide();
  };
  $scope.nextShoot = function() {
    var session = $rootScope.session;
    var tir = $rootScope.tir;
    var point=this.data.point;
    var horaire = this.data.horaire;

    var form = {
      session: session,
      tir: tir,
      point:point,
      horaire:horaire
    };

    $scope.modal.hide();
    $rootScope.show();
    $rootScope.show("Pattientez...");

     console.log(session);
     console.log(point);

    $rootScope.aTir.push(form);
    $rootScope.aSession.push($rootScope.aTir);

	$rootScope.seances.aSession = $rootScope.aSession;

	$rootScope.seances.$save();
    //$firebase(bucketListRef).$add(form);
    $rootScope.hide();
  };
})

      
.controller('newCtrl', function($rootScope, $scope, $window, $firebase,$firebaseArray) {
  $scope.data = {
    lieu: "",
    discipline:"",
    date:"",
    importance:"",
    description:""
  };

  $scope.close = function() {
    $scope.modal.hide();
  };

  $scope.createNew = function() {
    var lieu = this.data.lieu;
    var discipline = this.data.discipline;
    var date=this.data.date;
    var importance = this.data.importance;
    var description = this.data.description;

    if (!discipline) return;

    $scope.modal.hide();
    $rootScope.show();
    $rootScope.show("Pattientez...");

    var form = {
      discipline: discipline,
      lieu: lieu,
      date:date,
      importance:importance,
      description:description,
      isCompleted: false,
      created: Date.now(),
      updated: Date.now()
    };

    console.log($rootScope.userEmail);

    var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    $scope.listbucket = $firebaseArray(bucketListRef);
    $scope.listbucket.$add(form);
    //$firebase(bucketListRef).$add(form);
    $rootScope.hide();
  };
})

.controller('completedCtrl', function($rootScope, $scope, $window, $firebase) {
  $rootScope.show("Please wait... Processing");
  $scope.list = [];

  var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
  bucketListRef.on('value', function(snapshot) {
    $scope.list = [];
    var data = snapshot.val();

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].isCompleted == true) {
          data[key].key = key;
          $scope.list.push(data[key]);
        }
      }
    }
    if ($scope.list.length == 0) {
      $scope.noData = true;
    } else {
      $scope.noData = false;
    }

    $rootScope.hide();
  });

  $scope.deleteItem = function(key) {
    $rootScope.show("Please wait... Deleting from List");
    var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef.child(key).remove(function(error) {
      if (error) {
        $rootScope.hide();
        $rootScope.notify('Oops! something went wrong. Try again later');
      } else {
        $rootScope.hide();
        $rootScope.notify('Successfully deleted');
      }
    });
  };
});


function escapeEmailAddress(email) {
  if (!email) return false
  // Replace '.' (not allowed in a Firebase key) with ','
  email = email.toLowerCase();
  email = email.replace(/\./g, ',');
  return email.trim();
}
 