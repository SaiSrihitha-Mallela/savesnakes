function requestLocationPermission() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                sendLocationToServer(position.coords.latitude, position.coords.longitude);
                alert("Location access granted.\nLatitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude);
                hidePopup();
            },
            function (error) {
                alert("Location access denied. Please enable location services in your browser settings.");
                hidePopup();
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
        hidePopup();
    }
}

function sendLocationToServer(latitude, longitude) {
    console.log("sending");
    fetch('http://localhost:5500/sendLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

}


function showPopup() {
    document.getElementById('locationPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hidePopup() {
    document.getElementById('locationPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

window.onload = function () {
    showPopup();
};