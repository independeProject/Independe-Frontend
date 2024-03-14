<script setup>
import SqueezeImgBtn from '../components/SqueezeImgBtn.vue';
</script>
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="end">
          <v-col cols="11">
            <div
              v-if="Board.independentPostType === null"
              class="mt-5"
            >
              <v-row>
                <v-col cols="auto">
                  <router-link
                    :to="{ name: 'BoardView', params: { regionType: Board.regionTypeEn, regionPostType: Board.regionPostTypeEn } }"
                    style="text-decoration: none; font-size:18px"
                  >
                    <div
                      class="text-black"
                      @click="$store.state.boardCheck = regionsAPI.indexOf(Board.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(Board.regionPostTypeEn)"
                    >
                      지역 {{ Board.regionType }}
                    </div>
                  </router-link>
                </v-col>
                <v-col cols="auto">
                  <div class="mx-3">
                    >
                  </div>
                </v-col>
                <v-col cols="auto">
                  <router-link
                    :to="{ name: 'BoardView', params: { regionType: Board.regionTypeEn, regionPostType: Board.regionPostTypeEn } }"
                    style="text-decoration: none; font-size:18px"
                  >
                    <div
                      class="text-black"
                      @click="$store.state.boardCheck = regionsAPI.indexOf(Board.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(Board.regionPostTypeEn)"
                    >
                      {{ Board.regionPostType }}
                    </div>
                  </router-link>
                </v-col>
              </v-row>
            </div>
            <div
              v-else
              class="mt-5"
            >
              <v-row>
                <v-col cols="auto">
                  <router-link
                    :to="{ name: 'IndependentView', params: { independentType: 'Board.independentPostTypeEn' } }"
                    style="text-decoration: none; font-size:18px"
                  >
                    <div
                      class="text-black"
                      @click="$store.state.independentCheck = independentsAPI.indexOf(Board.independentPostTypeEn)"
                    >
                      자취 정보
                    </div>
                  </router-link>
                </v-col>
                <v-col cols="auto">
                  <div class="mx-3">
                    >
                  </div>
                </v-col>
                <v-col cols="auto">
                  <router-link
                    :to="{ name: 'IndependentView', params: { independentType: 'Board.independentPostTypeEn' } }"
                    style="text-decoration: none; font-size:18px"
                  >
                    <div
                      class="text-black"
                      @click="$store.state.independentCheck = independentsAPI.indexOf(Board.independentPostTypeEn)"
                    >
                      {{ Board.independentPostType }}
                    </div>
                  </router-link>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col
            cols="auto"
            align="end"
          >
            <v-row align="end">
              <v-snackbar :timeout="1000">
                <template #activator="{ props }">
                  <v-img
                    v-bind="props"
                    class="ml-5"
                    width="23"
                    height="23"
                    src="../img/link_copy.png"
                    :style="{ cursor: 'pointer' }"
                    @click="copyUrl"
                  />
                </template>
                <div align="center">
                  클립보드에 복사되었습니다.
                </div>
              </v-snackbar>

              <v-img
                class="ml-5"
                width="23"
                height="23"
                src="../img/scrap_default.png"
                :style="{ cursor: 'pointer' }"
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row align="end">
          <v-col cols="10">
            <div class="text-h4">
              {{ Board.title }}
            </div>
          </v-col>
          <v-col align="end">
            <div>
              {{ $filter.formatYear(Board.createdDate) }}-{{ $filter.formatDate(Board.createdDate) }}
              {{ $filter.formatTime(Board.createdDate) }}
            </div>
          </v-col>
        </v-row>
        <v-spacer />
        <v-row>
          <v-col cols="3">
            <div>작성자 : {{ Board.nickname }}</div>
          </v-col>
          <v-col
            cols="9"
            align="end"
          >
            <div style="font-size:14px">
              조회수 : {{ Board.views }}&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;추천수 : {{
                Board.recommendCount }}&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; 댓글수 : {{ Board.commentCount }}
            </div>
          </v-col>
        </v-row>

        <v-divider
          :thickness="1"
          class="border-opacity-25 mt-7"
          length="1180"
        />

        <v-row>
          <v-col>
            <div
              v-for="(imageUrl, index) in imageUrls"
              :key="index"
            >
              <v-row>
                <v-col class="text-center">
                  <img
                    :src="imageUrl"
                    alt="image"
                    style="max-width: 100%;"
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div id="content">
              {{ Board.content }}
            </div>
          </v-col>
        </v-row>
        <v-row
          class="mt-15"
          align="center"
        >
          <v-col
            cols="auto"
            class="ml-3"
          >
            <v-row>
              <SqueezeImgBtn 
                :image-url-default="thumbsUpUrl" 
                :on-click-img="postRecommend" 
              />
              <div
                class="ml-2 mt-1"
                style="font-size:18px;"
              >
                {{ Board.recommendCount }}
              </div>
            </v-row>
          </v-col>
          <v-col
            cols="auto"
            class="ml-5"
          >
            <v-row>
              <v-img
                src="../img/post_comment.png"
                width="30"
                height="30"
              />
              <div
                class="ml-2 mt-1"
                style="font-size:18px;"
              >
                {{ Board.commentCount }}
              </div>
            </v-row>
          </v-col>
          <v-col
            cols="auto"
            class="ml-auto"
          >
            <v-img
              src="../img/post_report_default.png"
              width="35"
              height="35"
              :style="{ cursor: 'pointer' }"
              @click="report()"
            />
          </v-col>
        </v-row>

        <v-divider
          :thickness="1"
          class="border-opacity-25 my-7"
          length="1180"
        />

        <v-row>
          <v-col>
            <div style="font-size:16; font-weight:bold">
              댓글수 {{ Board.commentCount }}개
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="11">
            <v-textarea
              v-model="inputComment"
              rows="2"
              class="no-resize"
              variant="outlined"
              placeholder="댓글을 작성해 보세요."
            />
          </v-col>
          <v-col>
            <v-btn
              variant="outlined"
              style="height:80px; width:75px; color:#ADADAD"
              @click="commentPost"
            >
              등록
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="userNickName === Board.nickname"
          class="mb-5"
        >
          <v-col align="end">
            <v-btn
              class="mr-5"
              variant="outlined"
              style="color:#ADADAD"
              @click="postDelete"
            >
              <div style="color:gray">
                삭제
              </div>
            </v-btn>
            <v-btn
              variant="outlined"
              style="color:#ADADAD"
              @click="postUpdate"
            >
              <div style="color:gray">
                수정
              </div>
            </v-btn>
          </v-col>
        </v-row>

        <!-- <v-row>
          <v-col cols="auto" class="mb-3">
            <v-row>
              <v-img class="ml-3" src="../img/bestCommend.png" width="30" height="30"></v-img>
              <div class="mt-1 ml-1" style="font-size:16; font-weight:bold">베스트댓글</div>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mb-5">
          <v-col>
            <v-sheet class="text-black" color="#F6FAF4" v-if="bestComment !== null">
              <v-row>
                <v-col cols="auto" style="color:gray">
                  <p :key="index" v-for="(bestComment, index) in Board.bestComment">
                    &nbsp;{{ bestComment.nickname }}
                  </p>
                </v-col>
                <v-col style="color:gray" cols="auto">
                  <div :key="index" v-for="(bestComment, index) in Board.bestComment">
                    {{ $filter.formatDate(bestComment.createdDate) }} {{ $filter.formatTime(bestComment.createdDate) }}
                  </div>
                </v-col>
                <v-col style="color:gray" cols="auto">
                  <div :key="index" v-for="(bestComment, index) in Board.bestComment">
                    추천수 {{ bestComment.recommendCount }}
                  </div>
                </v-col>
                <v-col cols="auto" class="ml-auto mr-2">
                  <v-row>
                    <v-img @click="commentRecommend(comment.commentId)" class="mt-3 mr-3"
                      src="../img/comment_recommend.png" width="20" height="20" :style="{ cursor: 'pointer' }"></v-img>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mt-1">
                <v-col>
                  <p :key="index" v-for="(bestComment, index) in Board.bestComment">
                    &nbsp;{{ bestComment.content }}
                  </p>
                </v-col>
              </v-row>
            </v-sheet>
            <v-sheet class="text-black" color="#F6FAF4" v-else>
              <v-row>
                <v-col>
                  <div>베스트 댓글이 없습니다.</div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row> -->

        <div>
          <div
            v-for="comment in Board.comments"
            :key="comment.commentId"
          >
            <div v-if="comment.parentId === null">
              <v-divider
                :thickness="1"
                class="border-opacity-25 my-3"
                length="1180"
                style="border-color:lightslategray"
              />
              <v-row>
                <v-col
                  cols="auto"
                  style="color:gray"
                >
                  <router-link
                    :to="`/chat/${comment.writerId}`"
                    style="text-decoration: none; color:gray;"
                  >
                    &nbsp;{{ comment.nickname }}
                  </router-link>
                </v-col>
                <v-col
                  style="color:gray"
                  cols="auto"
                >
                  {{ $filter.formatDate(comment.createdDate) }} {{ $filter.formatTime(comment.createdDate) }}
                </v-col>
                <v-col
                  style="color:gray"
                  cols="auto"
                >
                  <div style="color:gray">
                    추천수 {{ comment.recommendCount }}
                  </div>
                </v-col>
                <v-col
                  cols="auto"
                  class="ml-auto"
                >
                  <v-row>
                    <v-img
                      class="mt-3 mr-5"
                      src="../img/comment_recommend.png"
                      width="20"
                      height="20"
                      :style="{ cursor: 'pointer' }"
                      @click="commentRecommend(comment.commentId)"
                    />
                    <v-img
                      class="mt-3 mr-5"
                      src="../img/recomment.png"
                      width="21"
                      height="21"
                      :style="{ cursor: 'pointer' }"
                      @click="toggleReply(comment.commentId)"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mt-1">
                <v-col>
                  &nbsp;{{ comment.content }}
                </v-col>
              </v-row>
            </div>
            <!-- 댓글에 대한 대댓글 표시 -->
            <div
              v-for="reply in getReplies(comment.commentId)"
              :key="reply.commentId"
            >
              <v-sheet
                class="text-black"
                color="#F7F7F7"
                :width="1170"
              >
                <v-divider
                  :thickness="1"
                  class="border-opacity-25 my-3"
                  length="1180"
                  style="border-color:lightslategray;"
                />
                <v-row>
                  <v-col
                    cols="auto"
                    style="color:gray"
                  >
                    <router-link
                      :to="`/chat/${reply.writerId}`"
                      style="text-decoration: none; color:gray;"
                    >
                      &emsp;&emsp;ㄴ{{ reply.nickname }}
                    </router-link>
                  </v-col>
                  <v-col
                    style="color:gray"
                    cols="auto"
                  >
                    {{ $filter.formatDate(reply.createdDate) }} {{ $filter.formatTime(reply.createdDate) }}
                  </v-col>
                  <v-col
                    style="color:gray"
                    cols="auto"
                  >
                    <div style="color:gray">
                      추천수 {{ reply.recommendCount }}
                    </div>
                  </v-col>
                  <v-col
                    cols="auto"
                    class="ml-auto"
                  >
                    <v-row>
                      <v-img
                        class="mt-3 mr-5"
                        src="../img/comment_recommend.png"
                        width="20"
                        height="20"
                        :style="{ cursor: 'pointer' }"
                        @click="commentRecommend(reply.commentId)"
                      />
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="mt-1">
                  <v-col>
                    &emsp;&emsp;{{ reply.content }}
                  </v-col>
                </v-row>
              </v-sheet>
            </div>

            <!-- <div v-if="recommendCheck === true">
              <v-row class="mt-10">
                <v-col cols="11">
                  <v-textarea rows="1" class="no-resize" variant="outlined" placeholder="대댓글을 작성해 보세요."></v-textarea>
                </v-col>
                <v-col>
                  <v-btn variant="outlined" style="height:57px; width:75px; color:#ADADAD">등록</v-btn>
                </v-col>
              </v-row>
            </div>
          </div> -->
            <div v-if="showReply[comment.commentId]">
              <div>
                <v-row class="mt-10">
                  <v-col cols="11">
                    <v-textarea
                      v-model="recomment"
                      rows="1"
                      class="no-resize"
                      variant="outlined"
                      placeholder="대댓글을 작성해 보세요."
                    />
                  </v-col>
                  <v-col>
                    <v-btn
                      variant="outlined"
                      style="height:57px; width:75px; color:#ADADAD"
                      @click="recommentPost(comment)"
                    >
                      등록
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAddr } from '../utils';

