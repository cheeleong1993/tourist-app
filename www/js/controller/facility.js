/**
 * Created by Gabeta on 24/07/2016. 
 */
app.controller('facilityCtrl',function($scope, $state, $cordovaCamera){

  	$scope.sideMenu = true;

  	$scope.goAttraction = function(){ 
		$state.go('attraction');
		}

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

	$scope.goAtmMap = function(){ 
		$state.go('atmMap');
		}
	$scope.goCafeMap = function(){
		$state.go('cafeMap');
		}
	$scope.goBusStopMap = function(){
		$state.go('busStopMap');
		}
	$scope.goToiletMap = function(){
		$state.go('toiletMap');
		}

})




app.controller('atmMapCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera, getData) {

    var options = {timeout: 10000, enableHighAccuracy: true};

    var ATMs = getData.refATM();
    console.log(ATMs.length);

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
            position: new google.maps.LatLng(info.latitude, info.longitude),
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            title: info.name,
        });
        marker.content = '<div class="infoWindowContent"></div>';
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<p>' + marker.title + '</p>');
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
      }  

      for (i = 0; i < ATMs.length; i++){
          createMarker(ATMs[i]);
          console.log(ATMs[i]);
      }

      google.maps.event.addDomListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        
    });
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
        saveToPhotoAlbum: false
    };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
      
        });
    }

    
  });


app.controller('cafeMapCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera, getData) {

    var options = {timeout: 10000, enableHighAccuracy: true};

    var cafes = getData.refCafe();
    console.log(cafes.length);

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
            position: new google.maps.LatLng(info.latitude, info.longitude),
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            title: info.name,
        });
        marker.content = '<div class="infoWindowContent"></div>';
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<p>' + marker.title + '</p>');
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
      }  

      for (i = 0; i < cafes.length; i++){
          createMarker(cafes[i]);
          console.log(cafes[i]);
      }

      google.maps.event.addDomListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        
    });
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
        saveToPhotoAlbum: false
    };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
      
        });
    }

    
  });


app.controller('toiletMapCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera) {

    var options = {timeout: 10000, enableHighAccuracy: true};

  
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
   
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
      var mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
   
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
   
    //   //Wait until the map is loaded
    //   google.maps.event.addListenerOnce($scope.map, 'idle', function(){
       
    //   var marker = new google.maps.Marker({
    //       map: $scope.map,
    //       animation: google.maps.Animation.DROP,
    //       position: latLng
    //   });      
     
    //   var myInfoWindow = new google.maps.InfoWindow({
    //       content: "Here You Are!"
    //   });

    //   google.maps.event.addListener(marker, 'click', function () {
    //       myInfoWindow.open($scope.map, marker);  
    //   });
    // });

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
            infoWindow.setContent('<p>' + marker.title + '</p>');
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
      }  

      for (i = 0; i < cities.length; i++){
          createMarker(cities[i]);
      }

    //   google.maps.event.addDomListener(marker, 'click', function () {
    //       infoWindow.open($scope.map, marker);
        
    // });
    }, function(error){
      console.log("Could not get location");
    });

    var cities = [
    {
        city : 'UMS Library Rest Room',
        desc : 'Test',
        lat : 6.034366,
        long : 116.117677 
    },{
        city : 'UMS Dewan Canselor Rest Room',
        desc : 'Test',
        lat : 6.036378,
        long : 116.118590
    },{
        city : 'UMS Aquarium and Marine Museum Rest Room',
        desc : 'Test',
        lat : 6.039827,
        long : 116.112754
    },{
        city : 'UMS Biotechnology Research Institute Rest Room',
        desc : 'Test',
        lat : 6.037297,
        long : 116.113357
    },{
        city : 'Faculty of Science and Natural Resources Rest Room',
        desc : 'Test',
        lat : 6.032800,
        long : 116.120689
    },{
        city : 'Faculty of Psychology and Education Rest Room',
        desc : 'Test',
        lat : 6.029732,
        long : 116.119016
    },
    {
        city : 'Fakulti Perniagaan, Ekonomi dan Perakaunan Rest Room',
        desc : 'Test',
        lat : 6.032767,
        long : 116.112735 
    }
];
    

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



app.controller('busStopMapCtrl', function($scope, $state, $cordovaGeolocation, $cordovaCamera, getData) {

    var options = {timeout: 10000, enableHighAccuracy: true};

    var bus = getData.refBus();
    console.log(bus.length);

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
            position: new google.maps.LatLng(info.latitude, info.longitude),
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            title: info.name,
        });
        marker.content = '<div class="infoWindowContent"></div>';
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<p>' + marker.title + '</p>');
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
      }  

      for (i = 0; i < bus.length; i++){
          createMarker(bus[i]);
          console.log(bus[i]);
      }

      google.maps.event.addDomListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        
    });
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
        saveToPhotoAlbum: false
    };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
      
        });
    }

    
  });