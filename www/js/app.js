// header #005803
// background, bottm section #ccffbb
// button1 #01bb9b
// button2 #028482
// 320*480
// Ionic Starter App

  
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova', 'firebase', 'jett.ionic.filter.bar', 'ums.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault(); 
    }

    if(window.plugins && window.plugins.AdMob) {
        var admob_key = device.platform == "Android" ? "ca-app-pub-6984197237691480/5655623658" : "ca-app-pub-6984197237691480/5655623658";
        var admob = window.plugins.AdMob;
        admob.createBannerView( 
            {
                'publisherId': admob_key,
                'adSize': admob.AD_SIZE.BANNER,
                'bannerAtTop': false
            },  
            function() {
                admob.requestAd(
                    { 'isTesting': false }, 
                    function() {
                        admob.showAd(true);
                    }, 
                    function() { console.log('failed to request ad'); }
                );
            }, 
            function() { console.log('failed to create banner view'); }
        );
    }
  });
})

  .config(function($stateProvider,$urlRouterProvider){

    $stateProvider.state('home', {
      url:'/home',
      templateUrl:'templates/home.html',
      controller : 'homeCtrl'
    })

    $stateProvider.state('attraction', {
      url:'/attraction',
      templateUrl:'templates/attraction.html',
      controller : 'attractionCtrl'
    })

    $stateProvider.state('single', {
      url:'/attraction/:attraction_id',
      templateUrl:'templates/single.html',
      controller: 'singleCtrl'
    })

    $stateProvider.state('facility', {
      url: '/facility',
      templateUrl: 'templates/facility.html',
      controller: 'facilityCtrl'
    })
    $stateProvider.state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'mapCtrl'
    })
    $stateProvider.state('attraction_map', {
      url: '/map/:attraction_id',
      templateUrl: 'templates/attraction_map.html',
      controller: 'singleCtrl'
    })
    $stateProvider.state('evic', {
      url:'/evic',
      templateUrl:'templates/evic.html',
      controller: 'evicCtrl'
    })
    $stateProvider.state('evicMap', {
      url:'/evicMap',
      templateUrl:'templates/evicMap.html',
      controller: 'evicCtrl'
    })
    $stateProvider.state('atmMap', {
      url: '/atmMap',
      templateUrl: 'templates/facilityMap/atmMap.html',
      controller: 'atmMapCtrl'
    })
    $stateProvider.state('cafeMap', {
      url: '/cafeMap',
      templateUrl: 'templates/facilityMap/cafeMap.html',
      controller: 'cafeMapCtrl'
    })
    $stateProvider.state('toiletMap', {
      url: '/toiletMap',
      templateUrl: 'templates/facilityMap/toiletMap.html',
      controller: 'toiletMapCtrl'
    })
    $stateProvider.state('busStopMap', {
      url: '/busStopMap',
      templateUrl: 'templates/facilityMap/busStopMap.html',
      controller: 'busStopMapCtrl'
    })
    $stateProvider.state('camera', {
      url: '/camera',
      templateUrl: 'templates/camera.html',
      //controller: 'imageController'
    })
    $stateProvider.state('camera1', {
      url: '/camera1',
      templateUrl: 'templates/camera1.html',
    })
    $stateProvider.state('contact', {
      url: '/contact',
      templateUrl: 'templates/contact.html',
      controller: 'contactCtrl'
    })

    $urlRouterProvider.otherwise('/home');

  })



