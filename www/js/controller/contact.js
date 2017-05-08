app.controller('contactCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera, $cordovaLaunchNavigator, $compile) {

    $scope.goEvic = function($event){
      $state.go('evic');
      }
    
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