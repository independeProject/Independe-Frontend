<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="mt-3">
          <v-col cols="auto">
            <v-img
              :width="35"
              height="45"
              src="../img/search.png"
            />
          </v-col>
          <v-col cols="auto">
            <h2
              class="font-weight-bold mt-2"
              style="color:#5E913B"
            >
              {{ searchText }}의 검색결과
            </h2>
          </v-col>
          <v-col
            align="end"
            justify="end"
          >
            <p class="font-weight-bold mt-6">
              검색 수 : {{ count }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider
              :thickness="1"
              class="border-opacity-25"
            />
          </v-col>
        </v-row>
        <v-sheet
          class="font-weight-bold"
          align="center"
          justify="center"
        >
          <v-row>
            <v-col cols="1">
              게시판
            </v-col>
            <v-col cols="6">
              제목
            </v-col>
            <v-col cols="2">
              작성자
            </v-col>
            <v-col cols="3">
              <v-row>
                <v-col cols="4">
                  댓글수
                </v-col>
                <v-col cols="4">
                  추천수
                </v-col>
                <v-col cols="4">
                  조회수
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
        <v-row>
          <v-col>
            <v-divider
              :thickness="1"
              class="border-opacity-25"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in searchBoard"
            :key="item"
            cols="12"
          >
            <v-row>
              <v-col
                cols="1"
                align="center"
                justify="center"
              >
                <div v-if="item.independentPostType === null">
                  <router-link
                    :to="{ name: 'BoardView', params: { regionType: item.regionTypeEn, regionPostType: item.regionPostTypeEn } }"
                    style="text-decoration: none;"
                  >
                    <p
                      class="text-grey-darken-1"
                      @click="$store.state.boardCheck = regionsAPI.indexOf(item.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(item.regionPostTypeEn)"
                    >
                      {{ item.regionType }}·{{ item.regionPostType }}
                    </p>
                  </router-link>
                </div>
                <div v-else>
                  <router-link
                    :to="{ name: 'IndependentView', params: { independentType: item.independentPostTypeEn } }"
                    style="text-decoration: none;"
                  >
                    <p
                      class="text-grey-darken-1"
                      @click="$store.state.independentCheck = independentsAPI.indexOf(item.independentPostTypeEn)"
                    >
                      자취·{{ item.independentPostType }}
                    </p>
                  </router-link>
                </div>
              </v-col>
              <v-col cols="6">
                <div v-if="item.title.length <= 23">
                  <v-img
                    v-if="item.picture === true"
                    style="float:left"
                    :width="15"
                    src="../img/imagePlaceHolder.png"
                    class="my-1 mr-1"
                  />
                  <router-link
                    :to="{ name: 'PostView', params: { postId: item.postId } }"
                    style="text-decoration: none; color:black;"
                  >
                    {{ item.title }}
                  </router-link>
                </div>
                <div v-else>
                  <v-img
                    v-if="item.picture === true"
                    style="float:left"
                    :width="15"
                    src="../img/imagePlaceHolder.png"
                    class="my-1 mr-1"
                  />
                  <router-link
                    :to="{ name: 'PostView', params: { postId: item.postId } }"
                    style="text-decoration: none; color:black;"
                  >
                    <p>{{ item.title.substr(0, 23) }}...</p>
                  </router-link>
                </div>
              </v-col>
              <v-col cols="2">
                {{ item.nickname }}
              </v-col>
              <v-col cols="3">
                <v-row>
                  <v-col cols="4">
                    <div>
                      <v-img
                        style="float:left;"
                        :width="15"
                        src="../img/commentIcon.png"
                        class="my-1 mx-1"
                      />
                      <p class="text-grey-darken-1 mx-1">
                        {{ item.commentCount }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div>
                      <v-img
                        style="float:left"
                        :width="15"
                        src="../img/recommendIcon.png"
                        class="my-1 mx-1"
                      />
                      <p class="text-grey-darken-1 mx-1">
                        {{ item.recommendCount }}
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div>
                      <v-img
                        style="float:left"
                        :width="15"
                        src="../img/viewIcon.png"
                        class="my-1 mx-1"
                      />
                      <p class="text-grey-darken-1 mx-1">
                        {{ item.views }}
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-if="!$last">
              <v-col>
                <v-divider
                  :thickness="1"
                  class="border-opacity-25"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row justify="center">
          <div v-if="totalPage <= 10">
            <v-row
              class="my-3"
              justify="center"
            >
              <div
                v-for="curPage in totalPage"
                :key="curPage"
                @click="currentPage = page - 1, page()"
              >
                <router-link
                  :to="{ path: $route.path, query: { ...$route.query, page: curPage } }"
                  style="text-decoration: none;"
                >
                  <div v-if="currentPage === curPage - 1">
                    <v-btn
                      variant="text"
                      size="x-small"
                      class="font-weight-bold"
                      style="font-size: 16px; color:#5E913B;"
                    >
                      {{ curPage }}
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn
                      variant="text"
                      size="x-small"
                      style="font-size: 14px; color:#A9A9A9"
                    >
                      {{ curPage
                      }}
                    </v-btn>
                  </div>
                </router-link>
              </div>
            </v-row>
          </div>
          <div v-else>
            <v-row class="my-3">
              <router-link
                :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }"
                style="text-decoration: none;"
                @click="page()"
              >
                <v-btn
                  :disabled="currentPage < 1"
                  variant="text"
                  size="x-small"
                  :style="{ color: currentPage <= 1 ? '#5E913B' : '' }"
                  @click="currentPage = 0"
                >
                  <div style="color:#A9A9A9; font-size:16px">
                    &lt;&lt;
                  </div>
                </v-btn>
              </router-link>
              <router-link
                :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }"
                style="text-decoration: none;"
                @click="page()"
              >
                <v-btn
                  :disabled="currentPage < 1"
                  variant="text"
                  size="x-small"
                  :style="{ color: currentPage <= 1 ? '#5E913B' : '' }"
                  @click="currentPage = Math.max(currentPage - 10, 0)"
                >
                  <div style="color:#A9A9A9; font-size:16px">
                    &lt;
                  </div>
                </v-btn>
              </router-link>
              <div
                v-for="pageNumber in displayPageNumbers"
                :key="pageNumber"
                :class="{ active: pageNumber === currentPage, 'last-page': pageNumber === displayPageNumbers[displayPageNumbers.length - 1] }"
                @click="currentPage = pageNumber - 1, page()"
              >
                <router-link
                  :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }"
                  style="text-decoration: none;"
                >
                  <div v-if="currentPage === pageNumber - 1">
                    <v-btn
                      variant="text"
                      size="x-small"
                      class="font-weight-bold"
                      style="font-size: 16px; color:#5E913B"
                      @click="currentPage = pageNumber"
                    >
                      {{ pageNumber }}
                    </v-btn>
                  </div>
                  <div v-else-if="currentPage >= totalPage">
                    <v-btn
                      variant="text"
                      size="x-small"
                      :style="{ fontSize: pageNumber === displayPageNumbers[displayPageNumbers.length - 1] ? '16px' : '14px', fontWeight: pageNumber === displayPageNumbers[displayPageNumbers.length - 1] && 'bold', color: pageNumber === displayPageNumbers[displayPageNumbers.length - 1] ? '#5E913B' : '#A9A9A9' }"
                      @click="currentPage = pageNumber"
                    >
                      {{
                        pageNumber }}
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn
                      variant="text"
                      size="x-small"
                      style="font-size: 14px; color:#A9A9A9"
                      @click="currentPage = pageNumber"
                    >
                      {{ pageNumber }}
                    </v-btn>
                  </div>
                </router-link>
              </div>
              <router-link
                :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }"
                style="text-decoration: none;"
                :style="{ color: currentPage >= totalPage ? '#5E913B' : '' }"
                @click="page()"
              >
                <v-btn
                  :disabled="currentPage >= totalPage - 1"
                  variant="text"
                  size="x-small"
                  style="font-size: 14px;"
                  @click="currentPage = Math.min(currentPage + 10, totalPage)"
                >
                  <div style="color:#A9A9A9; font-size:16px">
                    &gt;
                  </div>
                </v-btn>
              </router-link>
              <router-link
                :to="{ path: $route.path, query: { ...$route.query, page: totalPage } }"
                style="text-decoration: none;"
                :style="{ color: currentPage >= totalPage ? '#5E913B' : '' }"
                @click="page()"
              >
                <v-btn
                  :disabled="currentPage >= totalPage - 1"
                  variant="text"
                  size="x-small"
                  style="font-size: 14px;"
                  @click="currentPage = totalPage"
                >
                  <div style="color:#A9A9A9; font-size:16px">
                    &gt;&gt;
                  </div>
                </v-btn>
              </router-link>
            </v-row>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.searchText = urlParams.get('searchText');

    this.Board()

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
          if (this.totalPage < 10) {
            this.totalPage = 1
          } else if (this.totalPage % 10 === 0) {
            this.totalPage = parseInt(this.totalPage / 10)
          } else {
            this.totalPage = parseInt(this.totalPage / 10) + 1
          }

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
  }
}
</script>