app.controller("singleCtrl", function ($scope, getData, $state, $cordovaGeolocation, $cordovaLaunchNavigator) { 

    var data = getData.get($state.params.attraction_id);
    var options = {timeout: 10000, enableHighAccuracy: true};

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
     
        var mapOptions = {
          center: latLng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
   
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

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
               //var contentString = $compile('<button ng-click="navigate()">Navigate</button>')($scope);
               var contentString = '<p>' + marker.title + '</p>';
              //infoWindow.setContent(contentString[0]);
              infoWindow.setContent(contentString);
              infoWindow.open($scope.map, marker);
              console.log(contentString[0]);
          });

          //$scope.markers.push(marker);
        }  

        $scope.navigate= function(){ 
          var dest = [6.039858, 116.112751];
              $cordovaLaunchNavigator.navigate(dest, {
                start: null,
                enableDebug: true
              }).then(function () {
                alert("Navigator launched");
              }, function (err) {
                alert(err);
              });
          alert("Navigator launched");
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


