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
import { getAddr } from '../utils';
  
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
    getAddr,
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
