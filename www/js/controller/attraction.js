/**
 * Created by Gabeta on 24/07/2016. 
 */ 
app.controller('attractionCtrl',function($scope, $state, $cordovaCamera, $firebase, $ionicFilterBar, getData, $cordovaGeolocation){

  $scope.sideMenu = true;

  $scope.attractions = getData.refAttractions();

  // var attractions = getData.refAttractions();
  // $scope.deg2rad = function (deg) {return deg * (Math.PI/180);}
  // var options = {timeout: 10000, enableHighAccuracy: true};
  // $cordovaGeolocation.getCurrentPosition(options).then(function(position){
  //     var lat1  = position.coords.latitude;
  //     var lon1 = position.coords.longitude;
 	  
 	//   var R = 6371; // Radius of the earth in km
 	//   for (i = 0; i < attractions.length; i++){

  //         var dLat = $scope.deg2rad(attractions[i].latitude-lat1);  // deg2rad below
		//   var dLon = $scope.deg2rad(attractions[i].longitude-lon1); 
		//   var a = 
		//     Math.sin(dLat/2) * Math.sin(dLat/2) +
		//     Math.cos($scope.deg2rad(lat1)) * Math.cos($scope.deg2rad(attractions[i].latitude)) * 
		//     Math.sin(dLon/2) * Math.sin(dLon/2)
		//     ; 
		//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		//   var d = R * c;   
		//   console.log(d+'km'); 

		//   if (d <= 0.3) {$scope.textOverlay = attractions[i].title + ', University Malaysia Sabah'; break;}
  //       }
 	  
	 //  console.log($scope.textOverlay); 

  //   });

  $scope.openAttraction = function (attraction_id) {
	
	    $state.go('single', {
	        attraction_id: attraction_id
	    });
	}

	$scope.searchAttraction = function () {
	    var filterBarInstance = $ionicFilterBar.show({
	      cancelText: "<i class='ion-ios-close-outline'></i>",
	      items: $scope.attractions,
	      update: function (filteredItems, filterText) {
	        $scope.attractions = filteredItems;
	      }
	    });
	  };

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
    
 //  $scope.goMap = function(){
	// $state.go('map');
	// }

 //  $scope.goAttraction = function(){
	// $state.go('attraction');
	// }

	

 //  $scope.goSingle = function(){

	// $state.go('single');

	// }

	// $scope.attractions = [ 
	//      {
	//      	"id": "1",
	//         "image":"img/Attraction/chancellery building/chancellery_1.jpg",
	//         "name":"Chancellery Building"
	//      },
	//      {
	//      	"id": "2",
	//         "image":"img/Attraction/chancellor hall/ums_dewan_canselor.jpg",
	//         "name":"Dewan Caunselor UMS"
	//      },
	//      {
	//      	"id": "3",
	//         "image":"img/Attraction/clock tower/ums_clock_menarajam_resize.jpg",
	//         "name":"UMS Clock Tower"
	//      },
	//      {
	//      	"id": "4",
	//         "image":"img/Attraction/marine museum/marine_1.jpg",
	//         "name":"Marine Musuem UMS"
	//      },
	//      {
	//      	"id": "5",
	//         "image":"img/Attraction/mosque/ums_masjid.jpg",
	//         "name":"UMS Masjid"
	//      }
	//   ];

	// $scope.mostVisited = [
	//      {
	//         "image":"img/museum.jpg",
	//         "name":"Laman Rasmi UMS"
	//      },
	//      {
	//         "image":"img/odec.jpg",
	//         "name":"Pantai ODEC UMS"
	//      },
	//      {
	//         "image":"img/library.jpg",
	//         "name":"UMS Libraryy"
	//      }
	//   ];

})
