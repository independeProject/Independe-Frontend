<template>
  <!--시스템 바-->
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

  <v-app>
    <v-main>
      <v-container>
        <v-row class="mt-3">

          <v-col cols="auto">
            <v-img :width="35" height="45" src="../img/search.png"></v-img>
          </v-col>
          <v-col cols="auto">
            <h2 class="font-weight-bold mt-2" style="color:#5E913B">{{ searchText }}의 검색결과</h2>
          </v-col>
          <v-col align="end" justify="end">
            <p class="font-weight-bold mt-6">검색 수 : {{ count }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider :thickness="1" class="border-opacity-25"></v-divider>
          </v-col>
        </v-row>
        <v-sheet class="font-weight-bold" align="center" justify="center">
          <v-row>
            <v-col cols="1">게시판</v-col>
            <v-col cols="6">제목</v-col>
            <v-col cols="2">작성자</v-col>
            <v-col cols="3">
              <v-row>
                <v-col cols="4">댓글수</v-col>
                <v-col cols="4">추천수</v-col>
                <v-col cols="4">조회수</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
        <v-row>
          <v-col>
            <v-divider :thickness="1" class="border-opacity-25"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="item in searchBoard" :key="item" cols="12">
            <v-row>
              <v-col cols="1" align="center" justify="center">
                <div v-if="item.independentPostType === null">
                  <router-link
                    :to="{ name: 'BoardView', params: { regionType: item.regionTypeEn, regionPostType: item.regionPostTypeEn } }"
                    style="text-decoration: none;">
                    <p @click="$store.state.boardCheck = regionsAPI.indexOf(item.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(item.regionPostTypeEn)"
                      class="text-grey-darken-1">{{ item.regionType }}·{{ item.regionPostType }}</p>
                  </router-link>
                </div>
                <div v-else>
                  <router-link :to="{ name: 'IndependentView', params: { independentType: item.independentPostTypeEn } }"
                    style="text-decoration: none;">
                    <p @click="$store.state.independentCheck = independentsAPI.indexOf(item.independentPostTypeEn)"
                      class="text-grey-darken-1">자취·{{ item.independentPostType }}</p>
                  </router-link>
                </div>
              </v-col>
              <v-col cols="6">
                <div v-if="item.title.length <= 23">
                  <v-img style="float:left" v-if="item.picture === true" :width="15" src="../img/imagePlaceHolder.png"
                    class="my-1 mr-1"></v-img>
                  <router-link :to="{ name: 'PostView', params: { postId: item.postId } }"
                    style="text-decoration: none; color:black;">
                    {{ item.title }}
                  </router-link>
                </div>
                <div v-else>
                  <v-img style="float:left" v-if="item.picture === true" :width="15" src="../img/imagePlaceHolder.png"
                    class="my-1 mr-1"></v-img>
                  <router-link :to="{ name: 'PostView', params: { postId: item.postId } }"
                    style="text-decoration: none; color:black;">
                    <p>{{ item.title.substr(0, 23) }}...</p>
                  </router-link>
                </div>
              </v-col>
              <v-col cols="2">{{ item.nickname }}</v-col>
              <v-col cols="3">
                <v-row>
                  <v-col cols="4">
                    <div>
                      <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                      <p class="text-grey-darken-1 mx-1">{{ item.commentCount }}</p>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div>
                      <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                      <p class="text-grey-darken-1 mx-1">{{ item.recommendCount }}</p>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div>
                      <v-img style="float:left" :width="15" src="../img/viewIcon.png" class="my-1 mx-1"></v-img>
                      <p class="text-grey-darken-1 mx-1">{{ item.views }}</p>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-if="!$last">
              <v-col>
                <v-divider :thickness="1" class="border-opacity-25"></v-divider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row justify="center">
          <div v-if="totalPage <= 10">
            <v-row class="my-3" justify="center">
              <div :key="totalPage" v-for="totalPage in totalPage" @click="currentPage = totalPage - 1, page()">
                <router-link :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }"
                  style="text-decoration: none;">
                  <div v-if="currentPage === totalPage - 1">
                    <v-btn variant="text" size="x-small" class="font-weight-bold"
                      style="font-size: 16px; color:#5E913B;">{{ totalPage }}</v-btn>
                  </div>
                  <div v-else>
                    <v-btn variant="text" size="x-small" style="font-size: 14px; color:#A9A9A9">{{ totalPage
                    }}</v-btn>
                  </div>
                </router-link>
              </div>
            </v-row>
          </div>
          <div v-else>
            <v-row class="my-3">
              <router-link :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }" @click="page()"
                style="text-decoration: none;">
                <v-btn @click="currentPage = 0" :disabled="currentPage < 1" variant="text" size="x-small"
                  :style="{ color: currentPage <= 1 ? '#5E913B' : '' }">
                  <div style="color:#A9A9A9; font-size:16px">&lt;&lt;</div>
                </v-btn>
              </router-link>
              <router-link :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }" @click="page()"
                style="text-decoration: none;">
                <v-btn @click="currentPage = Math.max(currentPage - 10, 0)" :disabled="currentPage < 1" variant="text"
                  size="x-small" :style="{ color: currentPage <= 1 ? '#5E913B' : '' }">
                  <div style="color:#A9A9A9; font-size:16px">&lt;</div>
                </v-btn>
              </router-link>
              <div v-for="pageNumber in displayPageNumbers" :key="pageNumber"
                :class="{ active: pageNumber === currentPage, 'last-page': pageNumber === displayPageNumbers[displayPageNumbers.length - 1] }"
                @click="currentPage = pageNumber - 1, page()">
                <router-link :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }"
                  style="text-decoration: none;">
                  <div v-if="currentPage === pageNumber - 1">
                    <v-btn @click="currentPage = pageNumber" variant="text" size="x-small" class="font-weight-bold"
                      style="font-size: 16px; color:#5E913B">{{ pageNumber }}</v-btn>
                  </div>
                  <div v-else-if="currentPage >= totalPage">
                    <v-btn @click="currentPage = pageNumber" variant="text" size="x-small"
                      :style="{ fontSize: pageNumber === displayPageNumbers[displayPageNumbers.length - 1] ? '16px' : '14px', fontWeight: pageNumber === displayPageNumbers[displayPageNumbers.length - 1] && 'bold', color: pageNumber === displayPageNumbers[displayPageNumbers.length - 1] ? '#5E913B' : '#A9A9A9' }">{{
                        pageNumber }}</v-btn>
                  </div>
                  <div v-else>
                    <v-btn @click="currentPage = pageNumber" variant="text" size="x-small"
                      style="font-size: 14px; color:#A9A9A9">{{ pageNumber }}</v-btn>
                  </div>
                </router-link>
              </div>
              <router-link :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }" @click="page()"
                style="text-decoration: none;" :style="{ color: currentPage >= totalPage ? '#5E913B' : '' }">
                <v-btn @click="currentPage = Math.min(currentPage + 10, totalPage)"
                  :disabled="currentPage >= totalPage - 1" variant="text" size="x-small" style="font-size: 14px;">
                  <div style="color:#A9A9A9; font-size:16px">&gt;</div>
                </v-btn>
              </router-link>
              <router-link :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }" @click="page()"
                style="text-decoration: none;" :style="{ color: currentPage >= totalPage ? '#5E913B' : '' }">
                <v-btn @click="currentPage = totalPage" :disabled="currentPage >= totalPage - 1" variant="text"
                  size="x-small" style="font-size: 14px;">
                  <div style="color:#A9A9A9; font-size:16px">&gt;&gt;</div>
                </v-btn>
              </router-link>
            </v-row>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

  <!--푸터-->
  <v-footer border class="mt-10">
    <v-container>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <v-sheet height="80" width="650" align="center">
            <v-row justify="center" class="text-grey-lighten-1">
              <v-col cols="auto">
                <p>서비스 소개</p>
              </v-col>
              <v-col cols="auto">
                <p>개인정보 처리방침</p>
              </v-col>
              <v-col cols="auto">
                <p>이용약관</p>
              </v-col>
            </v-row>
            <v-row class="text-grey-lighten-2" style="font-size:12px" justify="center">
              <v-col cols="auto">
                <p>[팀] 인디펜더</p>
              </v-col>
              <v-col cols="auto">
                <p>최준혁 이용희 최성우</p>
              </v-col>
              <v-col cols="auto">
                <p>chlwnsgur1214@naver.com</p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="3"> </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SearchView',
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],

      searchBoard: [],
      searchText: '',
      count: 0,

      currentPage: 0,
      totalPage: [],

      showLocationAuthentication: false,
      userNickName: '',
      boolAuthentication: false,

      error: false, // 로딩 상태를 나타내는 데이터 속성
    }
  },
  methods: {
    Board() {
      // 검색 요청을 보낼 URL 생성
      const url = `/api/posts/search`;

      // 검색 요청 보내기
      this.$axios.get(url, {
        params: {
          keyword: this.searchText,
          page: this.currentPage
        }
      }, {
        headers: {
          Authorization: this.getToken, // 헤더에 토큰 추가
        },
      })
        .then(res => {
          // 검색 결과 처리
          this.searchBoard = res.data.data;
          this.totalPage = res.data.count;
          this.count = res.data.count;

          // 페이지 처리 코드...
          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1

          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    page() {
      const url = `/api/posts/search`;
      const token = this.getToken; // Vuex 스토어에서 토큰 값을 가져옴

      this.$axios.get(url, { params: { keyword: this.searchText, page: this.currentPage } }, {
        headers: {
          Authorization: token, // 헤더에 토큰 추가
        },
      })
        .then(res => {
          this.searchBoard = res.data.data
          this.$store.commit('updateNowPage', this.currentPage);
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
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
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.searchText = urlParams.get('searchText');

    this.Board()

    if (this.$store.state.locationAuthentication === true) {
      this.getAddr();
      this.boolAuthentication = true      
    }
    else
      this.boolAuthentication = false

    if (this.getToken)
      this.loginToken()
  },
  computed: {
    displayPageNumbers() {
      const currentPage = this.currentPage;
      const totalPage = this.totalPage;
      const pageNumbers = [];
      let startPage = 1;
      let endPage = 10;
      let diff = totalPage - currentPage;

      if (totalPage <= 10) {
        for (let i = 1; i <= totalPage; i++) {
          pageNumbers.push(i);
        }
      } else if (diff < 5) {
        startPage = totalPage - 9;
        endPage = totalPage;
      } else if (currentPage > 5) {
        startPage = currentPage - 4;
        endPage = currentPage + 5;
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
    ...mapGetters(['getToken'])
  },
}
</script>