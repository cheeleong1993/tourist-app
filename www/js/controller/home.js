/**
 * Created by Gabeta on 24/07/2016. 
 */  
app.controller('homeCtrl',function($scope, $state, $cordovaCamera, $ionicPopup, getData, $cordovaLocalNotification, $interval, $cordovaGeolocation, $cordovaFile){ 
	// $scope.qwe = "img/ad_2.png";

	// 	alert("strat");
 //      var name = $scope.qwe.substr($scope.qwe.lastIndexOf('/') + 1);
 //      console.log(name);
 //      var namePath = $scope.qwe.substr(0, $scope.qwe.lastIndexOf('/') + 1);
 //      console.log(namePath);

 //      $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory,name)
 //            .then(function(success) {
 //                alert("success");
 //                $scope.fileName = cordova.file.dataDirectory + name;
 //                alert("success 2nd");
 //            }, function(error) {
 //              alert("failed");
 //            });


	// context awareness - check location in interval 10 minutes
	$scope.nearby_att = 'lo';
	$scope.notify = function(title){

		var alarmTime = new Date();
	    alarmTime.setMinutes(alarmTime.getMinutes() + 0.05);

		$cordovaLocalNotification.add({
            date: alarmTime,
            title: "You are near to",
            message: title,
            autoCancel: true
        }).then(function () {
        	
            console.log("The notification has been set");
        });
	}

	$scope.get_loc = function(){
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
	          //console.log(d+'km'); 
	          console.log($scope.nearby_att);
	          if (d <= 0.5) {
	          	if ($scope.nearby_att != attractions[i].title) {

	          		$scope.nearby_att = attractions[i].title;
	          		$scope.notify(attractions[i].title);

	          	}
	          	
	          }
	        }
	    });	   
		}


	$interval(function() {
		$scope.get_loc();	
	}, 30000);

	
	var disclaimer = "<p style='text-align: justify;'>Our Service may contain links to third-party web sites or services that are not owned or controlled by UMS. UMS has no control over, and assumes no responsibility for, thecontent, privacy policies, or practices of any third party web sites or services. Youfurther acknowledge and agree that UMS shall not be responsible for liable, directly or indirectly, for any damage or loss caused by or in connection with use of or reliance on any such content, goods or services availabl on or throuh any such web sites or services.</p>" 
;
	// $scope.advertisements = getData.refAdvertisements();

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

    // $scope.goNavigate = function($event){
	// 	$event.stopPropagation();
	// 	$state.go('map');
	// 	}

	// $scope.goSingle = function($event){
	// 	$state.go('single');
	// 	}

	$scope.advertisements = [
	     {
	        "imageURL":"img/ad_1.png"
	     },
	     {
	        "imageURL":"img/ad_2.png"
	     },	
	     {
	        "imageURL":"img/ad_3.jpg"
	     }
	     // ,
	     // {
	     //    "imageURL":"img/ad4.JPG"
	     // },
	     // {
	     //    "imageURL":"img/ad_5.jpg"
	     // }
	  ];

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