.controller("ExampleController", function ($scope, $cordovaCamera, $cordovaFile, $timeout, $cordovaGeolocation, getData, $cordovaSocialSharing) {
 
      $scope.takePhoto = function () {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData, sourcePath) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            // var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
            // var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);

            // $cordovaFile.copyFile(sourceDirectory, sourceFileName, cordova.file.dataDirectory, sourceFileName).then(function(success) {
            //    $scope.fileName = cordova.file.dataDirectory + sourceFileName;
            // }, function(error) {
            //    console.dir(error);
            // });     
            var startimg= $scope.imgURI;
            $scope.image=startimg;

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

              if (d <= 0.5) {$scope.textOverlay = attractions[i].title + ', University Malaysia Sabah'; break;}
              else {$scope.textOverlay = 'University Malaysia Sabah, Malaysia'}
                console.log($scope.textOverlay);
            }
            console.log($scope.textOverlay);

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var source =  new Image();
              source.src = startimg;
              canvas.width = source.width;
              canvas.height = source.height;

              console.log(canvas);

              context.drawImage(source,0,0);

              context.font = "10px impact";
              textWidth = context.measureText($scope.frase).width;

              // if (textWidth > canvas.offsetWidth) {
              //     context.font = "20px impact";
              // }

              context.textAlign = 'center';
              context.fillStyle = 'white';

              context.fillText($scope.textOverlay,canvas.width/2,canvas.height*0.9);

              var imgURI = canvas.toDataURL();
            
              $timeout( function(){
                  $scope.image = imgURI;
              }, 200);

            $scope.createOverlay= function(){
             
              $cordovaSocialSharing.share(null, null, canvas.toDataURL());
              // //remove the extra image(tempCanvas)
              // var articleRow = document.querySelector('#tempCanvas');
              // articleRow.remove();
            }
              //console.log(attractions);
            });
        }, function (err) {
            // An error occured. Show a message to the user
        });
      }
      
      
            // var startimg="img/black.jpg";
            // $scope.image=startimg;
            // //var attractions = getData.refAttractions();

            // var options = {timeout: 10000, enableHighAccuracy: true};
            // var attractions = getData.refAttractions();
            // $scope.deg2rad = function (deg) {return deg * (Math.PI/180);}
            // $cordovaGeolocation.getCurrentPosition(options).then(function(position){
            //   var lat1  = position.coords.latitude;
            //   var lon1 = position.coords.longitude;

            //   var R = 6371; // Radius of the earth in km
            //   for (i = 0; i < attractions.length; i++){

            //         var dLat = $scope.deg2rad(attractions[i].latitude-lat1);  // deg2rad below
            //     var dLon = $scope.deg2rad(attractions[i].longitude-lon1); 
            //     var a = 
            //       Math.sin(dLat/2) * Math.sin(dLat/2) +
            //       Math.cos($scope.deg2rad(lat1)) * Math.cos($scope.deg2rad(attractions[i].latitude)) * 
            //       Math.sin(dLon/2) * Math.sin(dLon/2)
            //       ; 
            //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            //     var d = R * c;   
            //     console.log(d+'km'); 

            //     if (d <= 0.5) {$scope.textOverlay = attractions[i].title + ', University Malaysia Sabah'; break;}
            //     else {$scope.textOverlay = 'University Malaysia Sabah, Malaysia'}
            //       console.log($scope.textOverlay);
            //   }
            //   console.log($scope.textOverlay);
               
            //   // var geocoder = new google.maps.Geocoder();
            //   // var latlng = new google.maps.LatLng(lat, long);
            //   // var request = {
            //   //   latLng: latlng
            //   // };
            //   // geocoder.geocode(request, function(data, status) {
            //   //   if (status == google.maps.GeocoderStatus.OK) {
            //   //     if (data[0] != null) {
            //   //       console.log(data);
            //   //       $scope.textOverlay=data[1].formatted_address;
            //   //     } else {
            //   //       console.log("No address available");
            //   //     }
            //   //   }
            //   // })

            // });
            

            // var canvas = document.createElement('canvas');
            // var context = canvas.getContext('2d');

            // $scope.createOverlay= function(){

            //   var source =  new Image();
            //   source.src = startimg;
            //   canvas.width = source.width;
            //   canvas.height = source.height;

              

            //   context.drawImage(source,0,0);

            //   context.font = "10px impact";
            //   textWidth = context.measureText($scope.frase).width;
            //   console.log(textWidth);
            //   if (textWidth > canvas.offsetWidth) {
            //       context.font = "20px impact";
            //   }

            //   context.textAlign = 'center';
            //   context.fillStyle = 'white';

            //   context.fillText($scope.textOverlay,canvas.width/2,canvas.height*0.9);

            //   var imgURI = canvas.toDataURL();

            //   $timeout( function(){
            //       $scope.image = imgURI;
            //   }, 200);
            //   $cordovaSocialSharing.share(null, null, canvas.toDataURL());
            //   // //remove the extra image(tempCanvas)
            //   // var articleRow = document.querySelector('#tempCanvas');
            //   // articleRow.remove();
            // }
      
      
      
  });














































































// .controller('imageController', function($scope, $cordovaCamera, $cordovaFile) {
//     $scope.fileName = "";
//   $scope.addImage = function() {
//     var options = {
//       quality: 50,
//       destinationType: Camera.DestinationType.FILE_URI,
//       sourceType: Camera.PictureSourceType.CAMERA,
//       allowEdit: false,
//       encodingType: Camera.EncodingType.JPEG,
//       targetWidth: 300,
//       targetHeight: 300,
//       saveToPhotoAlbum: true,
//       correctOrientation: true
//     };

//    $cordovaCamera.getPicture(options).then(function(sourcePath) {
//       $scope.imgURI = "data:image/jpeg;base64," + sourcePath;
//       var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
//       var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);

//       console.log("Copying from : " + sourceDirectory + sourceFileName);
//       console.log("Copying to : " + cordova.file.dataDirectory + sourceFileName);
//       $cordovaFile.copyFile(sourceDirectory, sourceFileName, cordova.file.dataDirectory, sourceFileName).then(function(success) {
//          $scope.fileName = cordova.file.dataDirectory + sourceFileName;
//       }, function(error) {
//          console.dir(error);
//       });     

//         }, function(error) {
//           console.log(err);
//         });
//     }
//     //get the correct url for the image
//     // $scope.urlForImage = function(imageName) {
//     // var name = imageName.substr(imageName.lastIndexOf('/') + 1);
//     // var trueOrigin = cordova.file.dataDirectory + name;
//     // return trueOrigin;
// //}
// });