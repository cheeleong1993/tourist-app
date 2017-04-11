/**
 * Created by Gabeta on 24/07/2016. 
 */ 
app.controller('homeCtrl',function($scope, $state, $cordovaCamera, $ionicPopup, getData, $cordovaLocalNotification, $interval, $cordovaGeolocation){ 

	// context awareness - check location in interval 10 minutes
	$scope.aware = function(){
		var options = {timeout: 10000, enableHighAccuracy: true};
        var attractions = getData.refAttractions();
        $scope.deg2rad = function (deg) {return deg * (Math.PI/180);}
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
          var lat1  = position.coords.latitude;
          var lon1 = position.coords.longitude;

        	var R = 6371; // Radius of the earth in km
	        for (i = 0; i < attractions.length; i++){

	          var dLat = $scope.deg2rad(attractions[i].latitude-lat1);  // deg2rad below
	          var dLon = $scope.deg2rad(attractions[i].longitude-lon1); 
	          var a = 
	            Math.sin(dLat/2) * Math.sin(dLat/2) +
	            Math.cos($scope.deg2rad(lat1)) * Math.cos($scope.deg2rad(attractions[i].latitude)) * 
	            Math.sin(dLon/2) * Math.sin(dLon/2)
	            ; 
	          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	          var d = R * c;   
	          console.log(d+'km'); 

	          if (d <= 0.5) {
	          	var alarmTime = new Date();
	          	alarmTime.setMinutes(alarmTime.getMinutes() + 0.05);
	          	$cordovaLocalNotification.add({
		            date: alarmTime,
		            title: "You are near to",
		            message: attractions[i].title,
		            autoCancel: true
		        }).then(function () {
		            console.log("The notification has been set");
		        });
	          }
	        }
	    });	   
		}

	$interval(function() {
		$scope.aware();		 
	}, 300000);

	
	var disclaimer = "<p style='text-align: justify;'>Our Service may contain links to third-party web sites or services that are not owned or controlled by UMS. UMS has no control over, and assumes no responsibility for, thecontent, privacy policies, or practices of any third party web sites or services. Youfurther acknowledge and agree that UMS shall not be responsible for liable, directly or indirectly, for any damage or loss caused by or in connection with use of or reliance on any such content, goods or services availabl on or throuh any such web sites or services.</p>" 
;
	$scope.advertisements = getData.refAdvertisements();

	$scope.sideMenu = true;  

	$scope.goMap = function(){
		$state.go('map');
		}
		// $state.go('camera1');
		// }
	$scope.goAttraction = function(){
		$state.go('attraction');
		}

	$scope.goFacility= function(){ 
		$state.go('facility');
		}

	$scope.goEvic = function($event){
		$state.go('evic');
		}

	$scope.showTerm = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Term and Condition:',
       template: disclaimer
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };

   $scope.exit = function() {
   		var confirmPopup = $ionicPopup.confirm({
		     template: 'Are you sure to exit this application?'
		   });
   		confirmPopup.then(function(res) {
		     if(res) {
		     	window.close();
				ionic.Platform.exitApp();
		    	console.log('quit');
		     } else {
		       console.log('stay');
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

    // $scope.goNavigate = function($event){
	// 	$event.stopPropagation();
	// 	$state.go('map');
	// 	}

	// $scope.goSingle = function($event){
	// 	$state.go('single');
	// 	}

	// $scope.advertisements = [
	//      {
	//         "imageURL":"https://firebasestorage.googleapis.com/v0/b/ums-eco-campus-a-1486986690367.appspot.com/o/advertisements%2Fad_1.png?alt=media&token=f6d1a4b7-04bd-45b5-a28e-4917d3a8b84a"
	//      },
	//      {
	//         "imageURL":"https://firebasestorage.googleapis.com/v0/b/ums-eco-campus-a-1486986690367.appspot.com/o/advertisements%2Fad_2.png?alt=media&token=50b86edb-1076-42be-8f36-0136b5f9c33b"
	//      },
	//      {
	//         "imageURL":"img/ad_3.jpg"
	//      },
	//      {
	//         "imageURL":"img/ad4.JPG"
	//      },
	//      {
	//         "imageURL":"img/ad_5.jpg"
	//      }
	//   ];

	// $scope.mostVisited = [
	//      {
	//         "image":"img/Attraction/chancellery building/chancellery_1.jpg",
	//         "name":"Chancellery Building"
	//      },
	//      {
	//         "image":"img/Attraction/chancellor hall/ums_dewan_canselor.jpg",
	//         "name":"UMS Clock Tower"
	//      },
	//      // {
	//      //    "image":"img/Attraction/clock tower/ums_clock_menarajam_resize.jpg",
	//      //    "name":"UMS Clock Tower"
	//      // },
	//      // {
	//      //    "image":"img/Attraction/mosque/ums_masjid.jpg",
	//      //    "name":"UMS Clock Tower"
	//      // },
	//      {
	//         "image":"img/Attraction/marine museum/marine_1.jpg",
	//         "name":"Marine Musuem UMS"
	//      }
	//   ];

	
})
