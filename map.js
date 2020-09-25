// IMPORTANT: Replace the apikey with your own from https://developer.here.com
let apiKey = 'gu2xI9YN1IE6pyN2NXUWHy-cilUtvePc9tKShlNwCY0';

// Step 1: initialize the HERE map platform
let platform = new H.service.Platform({
  apikey: apiKey
});

// Step 2: create default layers
let defaultLayers = platform.createDefaultLayers();

// Step 3: Initialize the map in the "map" div
// This map is centered on New York, using the default map style
let map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: { lat: 40.71, lng: -74.01 },
  zoom: 15,
  pixelRatio: window.devicePixelRatio || 1
});

// Step 4: Add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Step 5: Enable the event system and add default interactions (e.g., drag, zoom)
let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 6: Create the default UI components (e.g., zoom buttons)
let ui = H.ui.UI.createDefault(map, defaultLayers);

setupClickListener(map);

function setupClickListener(map) {

  map.addEventListener('tap', function (evt) {
    let coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    checkWater(coord.lat, coord.lng);
  });
}