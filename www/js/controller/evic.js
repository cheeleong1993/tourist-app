app.controller("evicCtrl", function ($scope, $state, $ionicPopup, $cordovaGeolocation, $cordovaLaunchNavigator, $compile) { 
  
  $scope.goEvicMap = function(){
    $state.go('evicMap');
    } 

  var activities = "<p>-Information centre for visitors about UMS in particular</p><p>-Video Screening</p><p>-Souvenirs shopping</p><p>-Pedal boat rental at EcoCampusPark lake</p><p>-Buggies rental for visitors to explore around the campus</p><p>Entrance Fee: No</p>";

  $scope.showActivities = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Activities:',
       template: activities 
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   }; 

   var cities = [
    {
        city : 'EcoCampus Visitor Information Centre',
        desc : 'Test',
        lat : 6.032509,
        long : 116.121645 
    }
    ];

   var options = {timeout: 10000, enableHighAccuracy: true};

   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      var latLng = new google.maps.LatLng(6.032509, 116.121645);
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
          icon: 'img/user_marker1.png',
          animation: google.maps.Animation.DROP,
          position: user_position
        });      
     
      var myInfoWindow = new google.maps.InfoWindow({
          content: "Here You Are!"
        });

      google.maps.event.addListener(user_marker, 'click', function () {
          myInfoWindow.open($scope.map, user_marker);  
        });

      $scope.markers = [];

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

            var contentString = "<div><button class='button button-clear button-positive' ng-click='navigate()'>"+info.city+"</button></div>";
            var compiled = $compile(contentString)($scope);

            $scope.navigate= function(){ 
              var dest = [info.lat, info.long];
                  $cordovaLaunchNavigator.navigate(dest).then(function () {
                    // alert("Navigator launched");
                  }, function (err) {
                    //alert(err);
                  });
              //alert("Navigator launched");
              }
            infoWindow.setContent(compiled[0]); 
            infoWindow.open($scope.map, marker);
            console.log(contentString);
            });

        $scope.markers.push(marker);
      }    

      for (i = 0; i < cities.length; i++){
          createMarker(cities[i]);
      }
      google.maps.event.addDomListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        
      });

   });
});


