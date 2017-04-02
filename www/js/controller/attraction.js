/**
 * Created by Gabeta on 24/07/2016.
 */ 
app.controller('attractionCtrl',function($scope, $state, $cordovaCamera, $firebase, $ionicFilterBar, getData){

  $scope.sideMenu = true;

  $scope.attractions = getData.refAttractions();

  $scope.openAttraction = function (attraction_id) {
	
	    $state.go('single', {
	        attraction_id: attraction_id
	    });
	}

  $scope.goMap = function(){
	$state.go('map');
	}

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

  $scope.goSingle = function(){

	$state.go('single');

	}

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

	$scope.mostVisited = [
	     {
	        "image":"img/museum.jpg",
	        "name":"Laman Rasmi UMS"
	     },
	     {
	        "image":"img/odec.jpg",
	        "name":"Pantai ODEC UMS"
	     },
	     {
	        "image":"img/library.jpg",
	        "name":"UMS Libraryy"
	     }
	  ];

	$scope.searchAttraction = function () {
    var filterBarInstance = $ionicFilterBar.show({
      cancelText: "<i class='ion-ios-close-outline'></i>",
      items: $scope.attractions,
      update: function (filteredItems, filterText) {
        $scope.attractions = filteredItems;
      }
    });
  };
})
