app.controller('mapCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera, $cordovaLaunchNavigator, $compile, getData) { 

    var options = {timeout: 10000, enableHighAccuracy: true};
    var attractions = getData.refAttractions(); 

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

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info){
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(info.latitude, info.longitude),
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              title: info.title,
          });
          marker.content = '<div class="infoWindowContent"></div>';
          google.maps.event.addListener(marker, 'click', function(){

              var contentString = "<div><button class='button button-clear button-positive' ng-click='navigate()'>"+marker.title+"</button></div>";
              var compiled = $compile(contentString)($scope);

              $scope.navigate= function(){ 
                console.log(marker.position);
                var dest = [info.latitude, info.longitude];
                    $cordovaLaunchNavigator.navigate(dest, {
                      start: null,
                      enableDebug: true
                    }).then(function () {
                      // alert("Navigator launched");
                    }, function (err) {
                      alert(err);
                    });
                //alert("Navigator launched");
                }
              infoWindow.setContent(compiled[0]);
              infoWindow.open($scope.map, marker);
              console.log(contentString);
              });

          $scope.markers.push(marker);
        }        

        for (i = 0; i < attractions.length; i++){
            createMarker(attractions[i]);          
        }


      }, function(error){
        console.log("Could not get location");
      });    


    $scope.goCamera = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
    };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
      
        });
    }

    
  });