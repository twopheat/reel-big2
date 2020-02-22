$(document).ready(function () {
  console.log("ready");

  // Event listeners
  $(document).on("click", "#fishLocationSubmitButton", fishDataSubmit);
  $(document).on("submit", "#rigSubmitBtn", rigDataSubmit);

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
  
  function fishDataSubmit(event) {
    event.stopPropagation();

    navigator.geolocation.getCurrentPosition(function (position) {
      // get CURRENT location
      var currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(currentPosition);
      // Get information for the form and add a popup tip window
      // Use jquery to grab the form element and get the data
      //var fishType = "PLACEHOLDER";
      var fishType = $("#fish_type").val().trim();
      var rig_type = $("#rig_type").val().trim();

      console.log(fishType);


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
        infoWindow.setContent(`{USER_HERE} has caught: ${fishType}!`);
        infoWindow.open(map, this);


      });

      /// Need help with POST problem is probably in the api-routes //////////
      var catchData = {
        fish_type: fishType,
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
        rig_type: rig_type
      };
      
      console.log(catchData);
      //Send the POST for newCatch to db 
      $.post("/api/CatchHistory", catchData)
      .then(function(data) {
          console.log(data);
          location.reload();
        });
      });
    }

  // GET catches from database when page loads
  // getCatches();

  // // This function grabs the catches from the db and updates the view
  // function getCatches(){
  //   $.get("/api/CatchHistory", function(data){
  //     console.log(data);

  //     // for each catch that our server sends us back
  //   for (var i = 0; i < data.length; i++) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       // get CURRENT location
  //       var currentPosition = {
  //         lat: data[i].lat,
  //         lng: data[i].lng
  //       };
  
  //       var fishType = data[i].fish_type;
  
  //       console.log(fishType);
  
  //         // icon link 
  //       var image = "http://maps.google.com/mapfiles/kml/shapes/fishing.png";
  
  //       // create a new google Maps marker
  //       var newMarker = new google.maps.Marker({
  //         position: currentPosition,
  //         map: map,
  //         icon: image,
  //       }).addListener('click', function () {
  //         map.setCenter(this.getPosition())
  //         infoWindow.setPosition(this.getPosition());
  //         infoWindow.setContent(`{USER_HERE} has caught: ${fishType}!`);
  //         infoWindow.open(map, this);
  
  
  //       });
  //       var fishCatchDiv = $("<div>").addClass("catchList").attr("id", "fish-catchList-" + i);
  //       $("#fishCatch").append(fishCatchDiv).append(data[i].fish_type);

  //       // var rigCatchDiv = $(<"div">).addClass("catchList").attr("id", "rig-catchList-" + i);
  //       // $("#rigCatch").append(rigCatchDiv).append(data[i].rig);

  //       var timeCatchDiv = $("<div>").addClass("catchList").attr("id", "time-catchList-" + i);
  //       $("#timeCatch").append(timeCatchDiv).append(data[i].beginTime);

  //     })
  //   }
  //   })
  // }

  function rigDataSubmit(event){
    event.preventDefault();

    //Make a new rig
    var newRig = {
      rig_name: $("#rig_name").val().trim(),
      rod: $("#rod").val().trim(),
      reel: $("#reel").val().trim(),
      tackle: $("#tackle").val().trim(),
      info: $("#info").val().trim()
    };

    $.post("/api/Rig", newRig)
    .then(function(data){
      console.log("Rig data: "+ data);
      location.reload();
    });

    //empty each input box by replacing the value with an empty string
    $("#rig_name").val("");
    $("#rod").val("");
    $("#reel").val("");
    $("#tackle").val("");
    $("#info").val("");
  }

})