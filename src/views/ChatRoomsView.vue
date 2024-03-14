<template>
  <div class="chat">
    <div class="container-1">
      <h2>채팅 목록</h2>
      <ul>
        <li
          v-for="room in chatRooms"
          :key="room.chatRoomId"
        >
          <router-link
            :to="'/chat/' + room.opponentId"
            class="chat-link"
          >
            <span>{{ room.opponentNickname }}</span>
            <span v-show="room.unReadCount > 0">{{ room.unReadCount }}</span>
          </router-link>
          <!-- <br/><span class="temp-lastmessage"> {{room.lastMessage}} </span> -->
        </li>
      </ul>
    </div>
    <div class="container-2" />
  </div>
</template>
  
  <script>
import { mapGetters } from 'vuex';
  
export default {
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],
      chatRooms: [],

      showLocationAuthentication: false,
      userNickName: '',
      boolAuthentication: false,
      searchCondition: 0,
      searchKeyword: '',

      searchText: '', // 검색어를 저장하는 데이터 속성
      error: false, // 로딩 상태를 나타내는 데이터 속성
    };
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  mounted() {
    this.fetchChatRooms();

    if (this.$store.state.locationAuthentication === true) {
      this.getAddr();
      this.boolAuthentication = true      
    } else {
      this.boolAuthentication = false
    }

    if (this.getToken) {
      this.loginToken()
    }  
  },
  methods: {
    fetchChatRooms() {
      this.$axios.get('/api/chat/rooms', {
        headers: {
          Authorization: this.getToken,
        },
      })
        .then(response => {
          this.chatRooms = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleLocationAuthentication() {
      this.$store.commit('toggleLocationAuthentication');

      if (this.$store.state.locationAuthentication === true) {
        this.$axios.post("/api/members/region", { region: this.$store.state.currentLocation }, {
          headers: {
            Authorization: this.$store.state.token, // 헤더에 토큰 추가
          },
        });
      }        
    },
    totalSearch() {
      if (this.searchText !== '') {
        const query = this.searchText ? `?searchText=${encodeURIComponent(this.searchText)}` : '';
        window.location.href = '/search' + query;
      }
    },
    handleLogout() {
      this.$store.dispatch('logout');
    },
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4e77d9b3460eb3b942634fb28e5e1c40&libraries=services";
      document.head.appendChild(script);
    },
    getAddr() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          let geocoder = new kakao.maps.services.Geocoder();
          let coord = new kakao.maps.LatLng(lat, lng);
          let callback = (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              console.log(result[0].road_address.region_1depth_name);
              this.$store.state.currentLocation = result[0].road_address.region_1depth_name
            }
          };
          geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    loginToken() {
      const token = this.getToken; // Vuex 스토어에서 토큰 값을 가져옴

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const claims = JSON.parse(decodedPayload);
      this.userNickName = claims.nickname;
    }
  },
};
  </script>
  
  <style scoped>
    .chat {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    .container-1 {
      flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
      background-color: #f1f1f1;
      min-width: 350px;
      padding: 15px;
    }
  
    .container-2 {
      flex: 4; /* 남은 공간을 모두 차지하도록 설정 */
      height: 100%;
    }

    ul, ol {
    list-style-type: none;
    }

    ul > li {
      padding: 10px;
    }

    .chat-link {
      /* display: inline-block; */
      color: #4A8522;
      font-weight: bold;
      text-decoration: none;
      font-size: 24px;
      line-height: 20px;
      padding: 10px;

      display: flex;
      justify-content: space-between;
    }
    .chat-link:hover {
      width: 100%;
      color: white;
      border-radius: 50px;
      background-color: #4A8522;
    }
    .temp-lastmessage {
      padding-right: 2px;
      font-size: 25px;
    }
  </style>
  