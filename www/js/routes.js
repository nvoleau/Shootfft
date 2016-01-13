angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('creationCompte', {
      url: '/signup',
      templateUrl: 'templates/creationCompte.html',
      controller: 'creationCompteCtrl'
    })
        
      
    
      
        
    .state('menu.listShoot', {
      url: '/Listshoot',
      views: {
        'side-menu21': {
          templateUrl: 'templates/listShoot.html',
          controller: 'listShootCtrl'
        }
      }
    })
        
      
    
      
    .state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('menu.creation', {
      url: '/creation',
      views: {
        'side-menu21': {
          templateUrl: 'templates/creation.html',
          controller: 'creationCtrl'
        }
      }
    })
        
      
    
      
        
    .state('competition', {
      url: '/Competition',
      templateUrl: 'templates/competition.html',
      controller: 'competitionCtrl'
    })
        
      
    
      
        
    .state('tir', {
      url: '/Tir',
      templateUrl: 'templates/tir.html',
      controller: 'tirCtrl'
    })
        
      
    
      
        
    .state('seance', {
      url: '/seance',
      templateUrl: 'templates/seance.html',
      controller: 'seanceCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});