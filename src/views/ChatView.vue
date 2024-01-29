<template>
  <v-app-bar
    height="80"
    :elevation="1"
  >
    <v-container>
      <v-row align="center">
        <v-col cols="2">
          <router-link to="/">
            <v-img
              src="../img/logo.png"
              :style="{ 'max-height': '100px' }"
            />
          </router-link>
        </v-col>
        <v-col cols="5">
          <v-tabs
            v-model="active_tab"
            color="#5E913B"
          >
            <router-link
              to="/"
              style="text-decoration: none; color:black;"
            >
              <v-tab>
                <p class="font-weight-bold text-h6 mx-4">
                  {{ link[0] }}
                </p>
              </v-tab>
            </router-link>
            <router-link
              to="/board/ALL/FREE"
              style="text-decoration: none; color:black;"
            >
              <v-menu open-on-hover>
                <template #activator="{ props }">
                  <v-tab v-bind="props">
                    <p class="font-weight-bold text-h6 mx-4">
                      {{ link[1] }}
                    </p>
                  </v-tab>
                </template>
                <v-list>
                  <v-list-item align="center">
                    <router-link
                      to="/board/ALL/FREE"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        자유
                      </v-list-item-title>
                    </router-link>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-25 mb-2"
                    />
                    <router-link
                      to="/board/SEOUL/TALK"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        서울
                      </v-list-item-title>
                    </router-link>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-25 mb-2"
                    />
                    <router-link
                      to="/board/PUSAN/TALK"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        부산
                      </v-list-item-title>
                    </router-link>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-25 mb-2"
                    />
                    <router-link
                      to="/board/ULSAN/TALK"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        울산
                      </v-list-item-title>
                    </router-link>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-25 mb-2"
                    />
                    <router-link
                      to="/board/KEYNONGNAM/TALK"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        경남
                      </v-list-item-title>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </router-link>
            <router-link
              to="/independent/CLEAN"
              style="text-decoration: none; color:black;"
            >
              <v-menu open-on-hover>
                <template #activator="{ props }">
                  <v-tab v-bind="props">
                    <p class="font-weight-bold text-h6 mx-4">
                      {{ link[2] }}
                    </p>
                  </v-tab>
                </template>
                <v-list>
                  <v-list-item align="center">
                    <router-link
                      to="/independent/CLEAN"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        청소
                      </v-list-item-title>
                    </router-link>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-25 mb-2"
                    />
                    <router-link
                      to="/independent/WASH"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        세탁
                      </v-list-item-title>
                    </router-link>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-25 mb-2"
                    />
                    <router-link
                      to="/independent/COOK"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        요리
                      </v-list-item-title>
                    </router-link>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-25 mb-2"
                    />
                    <router-link
                      to="/independent/HEALTH"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        건강
                      </v-list-item-title>
                    </router-link>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-25 mb-2"
                    />
                    <router-link
                      to="/independent/ETC"
                      style="text-decoration: none; color:black;"
                    >
                      <v-list-item-title
                        class="my-2"
                      >
                        기타
                      </v-list-item-title>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </router-link>
          </v-tabs>
        </v-col>
        <v-col cols="3">
          <v-card-text>
            <v-text-field
              v-model="searchText"
              :loading="error"
              density="compact"
              variant="outlined"
              label="통합검색"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              @click:append-inner="totalSearch"
              @keydown.enter="totalSearch"
            />
          </v-card-text>
        </v-col>
        <v-col
          v-if="!getToken"
          cols="1"
        >
          <router-link to="/login">
            <v-btn
              variant="flat"
              color="#5E913B"
              class="font-weight-bold"
              style="width:100%; height:40px"
            >
              <div class="text-white">
                로그인
              </div>
            </v-btn>
          </router-link>
        </v-col>
        <v-col
          v-if="!getToken"
          cols="1"
        >
          <router-link to="/signup">
            <v-btn
              variant="flat"
              color="#5E913B"
              class="font-weight-bold"
              style="width:100%; height:40px"
            >
              <div class="text-white">
                회원가입
              </div>
            </v-btn>
          </router-link>
        </v-col>
        <v-col
          v-if="getToken"
          cols="2"
        >
          <v-menu :close-on-content-click="false">
            <template #activator="{ props }">
              <v-row
                align="center"
                justify="end"
              >
                <v-btn
                  v-bind="props"
                  class="font-weight-bold mr-3"
                  variant="tonal"
                  color="green-lighten-1"
                >
                  <v-img
                    :height="25"
                    :width="25"
                    src="../img/user.png"
                    style="color:#2E471D"
                  />
                  <span
                    style="color: #5E913B;"
                    class="font-weight-bold"
                  >{{ userNickName }}</span>
                </v-btn>
              </v-row>
            </template>
            <v-card
              :height="showLocationAuthentication ? 400 : 275"
              :width="250"
            >
              <v-list>
                <v-list-item style="text-align: center;">
                  <v-row
                    class="mt-1"
                    style="cursor: pointer;"
                  >
                    <v-col cols="1" />
                    <v-col cols="auto">
                      <v-img
                        :height="25"
                        :width="25"
                        src="../img/infomation.png"
                        class=""
                      />
                    </v-col>
                    <v-col cols="2" />
                    <v-col cols="auto">
                      <v-list-item-title
                        style="font-size:18px"
                        class="font-weight-bold"
                      >
                        내 정보
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                  <v-divider
                    :thickness="1"
                    class="border-opacity-25 my-5"
                  />
                  <v-row style="cursor: pointer;">
                    <v-col cols="1" />
                    <v-col cols="auto">
                      <v-img
                        :height="25"
                        :width="25"
                        src="../img/chatting.png"
                        class=""
                      />
                    </v-col>
                    <v-col cols="2" />
                    <v-col cols="auto">
                      <router-link
                        :to="`/chatRooms`"
                        style="text-decoration: none; color:black;"
                      >
                        <v-list-item-title
                          style="font-size:18px"
                          class="font-weight-bold"
                        >
                          채팅
                        </v-list-item-title>
                      </router-link>
                    </v-col>
                  </v-row>
                  <v-divider
                    :thickness="1"
                    class="border-opacity-25 my-5"
                  />
                  <v-row
                    style="cursor: pointer;"
                    class="mb-3"
                    @click="showLocationAuthentication = !showLocationAuthentication"
                  >
                    <v-col cols="1" />
                    <v-col cols="auto">
                      <v-img
                        :height="25"
                        :width="25"
                        src="../img/location.png"
                        class=""
                      />
                    </v-col>
                    <v-col cols="2" />
                    <v-col cols="auto">
                      <v-list-item-title
                        style="font-size:18px"
                        class="font-weight-bold"
                      >
                        위치인증
                      </v-list-item-title>
                    </v-col>
                  </v-row>
  
                  <v-row v-if="showLocationAuthentication">
                    <v-col cols="12">
                      <v-sheet>
                        <div
                          style="text-align:center; color: gray; font-size:14px"
                          class="font-weight-bold mb-1"
                        >
                          현재위치불러오기
                        </div>
                        <v-row>
                          <v-col cols="auto">
                            <v-switch
                              v-model="boolAuthentication"
                              class="ml-3"
                              color="success"
                              @change="toggleLocationAuthentication"
                            />
                          </v-col>
                          <v-col
                            cols="auto"
                            align="end"
                            justify="end"
                          >
                            <div v-if="$store.state.locationAuthentication">
                              <div class="mt-4 font-weight-bold">
                                현재위치 : <span style="color: #5E913B">{{
                                  $store.state.currentLocation }}</span>
                              </div>
                            </div>
                            <div v-else>
                              <div class="mt-4 font-weight-bold">
                                현재위치 : <span style="color: #5E913B">인증필요</span>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-sheet>
                    </v-col>
                  </v-row>
  
                  <v-divider
                    :thickness="1"
                    class="border-opacity-25 mb-5"
                  />
                  <v-row style="cursor: pointer;">
                    <v-col cols="1" />
                    <v-col cols="auto">
                      <v-img
                        :height="25"
                        :width="25"
                        src="../img/logout.png"
                        class=""
                      />
                    </v-col>
                    <v-col cols="2" />
                    <v-col cols="auto">
                      <v-list-item-title
                        style="font-size:18px"
                        class="font-weight-bold"
                        @click="handleLogout"
                      >
                        로그아웃
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  
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
            <span>{{ room.opponentNickname }} </span>
            <span v-show="room.unReadCount > 0">{{ room.unReadCount }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="container-2">
      <div
        v-if="opponentId"
        class="chat-container"
      >
        <div class="chat-history">
          <ul>
            <li
              v-for="(chat, index) in chatHistory"
              :key="index"
            >
              <div class="my-wrapper">
                <div :class="{'my-message': chat.senderNickname === userNickName, 'your-message': chat.senderNickname !== userNickName}">
                  <div
                    v-if="chat.senderNickname !== userNickName"
                    class="msg-your"
                  >
                    <span class="opponent-nickname">{{ chat.receiverNickname }}</span>
                    <div class="msg-box">
                      <span class="msg2">{{ chat.message }}</span>
                      <div class="msg-info">
                        <span
                          v-show="!chat.isRead"
                          class="message-is-read"
                        >1</span>
                        <span class="message-createdDate">{{ $filter.formateYYYYMMDDHHmm(chat.createdDate) }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="msg-my"
                  >
                    <div class="msg-info">
                      <span
                        v-show="!chat.isRead"
                        class="message-is-read"
                      >1</span>
                      <span class="message-createdDate">{{ $filter.formateYYYYMMDDHHmm(chat.createdDate) }}</span>
                    </div>
                    <span class="msg2">{{ chat.message }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li
              v-for="message in messages"
              :key="message.id"
            >
              <div class="my-wrapper">
                <div :class="{'my-message': message.senderNickname === userNickName, 'your-message': message.senderNickname !== userNickName}">
                  <div
                    v-if="message.senderNickname !== userNickName"
                    class="msg-your"
                  >
                    <span class="opponent-nickname">{{ message.receiverNickname }}</span>
                    <div class="msg-box">
                      <span class="msg">{{ message.message }}</span>
                      <div class="msg-info">
                        <span
                          v-show="!message.isRead"
                          class="message-is-read"
                        >1</span>
                        <span class="message-createdDate">{{ $filter.formateYYYYMMDDHHmm(message.createdDate) }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="msg-my"
                  >
                    <div class="msg-info">
                      <span
                        v-show="!message.isRead"
                        class="message-is-read"
                      >1</span>
                      <span class="message-createdDate">{{ $filter.formateYYYYMMDDHHmm(message.createdDate) }}</span>
                    </div>
                    <span class="msg">{{ message.message }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="input-container">
          <input
            v-model="newMessage"
            type="text"
            class="input-field"
            placeholder="메시지 입력"
          >
          <button
            class="button"
            @click="sendMessage"
          >
            전송
          </button>
        </div>
      </div>
      <div v-else>
        <p>사용자를 선택하세요.</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import { mapGetters } from 'vuex';
    
export default {
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],
      members: [],
      opponentId: null,
      messages: [],
      newMessage: '',
      stompClient: null,
      chatRoomId: null,
      chatHistory: [],
      chatRooms: [],
      showLocationAuthentication: false,
      userNickName: '',
      username: '',
      boolAuthentication: false,
      searchCondition: 0,
      searchKeyword: '',
      searchText: '', // 검색어를 저장하는 데이터 속성
      error: false, // 로딩 상태를 나타내는 데이터 속성
      domain: 'http://3.34.134.198:8080',
      subscribeIds: {}
    };
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  watch: {
    $route (val) {
      if (val.params.opponentId) {
        this.destory();
        this.init();
      }
    }
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.destory();
  },
  methods: {
    init () {
      if (this.$route.params.opponentId) {
        this.opponentId = this.$route.params.opponentId;
      }
      this.findChatRoomId();
      // STOMP 클라이언트 초기화 및 연결
      this.initStompClient();
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
    findChatRoomId() {
      this.$axios.post('/api/chat/room', {
        opponentId: this.opponentId,
      }, {
        headers: {
          Authorization: this.getToken,
        },
      })
        .then(response => {
          this.chatRoomId = response.data.data.chatRoomId;
          this.loadChatHistory();
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadChatHistory() {
      this.$axios.get('/api/chat/history', {
        params: {
          chatRoomId: this.chatRoomId,
        },
        headers: {
          Authorization: this.getToken,
        },
      })
        .then(response => {
          this.chatHistory = response.data.data;
            
        })
        .catch(error => {
          console.error(error);
        })
    },
    initStompClient() {
      const socket = new SockJS(`${this.domain}/ws`)
  
      this.stompClient = Stomp.over(socket)
      const header = {
        Authorization: this.getToken
      };
      this.stompClient.connect(header, () => {
        console.log('STOMP 연결 성공');
        this.subscribeToChatRooms();
        this.subscribeToPrivateMessages();
      }, (error) => {
        console.log('STOMP 연결 실패: ', error);
      });
    },
    subscribeToChatRooms() {
      const destination = `/user/${this.username}/room`;
    
      const subscribeInfo = this.stompClient.subscribe(destination, (message) => {
        console.log("receive : " + message)
      });

      this.subscribeIds[destination] = subscribeInfo.id
    },
    subscribeToPrivateMessages() {
      const destination = `/user/${this.chatRoomId}/private`;
    
      const subscribeInfo = this.stompClient.subscribe(destination, (message) => {
        const receivedMessage = JSON.parse(message.body);
        this.messages.push(receivedMessage);
        console.log("receive : " + JSON.stringify(receivedMessage))
      });

      this.subscribeIds[destination] = subscribeInfo.id
    },
    sendMessage() {
      const message = {
        message: this.newMessage,
        opponentId: this.opponentId,
        chatRoomId: this.chatRoomId,
        senderNickname: null
      };
      const destination = '/pub/private-message';
          
      this.stompClient.send(destination, JSON.stringify(message));
      // 전송 후 초기화
      this.newMessage = '';
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
      this.username = claims.username;
    },
    destory () {
      // 컴포넌트 해제 시 STOMP 클라이언트 연결 해제
      if (this.stompClient) {
        const headers = {
          Authorization: this.getToken
        };

        Object.keys(this.subscribeIds).forEach((key) => {
          this.stompClient.unsubscribe(this.subscribeIds[key], headers);
        })
        this.stompClient.disconnect();
      }
    }
  }
};
    </script>
    
    <style>
  .chat {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 80px);
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
    overflow: auto;
  }

  .chat-container  {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .chat-history {
    padding: 15px;
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
  .my-wrapper {
    height: auto;
    overflow-y: auto;
  }
  .my-message {
    text-align: right;
  }
  
  .your-message {
    text-align: left;
    margin-bottom: 5px;
  }
  .msg {
    display: inline-block;
    border-radius: 5px;
    padding: 7px 15px;
  }
  .msg2{
    display: inline-block;
    border-radius: 5px;
    padding: 7px 15px;
  }
  .msg-my{
    text-align: right;

    display: flex;
    justify-content: flex-end;
  }
  .msg-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .msg-my .msg-info {
    padding-right: 10px;
  }
  .msg-your .msg-info {
    padding-left: 10px;
  }
  .msg-your {
    display:flex;
    flex-direction: column;
  }
  .opponent-nickname {
    padding-bottom: 5px;
  }
  .msg-box{
    display: flex;
  }
  .msg-my .msg2{
    background-color: #4A8522;
      color: #fff;
  }
   .msg-your .msg2{
    background-color: #f1f0f0;
  }
  
  .my-message .msg {
      background-color: #4A8522;
      color: #fff;
  }
  .your-message .msg {
      background-color: #f1f0f0;
  }
  
  .message-createdDate {
    font-size: 0.8rem;
    color: gray;
  }

  .message-is-read {
    font-size: 0.8rem;
    color: yellowgreen;
  }
  
  .input-container {
    display: flex;
    justify-content: space-between;
  }
  
  .input-field {
    width: 90%;
    box-sizing: border-box;
    padding: 15px;
  }
  
  .button {
    flex-shrink: 0;
    width: 10%;
    height: 100%;
    background-color: #4A8522;
    color: white;
  }
  
  
  </style>
    