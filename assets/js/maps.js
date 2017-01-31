var map;

var spotteds = [
		{"anonimity": true, "userId": "1b3ad16bbe0742ce81d13adbb6d6645a", "longitude": -73.5731313, "latitude": 45.4969539, "spottedId": "edb6413f-a5f1-4615-a82d-20fe4ddbfc37", "message": "Hey Hey"},
		{"anonimity": true, "userId": "1b3ad16bbe0742ce81d13adbb6d6645b", "longitude": -73.5725573, "latitude": 45.4951791, "spottedId": "edb6413f-a5f1-4615-a82d-20fe4ddbfc30", "message": "Hey Hey"}
	];

    
var locations = [
	{lat: -31.563910, lng: 147.154312},
	{lat: -33.718234, lng: 150.363181},
	{lat: -33.727111, lng: 150.371124},
	{lat: -33.848588, lng: 151.209834},
	{lat: -33.851702, lng: 151.216968},
	{lat: -34.671264, lng: 150.863657},
	{lat: -35.304724, lng: 148.662905},
	{lat: -36.817685, lng: 175.699196},
	{lat: -36.828611, lng: 175.790222},
	{lat: -37.750000, lng: 145.116667},
	{lat: -37.759859, lng: 145.128708},
	{lat: -37.765015, lng: 145.133858},
	{lat: -37.770104, lng: 145.143299},
	{lat: -37.773700, lng: 145.145187},
	{lat: -37.774785, lng: 145.137978},
	{lat: -37.819616, lng: 144.968119},
	{lat: -38.330766, lng: 144.695692},
	{lat: -39.927193, lng: 175.053218},
	{lat: -41.330162, lng: 174.865694},
	{lat: -42.734358, lng: 147.439506},
	{lat: -42.734358, lng: 147.501315},
	{lat: -42.735258, lng: 147.438000},
	{lat: -43.999792, lng: 170.463352}
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

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
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