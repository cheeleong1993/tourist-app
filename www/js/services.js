angular.module('ums.services', []) 

.factory('getData', function($firebase) {

    var ref = new Firebase("https://ums-eco-campus-a-1486986690367.firebaseio.com/"),

        refAttractions = $firebase(ref.child('attractions')).$asArray();
        refATM = $firebase(ref.child('facility-atms')).$asArray();
        refBus = $firebase(ref.child('facility-bus')).$asArray();
        refCafe = $firebase(ref.child('facility-cafes')).$asArray();
        refAdvertisements = $firebase(ref.child('advertisements')).$asArray();
console.log(refAttractions);
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
        refAdvertisements: function() {
            return refAdvertisements;
        },
        get: function (attraction_id) {

            return refAttractions.$getRecord(attraction_id);
        }
    }
});

