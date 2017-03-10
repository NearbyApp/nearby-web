var map, gm, spotteds, markerCluster, iw, oms;

var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "poi.place_of_worship",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];

var mcOptions = {gridSize: 50, maxZoom: 21, styles: [
  {
    textColor: 'white',
    textSize: 14,
    fontFamily:"Roboto",
    height: 50,
    url: "images/m1.svg",
    width: 50
  },
  {
    textColor: 'white',
    textSize: 14,
    fontFamily:"Roboto",
    height: 50,
    url: "images/m2.svg",
    width: 50
  },
  {
    textColor: 'white',
    textSize: 14,
    fontFamily:"Roboto",
    height: 50,
    url: "images/m3.svg",
    width: 50
  },
  {
    textColor: 'white',
    textSize: 14,
    fontFamily:"Roboto",
    height: 50,
    url: "images/m4.svg",
    width: 50
  }]
};


window.onload = function() {
  gm = google.maps;
  map = new gm.Map(document.getElementById('map'), {
    center: {lat: 45.5088400, lng: -73.5878100},
    scrollwheel: true,
    zoom: 12
  });
  map.setOptions({styles: styles});

  iw = new gm.InfoWindow();
  oms = new OverlappingMarkerSpiderfier(map);

  spotteds = [];
	markerCluster = new MarkerClusterer(map, [], mcOptions);

	initSearchBox();
	map.addListener('idle', function() {
		fetchSpotteds();
  });
}

function initSearchBox(){
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	map.addListener('bounds_changed', function() {
	searchBox.setBounds(map.getBounds());
	});

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

function fetchSpotteds() {
	var bounds = map.getBounds();
	var southLat = bounds.getSouthWest().lat();
   	var southLng = bounds.getSouthWest().lng();
   	var northLat = bounds.getNorthEast().lat();
   	var northLng = bounds.getNorthEast().lng();
	$.ajax({
		url: 'https://nbyapi.mo-bergeron.com/v1/spotteds',
		type: 'GET',
		dataType: 'json',
		headers: { "Authorization": "Basic " + btoa("guest:sjSHJLfHwUEbQB4gtHnzdJh1WfwRaVwWQZtilJvB1pZG8u1gFUFtgmGEUti2kLjONmf5fJqdpzvd26fLvdb0mNdtKib8SXpgCXjmYKblMUQAPDJzjgBLlUNAp7w2hmVOaUEquC037s3ZpEWxcLtIK1zdTdX9QY28fKNfClz1f0j9Vo8vMbvD562jiF8zgZ1i8hiI10AqI3vIxbSDN9RCjMEVU0La8cnDLmFXyAhWCOVbjTdujAcVJ1QFEcYkJGot4Kkugx0cKD2WB8zxkZtnRj4kYxWHGB8eb5E0dgTrC3w7"),
					"Service-Provider": "Guest"
				},
		data: {
			minLat : southLat,
			maxLat : northLat,
			minLong: northLng,
			maxLong: southLng,
			locationOnly: true
		},
		success: function(response) {
			var newSpotteds = getNewSpotteds(response);
			setMarkers(newSpotteds);
		},
		error: function(xhr) {
			console.log("can't fetch Spotteds");
		}
	});
}

function fetchSpotted(id, callback) {
	$.ajax({
		url: 'https://nbyapi.mo-bergeron.com/v1/spotted/'+id,
		type: 'GET',
		dataType: 'json',
		headers: { "Authorization": "Basic " + btoa("guest:sjSHJLfHwUEbQB4gtHnzdJh1WfwRaVwWQZtilJvB1pZG8u1gFUFtgmGEUti2kLjONmf5fJqdpzvd26fLvdb0mNdtKib8SXpgCXjmYKblMUQAPDJzjgBLlUNAp7w2hmVOaUEquC037s3ZpEWxcLtIK1zdTdX9QY28fKNfClz1f0j9Vo8vMbvD562jiF8zgZ1i8hiI10AqI3vIxbSDN9RCjMEVU0La8cnDLmFXyAhWCOVbjTdujAcVJ1QFEcYkJGot4Kkugx0cKD2WB8zxkZtnRj4kYxWHGB8eb5E0dgTrC3w7"),
					"Service-Provider": "Guest"
				},
		success: function(response) {
			callback(response);
		},
		error: function(xhr) {
			console.log("Can't fetch a Spotted");
		}
	});
}

function setMarkers(spotteds) {
  oms.addListener('click', function(marker) {
     iw.setContent(marker.desc);
     iw.open(map, marker);
   });
   oms.addListener('spiderfy', function(markers) {
     iw.close();
   });

	var markers = spotteds.map(function(spotted, i) {

      var loc = new gm.LatLng(spotted.location.coordinates[1], spotted.location.coordinates[0]);
      var marker = new gm.Marker({
        position: loc,
        icon: 'images/marker.svg',
        map: map
      });

      fetchSpotted(spotted._id, function(output) {
        var windowContent = "";
        var spotDate = new Date(output.creationDate);
        if(!output.anonymity) {
					windowContent += "<div style=\"text-align: center; \"><div style=\"display: inline;\"><img style=\"max-width: 100%; height: 20px; \" src=\""+ output.profilePictureURL + "\"></div><div style=\"display: inline;\"><b>" + output.fullName + "</b></div></div>";
				}
				else {
					windowContent += "<div style=\"text-align: center; \"><div style=\"display: inline;\"><img style=\"max-width: 100%; height: 20px; \" src=\"images/user.png\"></div><div style=\"display: inline;\"><b>Anonymous</b></div></div>";
				}
				if(output.pictureURL != null) {
					windowContent += prettyDate(output.creationDate) + "</br></br><h3>" + output.message + "</h3></br><img style=\"max-width: 100%; height: 300px;\" src=\""+ output.pictureURL + "\">"
				}
				else {
					windowContent += prettyDate(output.creationDate) + "</br></br><h3>" + output.message + "</h3></br><span></span>"
				}

        marker.desc = windowContent;
      });

      oms.addMarker(marker);
		  return marker;
    });

    markerCluster.addMarkers(markers);
}

function getNewSpotteds(response) {
	var newSpotteds = [];
	if(spotteds.length > 0) {
		for(var i = 0; i < response.length; i++) {
			if(!containsObject(response[i], spotteds)) {
				newSpotteds.push(response[i]);
				spotteds.push(response[i]);
			}
		}
	}
	else {
		for(var i = 0; i < response.length; i++) {
			newSpotteds.push(response[i]);
			spotteds.push(response[i]);
		}
	}

	return newSpotteds;
}

function containsObject(obj, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i]._id == obj._id) {
			return true;
		}
	}
	return false;
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
