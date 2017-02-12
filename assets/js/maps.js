var map;

var spotteds = [
		{"anonimity": true, "userId": "1b3ad16bbe0742ce81d13adbb6d6645a", "longitude": -73.5731313, "latitude": 45.4969539, "spottedId": "edb6413f-a5f1-4615-a82d-20fe4ddbfc37", "message": "Hey Hey"},
		{"anonimity": true, "userId": "1b3ad16bbe0742ce81d13adbb6d6645b", "longitude": -73.5725573, "latitude": 45.4951791, "spottedId": "edb6413f-a5f1-4615-a82d-20fe4ddbfc30", "message": "Hey Hey"}
	];


function initMap() {
	// Create a map object and specify the DOM element for display.
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 45.5088400, lng: -73.5878100},
		scrollwheel: true,
		zoom: 12
	});

	initSearchBox();
	initSpotted();
}

function initSearchBox(){
	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
	searchBox.setBounds(map.getBounds());
	});

	var markers = [];
	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
		  return;
		}

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
		  var icon = {
		    url: place.icon,
		    size: new google.maps.Size(71, 71),
		    origin: new google.maps.Point(0, 0),
		    anchor: new google.maps.Point(17, 34),
		    scaledSize: new google.maps.Size(25, 25)
		  };

		  if (place.geometry.viewport) {
		    // Only geocodes have viewport.
		    bounds.union(place.geometry.viewport);
		  } else {
		    bounds.extend(place.geometry.location);
		  }
		});
		map.fitBounds(bounds);
		map.setZoom(15);
	});
}

function initSpotted() {

	// When the map has finish to load
	map.addListener('idle', function() {
		var bounds = map.getBounds();
		var southLat = bounds.getSouthWest().lat();
	   	var southLng = bounds.getSouthWest().lng();
	   	var northLat = bounds.getNorthEast().lat();
	   	var northLng = bounds.getNorthEast().lng();
		$.ajax({
			url: 'https://nbyapi.mo-bergeron.com/v1/spotteds',
			type: 'GET',
			dataType: 'json',
			headers: { "Authorization": "Basic " + btoa("guest" + ":" + "sjSHJLfHwUEbQB4gtHnzdJh1WfwRaVwWQZtilJvB1pZG8u1gFUFtgmGEUti2kLjONmf5fJqdpzvd26fLvdb0mNdtKib8SXpgCXjmYKblMUQAPDJzjgBLlUNAp7w2hmVOaUEquC037s3ZpEWxcLtIK1zdTdX9QY28fKNfClz1f0j9Vo8vMbvD562jiF8zgZ1i8hiI10AqI3vIxbSDN9RCjMEVU0La8cnDLmFXyAhWCOVbjTdujAcVJ1QFEcYkJGot4Kkugx0cKD2WB8zxkZtnRj4kYxWHGB8eb5E0dgTrC3w7") },
			data: {
				minLat : southLat,
				maxLat : northLat,
				minLong: southLng,
				maxLong: northLng,
				locationOnly: true
			},
			success: function(response) {
				spotteds = response;
			},
			error: function(xhr) {
				console.log(xhr);

			}
		});
  	});

    // Iterate over each spotteds
    var markers = spotteds.map(function(spotteds, i) {
    	var latLng = new google.maps.LatLng(spotteds["latitude"],spotteds["longitude"]);
    	var infowindow = new google.maps.InfoWindow({
    		content: spotteds["message"]
  		});
    	var marker = new google.maps.Marker({
        	position: latLng
        	// label: labels[i % labels.length]
      	});

      	marker.addListener('click', function() {
    		infowindow.open(map, marker);
  		});

  		return marker;
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});	
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}

function askPosition(){
	 // Try HTML5 geolocation.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setZoom(13);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
}

