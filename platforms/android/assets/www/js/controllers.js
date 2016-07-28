var EventApp = angular.module('EventApp.controllers', ['firebase'])

EventApp.controller('AppCtrl', function($scope, $ionicModal, $timeout, $filter,$firebaseArray) {

  $scope.loginData = {};

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBADqu0wxfoZClv-FUUFe4vxVk3iIgDhKc",
    authDomain: "gootoplay-84108.firebaseapp.com",
    databaseURL: "https://gootoplay-84108.firebaseio.com",
    storageBucket: "",
  };

  var app = firebase.initializeApp(config);
  var database = app.database();
  var auth = app.auth();

            var events         = new Firebase("https://gootoplay-84108.firebaseio.com/event");
            var events_obj    = $firebaseArray(events);
            //var events_obj    = $firebase(events).$asArray();
            $scope.now = new Date();
            $scope.event  = events_obj;
            $scope.upcomingEvents = 0;



            //var list = $firebaseArray(ref);
            events_obj.$loaded(function(x) {
                x === events_obj; // true
                console.log(x);
                
                
                angular.forEach($scope.event, function(value, key){
                  if($scope.getDates(value.startDates) > $scope.now){
                    $scope.upcomingEvents ++;
                  }
                });

                events_obj.$watch(function(event) {
                  console.log(event);
                });

              }, function(error) {
                console.error("Error:", error);
              });


           

            $scope.getDates = function(dataDate) {
                 return new Date(dataDate);
            };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

/*---------------------------------------------------------
          ADD EVENT
---------------------------------------------------------*/
  EventApp.controller("AddEventCtrl",function($scope,$filter,$firebaseObject,$firebaseArray){
    
  



       
      $scope.saveEventData = {};
      $scope.contacts =[];
      $scope.prize =[];
      $scope.addOns ={};
      $scope.tourneyCategorySave = {};

      $scope.addContactField = function() {
          $scope.contacts.push({contactId:null,number:"",name:""});
      }
      $scope.removeContactField = function(array_index) {
          $scope.contacts.splice(array_index,1);
      }

      $scope.addPrizeField = function() {
          $scope.prize.push({name:"",amount:""});
      }

      $scope.removePrizeField = function(array_index) {
          $scope.prize.splice(array_index,1);
      }

      /*var tCategory         = new Firebase("https://gootoplay.firebaseio.com/tourneyCategory");
      var aCategory         = new Firebase("https://gootoplay.firebaseio.com/ageCategory");
      var mCategory         = new Firebase("https://gootoplay.firebaseio.com/matchCategory");
      //var mType             = new Firebase("https://gootoplay.firebaseio.com/matchType");
      var shuttleBrand      = new Firebase("https://gootoplay.firebaseio.com/shuttleBrand");
      var shuttleType       = new Firebase("https://gootoplay.firebaseio.com/shuttleType");

      // download the data into a local object
      var tCategory_Obj     = $firebaseArray(tCategory);
      var aCategory_Obj     = $firebaseArray(aCategory);
      var mCategory_Obj     = $firebaseArray(mCategory);
      //var mType_Obj         = $firebaseObject(mType);
      var shuttleBrand_Obj  = $firebaseArray(shuttleBrand);
      var shuttleType_obj   = $firebaseArray(shuttleType);

      $scope.tourneyCategory  = tCategory_Obj;
      $scope.ageCategory      = aCategory_Obj;
      $scope.matchCategory    = mCategory_Obj;
      //$scope.matchtype        = mType_Obj;
      $scope.shuttleBrand     = shuttleBrand_Obj;
      $scope.shuttleType      = shuttleType_obj*/


     

      $scope.tourneyCategory = [
        { name: "Open to State", id: 0 },
        { name: "B' Level", id: 1 },
        { name: "Club tournament", id: 2 },
        { name: "Non medalist", id: 3 },
        { name: "District Level", id: 4 },
        { name: "Open to all", id: 5 },
        { name: "Corporate", id: 6 },
        { name: "University Level", id: 7 },
        { name: "Others", id: 8 }
      ];

      $scope.ageCategory = [
        { name: "Under 13", id: 0 },
        { name: "Under 15", id: 1 },
        { name: "Under 17", id: 2 },
        { name: "Under 19", id: 3 },
        { name: "Veterans 45+", id: 4 },
        { name: "Veterans", id: 5 },
        { name: "Veterans 35+", id: 6 },
        { name: "Veterans 40+", id: 7 },
        { name: "No age limit", id: 8 },
        { name: "Others", id: 9 }
      ];

      $scope.matchCategory = [
        { name: "Men's Doubles", boolVal: false, entryfee:'', matchtype:'', id:0 },
        { name: "Men's Singles", boolVal: false , entryfee:'', matchtype:'', id:1},
        { name: "Women's Doubles", boolVal: false , entryfee:'', matchtype:'', id:2},
        { name: "Women's Singles", boolVal: false , entryfee:'', matchtype:'', id:3},
        { name: "Mixer Doubles", boolVal: false , entryfee:'', matchtype:'', id:4},
        { name: "Team Event", boolVal: false , entryfee:'', matchtype:'', id:5}
      ];

      $scope.matchType = [
        { name: "Knockout 30 points", id: 0 },
        { name: "Knockout 21 points", id: 1 },
        { name: "3 sets 21 points", id: 2 }
      ];

      $scope.shuttleBrand = [
        { name: "Yonex", id: 0 },
        { name: "Li Ning", id: 1 },
        { name: "Others", id: 2 }
      ];
      $scope.shuttleType = [
        { name: "Plastic: Mavis 350", shuttleBrand_id: 0 },
        { name: "Feather: Mavis 300", shuttleBrand_id: 1 }
      ];

      $scope.printAll = function(val){
        var mtObj = $filter('filter')($scope.matchCategory, { boolVal: parseInt(val) }, true)[0];
        //return mtObj;
        console.log(mtObj);
      };

      
      $scope.matchtype_mc = [];
      $scope.saveEventBtn = function(){
        
        angular.forEach($scope.matchCategory, function(value, key){
        if(value.boolVal == true)
          $scope.matchtype_mc.push({name:value.name, entryFees:value.entryfee, matchtype:value.matchtype});
        });
        //console.log($scope.poda);
        $scope.tourneyCategorySave.matchCategory = $scope.matchtype_mc;
        $scope.saveEventData.contactList = $scope.contacts;
        $scope.saveEventData.prizeList = $scope.prize;
        $scope.saveEventData.addOnsList = $scope.addOns;
        $scope.saveEventData.tourneyCategory = $scope.tourneyCategorySave;
        
        $scope.saveEventData.startDates = $scope.saveEventData.sd.toString();
        $scope.saveEventData.startTime  = $scope.saveEventData.st.toString();
        $scope.saveEventData.endTime    = $scope.saveEventData.et.toString();
        $scope.saveEventData.endDates   = $scope.saveEventData.ed.toString();
        $scope.saveEventData.timeStamp  = new Date().toString(); //Firebase.ServerValue.TIMESTAMP;
        
        //console.log($scope.saveEventData.startDates.toString());
        var ref = new Firebase("https://gootoplay-84108.firebaseio.com/event");
        $scope.event = $firebaseArray(ref);

        $scope.event.$add($scope.saveEventData);
        /*var databaseRef = database.ref().child('event');
        databaseRef.push().set($scope.saveEventData);*/

        //To get date from Firebase
        //$scope.startDates = new Date(event.startDates);
        


      };
      
     


  });
/*---------------------------------------------------------
          END ADD EVENT
---------------------------------------------------------*/


/*---------------------------------------------------------
          PASSWORD SETTING
---------------------------------------------------------*/


  EventApp.controller("PasswordCtrl",function($scope,$filter){
    $scope.passwordObj = {};

    $scope.changePasswordBtn =  function(val){
      $scope.passwordObj.userId = 1;
      console.log(val);
    };
        
    
  });

/*---------------------------------------------------------
          PROFILE SETTING
---------------------------------------------------------*/
  EventApp.controller("ProfileCtrl",function($scope,$filter){

    console.log("p working");
  });

/*---------------------------------------------------------
          SIGNUP
---------------------------------------------------------*/
  EventApp.controller("SignupCtrl",function($scope,$filter,$state,$http){
    $scope.signupObj = {};
    $scope.otpBjb = {};
    var confighead = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        };


        

            // data = data + "&client_id=" + $translate.instant('API_CLIENT_ID');

            // data = data + "&portal_id=" + $translate.instant('API_PORTAL_ID');

      $scope.goToOTP = function(signupObj){
        //console.log(signupObj);
        var data = 'name='+$scope.signupObj.name+'&mobile='+$scope.signupObj.mobile+'&email='+$scope.signupObj.email;
        $http.post("http://gootoplay.com/api/request_sms.php", data,confighead).then(function(response){
            console.log(response);
            if(response.status==200){
              $state.go('otp');
            }
            
          },function(data){
              console.log(data);
          });
       };

      $scope.verify = function(otpBjb){
        var data = 'otp='+$scope.otpBjb.otp;
          $http.post("http://gootoplay.com/api/verify_otp.php", data,confighead).then(function(response){
            if(response.status==200){
              $state.go('app.dashboard');
            }
              //$state.go('app.dashboard');
            console.log(response);
          },function(data){
              console.log(data);
          });
          

        
      }

  });


