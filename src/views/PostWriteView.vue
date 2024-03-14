<script setup>
import AppFooter from '@/common/AppFooter.vue';
</script>
<template>
  <div>
    <div v-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 0">
      {{ setBoardCheck(0) }} {{ setTypeCheck(0) }} {{ setBoardNameCheck(0) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 1">
      {{ setBoardCheck(0) }} {{ setTypeCheck(1) }} {{ setBoardNameCheck(1) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 2">
      {{ setBoardCheck(0) }} {{ setTypeCheck(2) }} {{ setBoardNameCheck(2) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 3">
      {{ setBoardCheck(0) }} {{ setTypeCheck(3) }} {{ setBoardNameCheck(3) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 4">
      {{ setBoardCheck(0) }} {{ setTypeCheck(4) }} {{ setBoardNameCheck(4) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 0">
      {{ setBoardCheck(1) }} {{ setTypeCheck(0) }} {{ setBoardNameCheck(5) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 1">
      {{ setBoardCheck(1) }} {{ setTypeCheck(1) }} {{ setBoardNameCheck(6) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 2">
      {{ setBoardCheck(1) }} {{ setTypeCheck(2) }} {{ setBoardNameCheck(7) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 3">
      {{ setBoardCheck(1) }} {{ setTypeCheck(3) }} {{ setBoardNameCheck(8) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 4">
      {{ setBoardCheck(1) }} {{ setTypeCheck(4) }} {{ setBoardNameCheck(9) }}
    </div>
  </div>

  <v-app>
    <v-main>
      <v-container>
        <v-row
          justify="center"
          class="mt-2"
        >
          <v-sheet :width="900">
            <v-row>
              <v-col
                cols="auto"
                class="mt-1"
              >
                <v-img
                  :width="30"
                  height="30"
                  src="../img/board_write.png"
                />
              </v-col>
              <v-col
                cols="2"
                class="mt-1"
              >
                <p class="font-weight-bold text-h5">
                  {{ boardName[boardNameCheck] }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <div v-if="boardCheck === 0 && typeCheck !== 0">
                <v-col cols="auto">
                  <v-menu>
                    <template #activator="{ props }">
                      <v-btn
                        style="height: 55px; color:#A9A9A9"
                        v-bind="props"
                        variant="outlined"
                      >
                        <p style="font-size:16px; color:black">
                          {{ category[categoryCheck] }} ▽
                        </p>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item style="text-align: center;">
                        <v-list-item-title
                          class="my-2"
                          @click="categoryCheck = 0"
                        >
                          잡담
                        </v-list-item-title>
                        <v-divider
                          :thickness="1"
                          class="border-opacity-25 mb-2"
                        />
                        <v-list-item-title
                          class="my-2"
                          @click="categoryCheck = 1"
                        >
                          식당
                        </v-list-item-title>
                        <v-divider
                          :thickness="1"
                          class="border-opacity-25 mb-2"
                        />
                        <v-list-item-title
                          class="my-2"
                          @click="categoryCheck = 2"
                        >
                          오락
                        </v-list-item-title>
                        <v-divider
                          :thickness="1"
                          class="border-opacity-25 mb-2"
                        />
                        <v-list-item-title
                          class="my-2"
                          @click="categoryCheck = 3"
                        >
                          만남
                        </v-list-item-title>
                        <v-divider
                          :thickness="1"
                          class="border-opacity-25 mb-2"
                        />
                        <v-list-item-title
                          class="my-2"
                          @click="categoryCheck = 4"
                        >
                          거래
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </div>
              <v-col>
                <v-text-field
                  v-model="title"
                  variant="outlined"
                  placeholder="제목을 입력해주세요"
                />
              </v-col>
            </v-row>
            <v-textarea
              v-model="content"
              class="no-resize"
              rows="20"
              variant="outlined"
              placeholder="- 게시판 카테고리에 맞지 않는 글은 숨김 처리 될수도 있음을 알려드립니다.
  - 다른 유저로 부터 일정 수 이상의 신고를 받으면 글은 숨김 처리 될수도 있음을 알려드립니다.
  - 욕설이나 시비, 분쟁과 관련된 글과 불쾌감을 주는 글은 규칙 위반입니다.
  - 범죄, 불법 행위의 글과 음란물과 관련한 글은 규칙 위반입니다.
  - 매너있는 게시판 이용 부탁드립니다."
            />

            <div>
              <!--<input type="file" ref="fileInput" v-on:change="previewImage">-->
              <v-row>
                <v-col cols="7">
                  <v-file-input
                    ref="fileInput"
                    multiple
                    variant="outlined"
                    prepend-icon="mdi-camera"
                    accept="video/*,image/*"
                    label="이미지를 첨부하세요"
                    @change="previewImage"
                  />
                </v-col>
                <v-col align="end">
                  <v-btn
                    style="height:55px; width: 100px;"
                    class="mr-5"
                    @click="cancle"
                  >
                    <div style="font-size:16px">
                      취소
                    </div>
                  </v-btn>
                  <v-btn
                    style="height:55px; width: 100px;"
                    variant="flat"
                    color="#5E913B"
                    class="font-weight-bold"
                    @click="writeCheck === 1 ? update() : write()"
                  >
                    <div
                      class="text-white"
                      style="font-size:16px"
                    >
                      글 등록
                    </div>
                  </v-btn>
                </v-col>
              </v-row>

              <v-sheet
                v-if="imageCheck !== 0"
                border
                width="900"
                style="border-color:#B0B0B0; border-radius: 5px;"
              >
                <v-row>
                  <v-col
                    v-for="(url, index) in imageUrl"
                    :key="index"
                    cols="auto"
                    align="center"
                  >
                    <v-col justify="center">
                      <v-sheet
                        border
                        width="136"
                        style="border-color:#B0B0B0; border-radius: 5px;"
                      >
                        <v-img
                          :src="url"
                          height="100"
                          width="100"
                          class="mt-1"
                        />
                        <v-btn
                          class="my-1"
                          variant="text"
                          @click="deleteImage(index)"
                        >
                          이미지 삭제
                        </v-btn>
                      </v-sheet>
                    </v-col>
                  </v-col>
                </v-row>
                <p
                  align="center"
                  class="my-1"
                  style="color:#A9A9A9"
                >
                  이미지는 최대 10개 까지 업로드 할 수 있습니다.
                </p>
              </v-sheet>
            </div>
          </v-sheet>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <AppFooter />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostWriteView',
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],

      boards: ['region', 'independent'],
      regions: ['ALL', 'SEOUL', 'PUSAN', 'ULSAN', 'KYEONGNAM'],
      regionsPost: ['FREE', 'TALK', 'RESTAURANT', 'PLAY', 'MEET', 'MARKET'],
      independents: ['CLEAN', 'WASH', 'COOK', 'HEALTH', 'ETC'],

      boardName: ['자유게시판', '서울 이야기', '부산 이야기', '울산 이야기', '경남 이야기', '청소 정보', '세탁 정보', '요리 정보', '건강 정보', '기타 정보'],
      category: ['잡담', '식당', '오락', '만남', '거래'],

      title: '',
      content: '',

      boardCheck: 0,
      categoryCheck: 0,
      boardNameCheck: 0,
      typeCheck: 0,
      imageCheck: 0,

      imageUrl: [],
      imageFiles: [],
      limit: 10,

      writeCheck: 0,
      updatePostId: 0,

      
      showLocationAuthentication: false,
      userNickName: '',
      boolAuthentication: false,
      searchCondition: 0,
      searchKeyword: '',

      searchText: '', // 검색어를 저장하는 데이터 속성
      error: false, // 로딩 상태를 나타내는 데이터 속성
    }
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  mounted() {
    if (this.boardCheck === 0) {
      this.active_tab = 1
    } else if (this.boardCheck === 1) {
      this.active_tab = 2
    }

    const data = this.$route.query.data;
    const postId = this.$route.query.postId;
    if (data && typeof data === 'string' && postId) {
      this.writeCheck = 1;
      const parsedData = JSON.parse(data);
      this.title = parsedData.title;
      this.content = parsedData.content;
      this.updatePostId = postId;
      // ... (다른 필드에도 바인딩)
    } else {
      this.writeCheck = 0;
      console.log('글쓰기');
    }

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
    setBoardCheck(value) {
      this.boardCheck = value;
    },
    setTypeCheck(value) {
      this.typeCheck = value;
    },
    setBoardNameCheck(value) {
      this.boardNameCheck = value;
    },
    previewImage() {
      const files = this.$refs.fileInput.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
          if (this.imageFiles.length < this.limit) { // 이미지 파일 제한 개수 체크
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              this.imageUrl.push(reader.result)
              this.imageFiles.push(file)
              this.imageCheck = this.imageCheck + 1
            }
          }
        }
      }
    },
    write() {
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('content', this.content)

      if (this.boardCheck === 0) {
        formData.append('regionType', this.regions[this.typeCheck])
        if (this.typeCheck === 0) {
          formData.append('regionPostType', this.regionsPost[0])
        } else {
          formData.append('regionPostType', this.regionsPost[this.categoryCheck + 1])
        }
      } else if (this.boardCheck === 1) {
        formData.append('independentPostType', this.independents[this.typeCheck])
      }

      for (let i = 0; i < this.imageFiles.length; i++) {
        formData.append('files', this.imageFiles[i])
      }

      if (this.boardCheck === 0) {
        const url = `/api/posts/region/new`;
        this.$axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: this.$store.state.token } })
          .then(res => {
            console.log(res.data);
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.boardCheck === 1) {

        const url = `/api/posts/independent/new`;
        this.$axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: this.$store.state.token } })
          .then(res => {
            console.log(res.data);
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    update() {
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('content', this.content)

      if (this.boardCheck === 0) {
        formData.append('regionType', this.regions[this.typeCheck])
        if (this.typeCheck === 0) {
          formData.append('regionPostType', this.regionsPost[0])
        } else {
          formData.append('regionPostType', this.regionsPost[this.categoryCheck + 1])
        }
      } else if (this.boardCheck === 1) {
        formData.append('independentPostType', this.independents[this.typeCheck])
      }

      for (let i = 0; i < this.imageFiles.length; i++) {
        formData.append('files', this.imageFiles[i])
      }
      const url = `/api/posts/${this.updatePostId}`;
      if (this.boardCheck === 0) {
        this.$axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: this.$store.state.token } })
          .then(res => {
            console.log(res.data);
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.boardCheck === 1) {
        this.$axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: this.$store.state.token } })
          .then(res => {
            console.log(res.data);
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    deleteImage(index) {
      this.imageUrl.splice(index, 1)
      this.imageFiles.splice(index, 1)
      this.imageCheck -= 1
    },
    cancle() {
      this.$router.go(-1)
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

<style>
.no-resize ::-webkit-resizer {
  display: none;
  resize: none;
}
</style>
