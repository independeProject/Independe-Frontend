export function getAddr() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log('getAddr')

      let geocoder = new window.kakao.maps.services.Geocoder();
      let coord = new window.kakao.maps.LatLng(lat, lng);
      let callback = (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(result[0]);
          this.$store.state.currentLocation = result[0].address.region_1depth_name
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}