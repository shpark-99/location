window.onload = function () {
    const adminLocation = JSON.parse(localStorage.getItem("adminLocation"));
    if (!adminLocation) {
        alert("관리자가 위치를 설정하지 않았습니다.");
        return;
    }
    document.getElementById("adminAddress").innerText = `(${adminLocation.lat}, ${adminLocation.lng})`;

    const mapContainer = document.getElementById("map");
    const map = new kakao.maps.Map(mapContainer, { level: 3 });
    const adminMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(adminLocation.lat, adminLocation.lng),
        map: map,
        title: "관리자 위치"
    });
    map.setCenter(new kakao.maps.LatLng(adminLocation.lat, adminLocation.lng));

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const userLat = pos.coords.latitude, userLng = pos.coords.longitude;
            document.getElementById("userAddress").innerText = `(${userLat}, ${userLng})`;
            const userMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(userLat, userLng),
                map: map,
                title: "내 위치"
            });

            function getDistance(lat1, lng1, lat2, lng2) {
                const R = 6371, dLat = (lat2 - lat1) * (Math.PI / 180), dLng = (lng2 - lng1) * (Math.PI / 180);
                const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLng/2) ** 2;
                return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 1000;
            }

            const distance = getDistance(adminLocation.lat, adminLocation.lng, userLat, userLng);
            const resultDiv = document.getElementById("result");
            const surveyBtn = document.getElementById("surveyBtn");
            if (distance <= 300) {
                resultDiv.innerHTML = '<p class="success-text">✅ 인증 성공! (거리: ' + distance.toFixed(2) + 'm)</p>';
                surveyBtn.style.display = "block";
            } else {
                resultDiv.innerHTML = '<p class="error-text">❌ 반경 밖입니다. (거리: ' + distance.toFixed(2) + 'm)</p>';
                surveyBtn.style.display = "none";
            }
        },
        () => {
            alert("위치 정보를 가져올 수 없습니다. 위치 권한을 허용해주세요.");
        }
    );
};
