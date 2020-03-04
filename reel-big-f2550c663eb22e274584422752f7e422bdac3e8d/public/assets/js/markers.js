  $(document).ready(function(){

  var map, infoWindow;
      map = new google.maps.Map(document.getElementById("googleMap"), {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 12
      });
      infoWindow = new google.maps.InfoWindow;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
              map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
  
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      };
  
   // Handle Submit Function for creating Google Maps Markers on current location
      function fishDataSubmit(event) {  
        navigator.geolocation.getCurrentPosition(function (position) {
          // get CURRENT location
          var currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Get information for the form and add a popup tip window
          // Use jquery to grab the form element and get the data
          var fishType = $("#fishType").val();
          var baitType = $("#baitType").val();

          console.log("btn click");
          
  
        // icon link 
         var image = "http://maps.google.com/mapfiles/kml/shapes/fishing.png";

          // create a new google Maps marker
          var newMarker = new google.maps.Marker({
            position: currentPosition,
            map: map,
            icon: image,
          }).addListener('click', function () {
            map.setCenter(this.getPosition())
            infoWindow.setPosition(this.getPosition());
            infoWindow.setContent(`{USER_HERE} has caught: ${fishType} using bait: ${baitType}!`);
            infoWindow.open(map, this);

            
          })
          console.log(position);
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);

          pastCatch(fishType, baitType, position.coords.latitude, position.coords.longitude);
          console.log("testing");
          // add our new marker to the marker array

          //fishingMarkers.push(newMarker);
        })
  
      }
  

              //Store our markers
              // var fishingMarkers = [
              //   new google.maps.Marker({
              //     position: {
              //       lat: 33.856926,
              //       lng: -117.17437
              //     },
              //     map: map,
              //     icon: image,
              //   }).addListener('click', function () {
              //     map.setCenter(this.getPosition())
              //     infoWindow.setPosition(this.getPosition());
              //     infoWindow.setContent(`{USER_HERE} has caught: ${fishType} using bait: ${baitType}!`);
              //     infoWindow.open(map, this);
              //   }),
              //   new google.maps.Marker({
              //     position: {
              //       lat: 33.856926,
              //       lng: -117.15437
              //     },
              //     map: map,
              //     icon: image,
              //   }).addListener('click', function () {
              //     map.setCenter(this.getPosition())
              //     infoWindow.setPosition(this.getPosition());
              //     infoWindow.setContent(`{USER_HERE} has caught: ${fishType} using bait: ${baitType}!`);
              //     infoWindow.open(map, this);
              //   })
          
              // ]
               
              //     fishingMarkers.push(newMarker);
              //   })
                
          
             
  $("#fishLocationSubmitButton").on("submit", function(event){
    event.preventDefault();
    console.log("New catch testing");
    
    var catchData = {
      fish_type: fish,
      bait_type: bait,
      lat: latData,
      lng: lngData,
      rig_type: rig
    };

    //Send the POST for newCatch to db 
    $.ajax("/api/Catch_Histories", catchData, {
      type: "POST",
      data: catchData
    }).then({
      function() {
        console.log("Created New Catch!");
        location.reload();
      }
    
    })
    
  });      
                
  });