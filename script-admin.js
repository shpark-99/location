window.onload = function () {
    const mapContainer = document.getElementById("map");
    const map = new kakao.maps.Map(mapContainer, { level: 3 });
    const geocoder = new kakao.maps.services.Geocoder();

    document.getElementById("locationInput").addEventListener("change", function () {
        const address = this.value;
        geocoder.addressSearch(address, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                localStorage.setItem("adminLocation", JSON.stringify({ lat: result[0].y, lng: result[0].x }));
                new kakao.maps.Marker({ position: coords, map: map });
                map.setCenter(coords);
            } else {
                alert("위치를 찾을 수 없습니다.");
            }
        });
    });
};
