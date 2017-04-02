app.controller('mapCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera, $cordovaLaunchNavigator, $compile, getData) { 

    var options = {timeout: 10000, enableHighAccuracy: true};
 
    var attractions = getData.refAttractions();
    console.log(attractions);

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
   
        var latLng = new google.maps.LatLng(6.032509, 116.121645);
     
        var mapOptions = {
          center: latLng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
   
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      $scope.markers = [];
   
      // //Wait until the map is loaded
      // google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      
      //   var marker = new google.maps.Marker({
      //       map: $scope.map,
      //       animation: google.maps.Animation.DROP,
      //       position: latLng,
      //       icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      //   });      
     
      //   var myInfoWindow = new google.maps.InfoWindow({
      //       content: "Here You Are!"
      //   });

      //   google.maps.event.addListener(marker, 'click', function () {

      //       myInfoWindow.open($scope.map, marker); 

      //   });
      // });

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
      for (i = 0; i < attractions.length; i++){
          createMarker(attractions[i]);
      }

      google.maps.event.addDomListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        
    });
    }, function(error){
      console.log("Could not get location");
    });    

  //   var cities = [
  //     {
  //         city : 'Aquarium & Marine Museum',
  //         desc : 'Test',
  //         lat : 6.039858,
  //         long : 116.112751 
  //     },
  //     {
  //         city : 'Dewan Canselor UMS',
  //         desc : 'Test',
  //         lat : 6.036401,
  //         long : 116.115639
  //     },
  //     {
  //         city : 'Canselori UMS',
  //         desc : 'Test',
  //         lat : 6.034358,
  //         long : 116.115639 
  //     },
  //     {
  //         city : 'UMS Library',
  //         desc : 'Test',
  //         lat : 6.034358,
  //         long : 116.117660 
  //     },
  //     {
  //         city : 'UMS Peak',
  //         desc : 'Test',
  //         lat : 6.042461,
  //         long : 116.119541 
  //     },
  //     {
  //         city : 'Mosque UMS',
  //         desc : 'Test',
  //         lat : 6.038148,
  //         long : 116.125190 
  //     },
  //     {
  //         city : 'Clock Tower UMS',
  //         desc : 'Test',
  //         lat : 6.0325096,
  //         long : 116.121645 
  //     },{
  //         city : 'EcoCampus Visitor Information Centre',
  //         desc : 'Test',
  //         lat : 6.032509,
  //         long : 116.121645 
  //     },{
  //         city : 'Kompleks Sukan UMS',
  //         desc : 'Test',
  //         lat : 6.042852,
  //         long : 116.127930
  //     },
  //     {
  //         city : 'UMS ODEC Beach',
  //         desc : 'Test',
  //         lat : 6.043048,
  //         long : 116.111757 
  //     }
  // ];
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
        saveToPhotoAlbum: false
    };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
      
        });
    }

    
  });