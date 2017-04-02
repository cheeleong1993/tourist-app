app.controller("evicCtrl", function ($scope, $state, $ionicPopup, $cordovaGeolocation) { 
  
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
     
      var mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
   
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
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
             var contentString = '<p>' + marker.title + '</p>';
            infoWindow.setContent(contentString);
            infoWindow.open($scope.map, marker);
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


