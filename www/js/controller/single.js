app.controller("singleCtrl", function ($scope, getData, $state, $cordovaGeolocation, $cordovaLaunchNavigator, $compile, $ionicPopup, $timeout) { 

    var data = getData.get($state.params.attraction_id);
    var options = {timeout: 10000, enableHighAccuracy: true};

    $scope.showPopup = function() {
    $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="password" ng-model="data.wifi">',
     title: $scope.title,
     subTitle: 'How much you loved?',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Submit</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 30000);
  };
    // $scope.slides = [ 
    //    { 
    //       "image":"img/Attraction/chancellery building/chancellery_1.jpg"
    //    },
    //    {
    //       "image":"img/Attraction/chancellery building/chancellery_2.jpg"
    //    },
    //    {
    //       "image":"img/Attraction/chancellery building/chancellery_3.jpg"
    //    },
    //    {
    //       "image":"img/Attraction/chancellery building/chancellery_4.jpg"
    //    },
    //    {
    //       "image":"img/Attraction/chancellery building/chancellery_5.jpg"
    //    },
    //    {
    //       "image":"img/Attraction/chancellery building/ums_canselori.jpg"
    //    }
    // ];

    

    $scope.title = data.title;
    $scope.description = data.description;
    $scope.imageURL = data.imageURL;

    $scope.viewMap = function(attraction_id){

      $state.go('attraction_map', {
          attraction_id: $state.params.attraction_id
      });
    }

    

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
   
        var latLng = new google.maps.LatLng(data.latitude, data.longitude);
        var user_position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
   
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //create current location marker
        var user_marker = new google.maps.Marker({
            map: $scope.map,
            icon: 'img/marker.png',
            animation: google.maps.Animation.DROP,
            position: user_position
          });      
       
        var myInfoWindow = new google.maps.InfoWindow({
            content: "Here You Are!"
          });

        google.maps.event.addListener(user_marker, 'click', function () {
            myInfoWindow.open($scope.map, user_marker);  
          });

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info){

          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(info.lat, info.long),
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              title: info.city,
          });

          marker.content = '<div class="infoWindowContent"></div>';
          google.maps.event.addListener(marker, 'click', function(){

               var contentString = "<div><button class='button button-clear button-positive' ng-click='navigate()'>"+marker.title+"</button></div>";
               var compiled = $compile(contentString)($scope);

               $scope.navigate= function(){ 
                  console.log(marker.position);
                  var start = [position.coords.latitude, position.coords.longitude];
                  var dest = [info.lat, info.long];
                      $cordovaLaunchNavigator.navigate(dest).then(function () {
                        // alert("Navigator launched");
                      }, function (err) {
                        alert(err);
                      });
                  alert("Navigator launched");
                  }

              infoWindow.setContent(compiled[0]);
              infoWindow.open($scope.map, marker);

          });

          //$scope.markers.push(marker);
        }  

        for (i = 0; i < cities.length; i++){
            createMarker(cities[i]);
        }

        google.maps.event.addDomListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
          
      });
      }, function(error){
        console.log("Could not get location");
      });

      var cities = [    
      {
          city : data.title,
          desc : 'Test',
          lat : data.latitude,
          long : data.longitude 
      }
  ];
});


