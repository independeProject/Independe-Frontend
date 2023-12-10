<template>
  <v-app-bar height="80" :elevation="1">
      <v-container>
        <v-row align="center">
          <v-col cols="2">
            <router-link to="/">
              <v-img src="../img/logo.png" :style="{ 'max-height': '100px' }"></v-img>
            </router-link>
          </v-col>
          <v-col cols="5">
            <v-tabs color="#5E913B" v-model="active_tab">
              <router-link to="/" style="text-decoration: none; color:black;">
                <v-tab @click="$store.state.myGlobalVariable = 0">
                  <p class="font-weight-bold text-h6 mx-4">{{ link[0] }}</p>
                </v-tab>
              </router-link>
              <router-link to="/board/ALL/FREE" style="text-decoration: none; color:black;"
                @click="$store.state.boardCheck = 0">
                <v-menu open-on-hover>
                  <template v-slot:activator="{ props }">
                    <v-tab v-bind="props">
                      <p class="font-weight-bold text-h6 mx-4">{{ link[1] }}</p>
                    </v-tab>
                  </template>
                  <v-list>
                    <v-list-item align="center">
                      <router-link to="/board/ALL/FREE" style="text-decoration: none; color:black;" @click="region_all">
                        <v-list-item-title class="my-2" @click="$store.state.boardCheck = 0">자유</v-list-item-title>
                      </router-link>
                      <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                      <router-link to="/board/SEOUL/TALK" style="text-decoration: none; color:black;" @click="region_seoul">
                        <v-list-item-title class="my-2" @click="$store.state.boardCheck = 1">서울</v-list-item-title>
                      </router-link>
                      <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                      <router-link to="/board/PUSAN/TALK" style="text-decoration: none; color:black;" @click="region_busan">
                        <v-list-item-title class="my-2" @click="$store.state.boardCheck = 2">부산</v-list-item-title>
                      </router-link>
                      <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                      <router-link to="/board/ULSAN/TALK" style="text-decoration: none; color:black;" @click="region_ulsan">
                        <v-list-item-title class="my-2" @click="$store.state.boardCheck = 3">울산</v-list-item-title>
                      </router-link>
                      <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                      <router-link to="/board/KEYNONGNAM/TALK" style="text-decoration: none; color:black;"
                        @click="region_kyeongnam">
                        <v-list-item-title class="my-2" @click="$store.state.boardCheck = 4">경남</v-list-item-title>
                      </router-link>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </router-link>
              <router-link to="/independent/CLEAN" style="text-decoration: none; color:black;"
                @click="$store.state.independentCheck = 0">
                <v-menu open-on-hover>
                  <template v-slot:activator="{ props }">
                    <v-tab v-bind="props">
                      <p class="font-weight-bold text-h6 mx-4">{{ link[2] }}</p>
                    </v-tab>
                  </template>
                  <v-list>
                    <v-list-item align="center">
                      <router-link to="/independent/CLEAN" style="text-decoration: none; color:black;"
                        @click="independent_clean">
                        <v-list-item-title class="my-2" @click="$store.state.independentCheck = 0">청소</v-list-item-title>
                      </router-link>
                      <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                      <router-link to="/independent/WASH" style="text-decoration: none; color:black;"
                        @click="independent_wash">
                        <v-list-item-title class="my-2" @click="$store.state.independentCheck = 1">세탁</v-list-item-title>
                      </router-link>
                      <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                      <router-link to="/independent/COOK" style="text-decoration: none; color:black;"
                        @click="independent_cook">
                        <v-list-item-title class="my-2" @click="$store.state.independentCheck = 2">요리</v-list-item-title>
                      </router-link>
                      <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                      <router-link to="/independent/HEALTH" style="text-decoration: none; color:black;"
                        @click="independent_health">
                        <v-list-item-title class="my-2" @click="$store.state.independentCheck = 3">건강</v-list-item-title>
                      </router-link>
                      <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                      <router-link to="/independent/ETC" style="text-decoration: none; color:black;"
                        @click="independent_etc">
                        <v-list-item-title class="my-2" @click="$store.state.independentCheck = 4">기타</v-list-item-title>
                      </router-link>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </router-link>
            </v-tabs>
          </v-col>
          <v-col cols="3">
            <v-card-text>
              <v-text-field v-model="searchText" :loading="error" density="compact" variant="outlined" label="통합검색"
                append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="totalSearch"
                @keydown.enter="totalSearch"></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="1" v-if="!getToken">
            <router-link to="/login">
              <v-btn variant="flat" color="#5E913B" class="font-weight-bold" style="width:100%; height:40px">
                <div class="text-white">로그인</div>
              </v-btn>
            </router-link>
          </v-col>
          <v-col cols="1" v-if="!getToken">
            <router-link to="/signup">
              <v-btn variant="flat" color="#5E913B" class="font-weight-bold" style="width:100%; height:40px">
                <div class="text-white">회원가입</div>
              </v-btn>
            </router-link>
          </v-col>
          <v-col cols="2" v-if="getToken">
  
            <v-menu :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-row align="center" justify="end">
                  <v-btn v-bind="props" class="font-weight-bold mr-3" variant="tonal" color="green-lighten-1">
                    <v-img :height="25" :width="25" src="../img/user.png" style="color:#2E471D"></v-img>
                    <span style="color: #5E913B;" class="font-weight-bold">{{ userNickName }}</span>
                  </v-btn>
                </v-row>
              </template>
              <v-card :height="showLocationAuthentication ? 400 : 275" :width="250">
                <v-list>
                  <v-list-item style="text-align: center;">
                    <v-row class="mt-1" style="cursor: pointer;">
                      <v-col cols=1></v-col>
                      <v-col cols="auto">
                        <v-img :height="25" :width="25" src="../img/infomation.png" class=""></v-img>
                      </v-col>
                      <v-col cols="2"></v-col>
                      <v-col cols="auto">
                        <v-list-item-title style="font-size:18px" class="font-weight-bold">내 정보</v-list-item-title>
                      </v-col>
                    </v-row>
                    <v-divider :thickness="1" class="border-opacity-25 my-5"></v-divider>
                    <v-row style="cursor: pointer;">
                      <v-col cols=1></v-col>
                      <v-col cols="auto">
                        <v-img :height="25" :width="25" src="../img/chatting.png" class=""></v-img>
                      </v-col>
                      <v-col cols="2"></v-col>
                      <v-col cols="auto">
                        <router-link :to="`/chatRooms`" style="text-decoration: none; color:black;">
                          <v-list-item-title style="font-size:18px" class="font-weight-bold">채팅</v-list-item-title>
                        </router-link>
                      </v-col>
                    </v-row>
                    <v-divider :thickness="1" class="border-opacity-25 my-5"></v-divider>
                    <v-row @click="showLocationAuthentication = !showLocationAuthentication" style="cursor: pointer;"
                      class="mb-3">
                      <v-col cols=1></v-col>
                      <v-col cols="auto">
                        <v-img :height="25" :width="25" src="../img/location.png" class=""></v-img>
                      </v-col>
                      <v-col cols="2"></v-col>
                      <v-col cols="auto">
                        <v-list-item-title style="font-size:18px" class="font-weight-bold">위치인증</v-list-item-title>
                      </v-col>
                    </v-row>
  
                    <v-row v-if="showLocationAuthentication">
                      <v-col cols="12">
                        <v-sheet>
                          <div style="text-align:center; color: gray; font-size:14px" class="font-weight-bold mb-1">현재위치불러오기
                          </div>
                          <v-row>
                            <v-col cols="auto">
                              <v-switch class="ml-3" color="success" v-model="boolAuthentication"
                                @change="toggleLocationAuthentication"></v-switch>
                            </v-col>
                            <v-col cols="auto" align="end" justify="end">
                              <div v-if="$store.state.locationAuthentication">
                                <div class="mt-4 font-weight-bold">현재위치 : <span style="color: #5E913B">{{
                                  $store.state.currentLocation }}</span></div>
                              </div>
                              <div v-else>
                                <div class="mt-4 font-weight-bold">현재위치 : <span style="color: #5E913B">인증필요</span></div>
                              </div>
                            </v-col>
                          </v-row>
                        </v-sheet>
                      </v-col>
                    </v-row>
  
                    <v-divider :thickness="1" class="border-opacity-25 mb-5"></v-divider>
                    <v-row style="cursor: pointer;">
                      <v-col cols=1></v-col>
                      <v-col cols="auto">
                        <v-img :height="25" :width="25" src="../img/logout.png" class=""></v-img>
                      </v-col>
                      <v-col cols="2"></v-col>
                      <v-col cols="auto">
                        <v-list-item-title @click="handleLogout" style="font-size:18px"
                          class="font-weight-bold">로그아웃</v-list-item-title>
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
        <div class="container-1" v-show="ok">
        <h2>채팅목록</h2>
        <ul>
          <li v-for="room in chatRooms" :key="room.chatRoomId">
            <router-link :to="'/chat/' + room.receiverId" @click="goForward" class="chat-link">
              <span>{{ room.receiverNickname }} </span>
            </router-link>
          </li>
        </ul>
        </div>
        <div class="container-2">
        <div v-if="memberId">
            <ul>
              <li v-for="chat in chatHistory" :key="chat.message">
                <div class = my-wrapper>
                <div :class="{'my-message': chat.senderNickname === myNickname, 'your-message': chat.senderNickname !== myNickname}">
                  <ul v-if="chat.senderNickname !== myNickname">
                    <li v-for="room in chatRooms" :key="room.chatRoomId">
                        <span v-if="room.receiverId == memberId" class="receiver-nickname">{{ room.receiverNickname }}</span>
                    </li>
                 </ul>
                  <div v-if="chat.senderNickname !== myNickname" class = "msg-your">
                    <span class="msg2">{{ chat.message }}</span>
                    <span class="message-createdDate">{{ chat.createdDate }}</span>
                  </div>
                  <div v-else class="msg-my">
                    <span class="message-createdDate">{{ chat.createdDate }}</span>
                    <span class="msg2">{{ chat.message }}</span>
                  </div>
                </div>
                </div>
              </li>
            </ul>
            <ul>
              <li v-for="message in messages" :key="message.id">
                <div class = my-wrapper>
                <div :class="{'my-message': message.senderNickname === myNickname, 'your-message': message.senderNickname !== myNickname}">
                  <ul v-if="message.senderNickname !== myNickname">
                    <li v-for="room in chatRooms" :key="room.chatRoomId">
                        <span v-if="room.receiverId == memberId" class="receiver-nickname">{{ room.receiverNickname }}</span>
                    </li>
                 </ul>
                  <span class="msg">{{ message.message }}</span>
                  <span class="message-createdDate">{{ message.createdDate }}</span>
                </div>
                </div>
              </li>
            </ul>
             <div class="input-container">
            <input type="text" class="input-field" v-model="newMessage" placeholder="메시지 입력">
            <button @click="sendMessage" class="button">전송</button>
        </div>
        </div>
        <div v-else>
          <p>사용자를 선택하세요.</p>
        </div>
        </div>
        </div>
    </template>
  
  <style>
  .chat {
    display: flex;
    flex-direction: row;
  }
  
  .container-1 {
    flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
    background-color: #f1f1f1;
  }
  
  .container-2 {
    flex: 4; /* 남은 공간을 모두 차지하도록 설정 */
  }
  
  ul, ol {
    list-style-type: none;
  }
  .chat-link {
    display: inline-block;
    color: rgb(8, 148, 50);
    font-weight: bold;
    text-decoration: none;
    font-size: 30px;
    padding-bottom: 20px;
  }
  .chat-link:hover {
    width: 340px;
    height: 50px;
    color: white;
    border-radius: 15px;
    background-color: rgb(8, 148, 50);
    opacity: 0.5;
  }
  .my-wrapper {
    height: auto;
    overflow-y: auto;
    padding: 10px;
  }
  .my-message {
    text-align: right;
  }
  
  .your-message {
    text-align: left;
    margin-bottom: 5px;
  }
  .receiver-nickname {
    position: relative;
    left: -45px; /* 조정할 왼쪽 위치 값 */
  }
  
  .msg {
      display: inline-block;
      border-radius: 15px;
      padding: 7px 15px;
      margin-bottom: 10px;
      margin-top: 5px;
  }
  .msg2{
    display: inline-block;
    border-radius: 15px;
    padding: 7px 15px;
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .msg-my{
    text-align: right;
  }
  .msg-your {
    text-align: left;
    margin-bottom: 5px;
  }
   .msg-my > .msg2{
    background-color: #4A8522;
      color: #fff;
  }
   .msg-your > .msg2{
    background-color: #f1f0f0;
  }
  
  .my-message > .msg {
      background-color: #4A8522;
      color: #fff;
  }
  .your-message > .msg {
      background-color: #f1f0f0;
  }
  
  .message-createdDate {
    font-size: 0.8rem;
    color: gray;
    left: -70px; /* 말풍선 왼쪽으로 이동하는 값 */
  }
  
  .input-container {
    position: sticky;
    bottom: 0 ;
    display: flex;
    justify-content: space-between;
    z-index: 1;
  }
  
  .input-field {
    width: 90%;
    box-sizing: border-box;
  }
  
  .button {
    flex-shrink: 0;
    width: 10%;
    height: 50px;
    background-color: #4A8522;
    color: white;
  }
  
  
  </style>
    
    <script>
    import Stomp from 'webstomp-client'
    import SockJS from 'sockjs-client'
    import { mapGetters } from 'vuex';
    import axios from 'axios';
    
    export default {
      data() {
        return {
          active_tab: 0,
        link: ['메인', '게시판', '자취생활'],
  
          members: [],
          memberId: null,
          selectedMember: null,
          messages: [],
          newMessage: '',
          stompClient: null,
          chatRoomId: null,
          myNickname: null,
          chatHistory: [],
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
          this.memberId = this.$route.params.memberId;
          this.findChatRoomId();
          this.loadChatHistory();
          this.selectMember();
          this.fetchChatRooms();
  
          if (this.$store.state.locationAuthentication === true)
      {
        this.getAddr();
        this.boolAuthentication = true      
      }
      else
      this.boolAuthentication = false
  
      if (this.getToken)
        this.loginToken()  
      },
      methods: {
        startChat(receiverId) {
          this.$router.push('/chat/' + receiverId);        
        },
        fetchChatRooms() {
    
  
          axios.get('/api/chat/rooms', {
  
            headers: {
              Authorization: this.getToken,
            },
          })
            .then(response => {
              this.chatRooms = response.data;
            })
            .catch(error => {
              console.error(error);
            });
        },
        findChatRoomId() {
  
          axios.get('/api/chat/room', {
  
            params: {
              receiverId: this.memberId,
            },
            headers: {
              Authorization: this.getToken,
            },
          })
          .then(response => {
            console.log(response.data);
            this.chatRoomId = response.data.chatRoomId;
            this.myNickname = response.data.myNickname;
          })
          .catch(error => {
            console.error(error);
          });
        },
        loadChatHistory() {
          axios.get('/api/chat/history', {
            params: {
              receiverId: this.memberId,
            },
            headers: {
              Authorization: this.getToken,
            },
          })
          .then(response => {
            this.chatHistory = response.data;
            
          })
          .catch(error => {
            console.error(error);
          })
        },
        selectMember(member) {
          this.selectedMember = member;
    
          // STOMP 클라이언트 초기화 및 연결
          this.initStompClient();
        },
        initStompClient() {
          const socket = new SockJS('http://localhost:8080/ws')
  
          this.stompClient = Stomp.over(socket)
          const header = {
            Authorization: this.getToken
          };
          this.stompClient.connect(header, () => {
            console.log('STOMP 연결 성공');
            this.subscribeToPrivateMessages();
          }, (error) => {
              console.log('STOMP 연결 실패: ', error);
          });
        },
        subscribeToPrivateMessages() {
          const destination = `/user/${this.chatRoomId}/private`;
    
          this.stompClient.subscribe(destination, (message) => {
            const receivedMessage = JSON.parse(message.body);
            this.messages.push(receivedMessage);
            console.log("receive : " + receivedMessage)
          });
        },
        sendMessage() {
          const message = {
            message: this.newMessage,
            receiverId: this.memberId,
            chatRoomId: this.chatRoomId,
            senderNickname: null,
          };
          const destination = '/pub/private-message';
          const header = {
            Authorization: this.getToken
          };
    
          
          this.stompClient.send(destination, JSON.stringify(message), header);
          // 전송 후 초기화
          this.newMessage = '';
    
    
        },
        toggleLocationAuthentication() {
        this.$store.commit('toggleLocationAuthentication');
  
        if (this.$store.state.locationAuthentication === true) 
  
          this.$axios.post("/api/members/region", { region: this.$store.state.currentLocation }, {
          headers: {
            Authorization: this.$store.state.token, // 헤더에 토큰 추가
          },
        });        
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
      beforeUnmount() {
        // 컴포넌트 해제 시 STOMP 클라이언트 연결 해제
        if (this.stompClient) {
          this.stompClient.disconnect();
        }
      }
    };
    </script>
    