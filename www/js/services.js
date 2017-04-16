angular.module('ums.services', []) 
 
.factory('getData', function($firebase) { 

    var ref = new Firebase("https://ums-eco-campus-a-1486986690367.firebaseio.com/"),

        refAttractions = $firebase(ref.child('attractions')).$asArray();
        refATM = $firebase(ref.child('facility-atms')).$asArray();
        refBus = $firebase(ref.child('facility-bus')).$asArray();
        refCafe = $firebase(ref.child('facility-cafes')).$asArray();
        refWashroom = $firebase(ref.child('facility-washrooms')).$asArray();
        refAdvertisements = $firebase(ref.child('advertisements')).$asArray();
        refGallery = $firebase(ref.child('gallery')).$asArray();

    return {    
        ref: function() {
            return ref;
        },
        refAttractions: function() {
            return refAttractions;
        },
        refATM: function() {
            return refATM;
        },
        refBus: function() {
            return refBus;
        },
        refCafe: function() {
            return refCafe;
        },
        refWashroom: function() {
            return refWashroom;
        },
        refAdvertisements: function() {
            return refAdvertisements;
        },
        refGallery: function() {
            return refGallery;
        },
        get: function (attraction_id) {

            return refAttractions.$getRecord(attraction_id);
        }
    }
})

.factory('mapService', function($cordovaGeolocation, $cordovaLaunchNavigator, $compile) { 

    var map_service = function(attractions, marker) {
console.log(marker);
        var options = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
       
            var latLng = new google.maps.LatLng(6.032509, 116.121645);
            var user_position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
            var mapOptions = {
              center: latLng,
              zoom: 14,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
       
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            //create current location marker
            var user_marker = new google.maps.Marker({
                map: map,
                icon: 'img/user_marker1.png',
                animation: google.maps.Animation.DROP,
                position: user_position
              });      
           
            var myInfoWindow = new google.maps.InfoWindow({
                content: "Here You Are!"
              });

            google.maps.event.addListener(user_marker, 'click', function () {
                myInfoWindow.open(map, user_marker);  
              });

            var markers = [];

            var infoWindow = new google.maps.InfoWindow();

            var createMarker = function (info){
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(info.latitude, info.longitude),
                  map: map,
                  icon: marker,
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

              markers.push(marker);
            }        

            for (i = 0; i < attractions.length; i++){
                createMarker(attractions[i]);          
            }


          }, function(error){
            console.log("Could not get location");
          });

        }
        return {
        map_service: map_service
      };

});