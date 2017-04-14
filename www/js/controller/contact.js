app.controller('contactCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera, $cordovaLaunchNavigator, $compile) {

    $scope.goEvic = function($event){
      $state.go('evic');
      }
    
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
             //var contentString = $compile('<button ng-click="navigate()">Navigate</button>')($scope);
             var contentString = '<p>' + marker.title + '</p>';
            //infoWindow.setContent(contentString[0]);
            infoWindow.setContent(contentString);
            infoWindow.open($scope.map, marker);
            console.log(contentString[0]);
        });

        $scope.markers.push(marker);
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
        city : 'EcoCampus Visitor Information Centre',
        desc : 'Test',
        lat : 6.032509,
        long : 116.121645 
    }
];
    

    $scope.goCamera = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 540,
        targetHeight: 720,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
    };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            $state.go('camera1', {
            photo: $scope.imgURI
        });
        }, function (err) {
            // An error occured. Show a message to the user
      
        });
    }

    
  });