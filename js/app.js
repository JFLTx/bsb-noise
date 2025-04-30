document.addEventListener("DOMContentLoaded", function () {
  // Step 1: Initialize the Leaflet map
  const map = L.map("map").setView([38.257, -85.759], 13); // Set your center coordinates and zoom level

  // Step 2: Add a basemap (you need something like OpenStreetMap as a base)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data © OpenStreetMap contributors",
    maxZoom: 19,
  }).addTo(map);

  // Step 3: Fetch and add your COG raster
  fetch("images/BSB-COG.tif")
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      parseGeoraster(arrayBuffer).then((georaster) => {
        const layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 1,
          resolution: 256, // lower = higher detail
        });
        layer.addTo(map);
        map.fitBounds(layer.getBounds());
      });
    })
    .catch((error) => {
      console.error("Error loading GeoTIFF:", error);
    });
});