export default {
  name: 'PostView',
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],

      Board: [],
      bestComment: [],
      imageUrls: [],
      recommendCheck: false,
      showCopyText: false,
      showReply: {},
      independentsAPI: ["CLEAN", 'WASH', 'COOK', 'HEALTH', 'ETC'],
      regionsAPI: ["ALL", 'SEOUL', 'PUSAN', 'ULSAN', 'KYEONGNAM'],
      regionCategoryAPI: ["FREE", 'TALK', 'RESTAURANT', 'PLAY', 'MEET', 'MARKET'],

      showLocationAuthentication: false,
      userNickName: '',
      boolAuthentication: false,

      commentWritePossible: false,
      boardType: '',

      searchText: '', // 검색어를 저장하는 데이터 속성
      error: false, // 로딩 상태를 나타내는 데이터 속성

      inputComment: "",
      recomment: "",

      thumbsUpUrl: "../img/post_recommend_default.png",
      thumbsUpUrlClicked: "../img/post_recommend_select.png",
    }
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  mounted() {
    this.read();
    this.files();
    
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
    files() {
      const path = this.$route.path;
      const pathSegments = path.split('/');
      const postId = parseInt(pathSegments[2]);

      const url = `/api/files/${postId}`;

      this.$axios.get(url, {  
        headers: {
          Authorization: this.$store.state.token, // 헤더에 토큰 추가
        },
      })
        .then((res) => {

          const base64ImageDataArray = res.data.files;
          const imageUrls = [];

          base64ImageDataArray.forEach((base64ImageData) => {
            const byteCharacters = atob(base64ImageData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });

            const imageUrl = URL.createObjectURL(blob);
            imageUrls.push(imageUrl);
          });

          this.imageUrls = imageUrls;
        })
        .catch(err => console.error(err))
    },
    read() {
      const path = this.$route.path;
      const pathSegments = path.split('/');
      const postId = parseInt(pathSegments[2]);

      const url = `/api/posts/${postId}`;
      //const url = 'https://ba9fe6f7-8331-4cd6-bd3e-1323d53d8567.mock.pstmn.io/post'

      this.$axios.get(url, {
        headers: {
          Authorization: this.$store.state.token, // 헤더에 토큰 추가
        },
      })
        .then((res) => {
          this.Board = res.data.data
          this.bestComment = res.data.data.bestComment
          console.log(res.data)
        })
        .catch(err => console.error(err))
    },
    postDelete() {
      const path = this.$route.path;
      const pathSegments = path.split('/');
      const postId = parseInt(pathSegments[2]);

      this.boardType = `/api/posts/${postId}`;

      const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

      if (confirmDelete) {
        this.$axios
          .delete(this.boardType)
          .then(() => {
            // 성공적으로 삭제되었을 때 수행할 작업
            alert("삭제되었습니다.");
          })
          .catch((error) => {
            // 삭제 중 오류가 발생했을 때 수행할 작업
            alert('삭제 실패하였습니다.')
            console.log(error);
          });
      }
    },
    postUpdate() {
      const path = this.$route.path;
      const pathSegments = path.split('/');
      const postId = parseInt(pathSegments[2]);
      this.$router.push({ path: '/PostWrite', query: { data: JSON.stringify(this.Board), postId: postId }});
    },
    commentPost() {
      if(this.Board.regionType !== "전체" &&
        this.Board.regionType !== this.$store.state.currentLocation) {
        alert('해당 지역에서만 댓글을 작성할 수 있습니다.\n' + 
          `${this.$store.state.locationAuthentication ? this.$store.state.currentLocation + '지역에서 작성해주세요.'
            : '위치를 우선 인증해주세요.'}`);
        return;
      }

      const path = this.$route.path;
      const pathSegments = path.split('/');
      const postId = parseInt(pathSegments[2]);

      const url = `/api/comments/parent/new`;

      this.$axios.post(url, { postId: postId, content: this.inputComment }, {
        headers: {
          Authorization: this.$store.state.token, // 헤더에 토큰 추가
        },
      })
        .then(res => {
          console.log(res)
          window.location.reload(); // 요청이 성공하면 새로고침
        })
        .catch(error => {
          alert('작성에 실패하였습니다.')
          console.log(error);
        });
    },
    postRecommend() {
      const path = this.$route.path;
      const pathSegments = path.split('/');
      const postId = parseInt(pathSegments[2]);

      const url = `/api/recommendPost/${postId}`;

      this.$axios.post(url, { postId: postId }, {
        headers: {
          Authorization: this.$store.state.token, // 헤더에 토큰 추가
        },
      })
        .then(() => {
          this.read();
          // console.log(res)
          // window.location.reload(); // 요청이 성공하면 새로고침
        })
        .catch(error => {
          alert('추천에 실패하였습니다.')
          console.log(error);
        });
    },
    commentRecommend(commentId) {
      const url = `/api/recommendComment/${commentId}`;

      this.$axios.post(url, { commentId: commentId }, {
        headers: {
          Authorization: this.$store.state.token, // 헤더에 토큰 추가
        },
      })
        .then(() => {
          this.read();
        })
        .catch(error => {
          alert('추천에 실패하였습니다.')
          console.log(error);
        });
    },
    recommentPost(comment) {
      if(this.Board.regionType !== "전체" &&
        this.Board.regionType !== this.$store.state.currentLocation) {
        alert('해당 지역에서만 댓글을 작성할 수 있습니다.\n' + 
          `${this.$store.state.locationAuthentication ? this.$store.state.currentLocation + '지역에서 작성해주세요.'
            : '위치를 우선 인증해주세요.'}`);
        return;
      }

      const path = this.$route.path;
      const pathSegments = path.split('/');
      const postId = parseInt(pathSegments[2]);

      const url = `/api/comments/child/new`;

      const savedCommentId = comment.commentId;

      this.$axios.post(url, { postId: postId, content: this.recomment, parentId: savedCommentId }, {
        headers: {
          Authorization: this.$store.state.token, // 헤더에 토큰 추가
        },
      })
        .then(() => {
          this.read();
        })
        .catch(error => {
          alert('작성에 실패하였습니다.')
          console.log(error);
        });
    },
    copyUrl() {
      const url = window.location.href;
      const tempInput = document.createElement('input');
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    },
    getReplies(parentId) {
      // parentId와 일치하는 대댓글만 반환
      return this.Board.comments.filter(comment => comment.parentId === parentId);
    },
    recommend() {
      this.recommendCheck = !this.recommendCheck;
    },
    report() {
      const path = this.$route.path;
      const pathSegments = path.split('/');
      const postId = parseInt(pathSegments[2]);

      const confirmReport = window.confirm("정말로 신고하시겠습니까?");
      if (confirmReport) {
        const url = `/api/reportPost/${postId}`;

        this.$axios.post(url, { postId: postId }, {
          headers: {
            Authorization: this.$store.state.token, // 헤더에 토큰 추가
          },
        })
          .then(res => {
            window.alert("신고되었습니다.");
            console.log(res);
          })
          .catch(error => {
            alert('신고에 실패하였습니다.')
            console.log(error);
          });
      }
    },
    toggleReply(commentId) {
      if (this.showReply[commentId] === undefined) {
        this.showReply = Object.assign({}, this.showReply, { [commentId]: true });
      } else {
        this.showReply = Object.assign({}, this.showReply, { [commentId]: !this.showReply[commentId] });
      }
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
    },
  }
}   
</script>

<style>
#content {
  white-space: pre-line;
}

.no-resize ::-webkit-resizer {
  display: none;
  resize: none;
}
</style>