/*---------------------------------------------------------
          DASHBOARD PAGE
---------------------------------------------------------*/
  EventApp.controller("DashboardCtrl",function($scope,$timeout,$filter,roundProgressService,$firebaseObject,$firebaseArray,$timeout){

           var events         = new Firebase("https://gootoplay-84108.firebaseio.com/event");
            var events_obj    = $firebaseArray(events);
            //var events_obj    = $firebase(events).$asArray();
            $scope.now = new Date();
            $scope.event  = events_obj;
            $scope.upcomingEvents = 0;

            

            events_obj.$loaded(function(x) {
                x === events_obj; // true
                $scope.past_event_current = x.length;
                angular.forEach(x, function(value, key){
                  if($scope.getDates(value.startDates) > $scope.now){
                    $scope.upcomingEvents ++;
                  }
                });

                events_obj.$watch(function(event) {
                  console.log(event);
                });

              }, function(error) {
                console.error("Error:", error);
              });
            
            
            
            // $timeout(function(){
            //   for (var i = 0; $scope.event.length > i; i++) {
            //     console.log($scope.event[i].startDates);
            //   }
            // },400);

            $scope.checkit = $filter('isAfter')($scope.event,'startDates');

            


            //$scope.past_event_current = 128;
            $scope.past_event_max     = 500;
            //$scope.current =        $scope.event.length;
            $scope.max =            100;
            $scope.offset =         0;
            $scope.timerCurrent =   0;
            $scope.uploadCurrent =  0;
            $scope.stroke =         15;
            $scope.radius =         125;
            $scope.isSemi =         false;
            $scope.rounded =        false;
            $scope.responsive =     true;
            $scope.clockwise =      true;
            $scope.currentColor =   '#6184DB';
            $scope.bgColor =        '#eaeaea';
            $scope.duration =       800;
            $scope.currentAnimation = 'easeInOutCubic';
            $scope.animationDelay = 0;


            
            
              $scope.getDates = function(dataDate) {
                 return new Date(dataDate);
              };
             

            
   

          // var databaseRef = database.ref().child('chat');


          // $scope.sendButton = function(){
          //   var chat = {name:"username", message: textInput.value};
          //   databaseRef.push().set(chat);
          //   textInput.value = "";
          // }




  });


/*---------------------------------------------------------
          UPCOMING EVENT PAGE
---------------------------------------------------------*/
  EventApp.controller("UpcomingEventsCtrl",function($scope,$filter,$firebaseObject,$firebaseArray){

            var events         = new Firebase("https://gootoplay-84108.firebaseio.com/event");
            var events_obj    = $firebaseArray(events);
            $scope.event  = events_obj;

            $scope.now = new Date();

             $scope.getDates = function(dataDate) {
               return new Date(dataDate);
            };
            console.log($scope.event);
            //$scope.logdate = $filter('date')($scope.note.logdate, "EEEE, MMMM d");




            $scope.groups = [];
              for (var i=0; i<10; i++) {
                $scope.groups[i] = {
                  name: i,
                  items: []
                };
                for (var j=0; j<3; j++) {
                  $scope.groups[i].items.push(i + '-' + j);
                }
              }
              
              /*
               * if given group is the selected group, deselect it
               * else, select the given group
               */
              $scope.toggleGroup = function(group) {
                if ($scope.isGroupShown(group)) {
                  $scope.shownGroup = null;
                } else {
                  $scope.shownGroup = group;
                }
              };
              $scope.isGroupShown = function(group) {
                return $scope.shownGroup === group;
              };
  


  
  });




