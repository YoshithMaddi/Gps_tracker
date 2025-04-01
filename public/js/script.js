const socket =io();
const markers={};
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        function (position) {
            const { latitude, longitude } = position.coords;
            socket.emit("user-location", { latitude, longitude });
        },
        (err) => {
            console.log(err);
        },
        {
            maximumAge: 0,
            enableHighAccuracy: true,
            timeout: 5000,
        }
    );
}

var map = L.map("map").setView([0, 0], 20);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "locs©" }).addTo(map);


socket.on("r-location", function (data) {
    const { id, latitude, longitude } = data;
         map.setView([latitude,longitude]);

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

console.log(markers);