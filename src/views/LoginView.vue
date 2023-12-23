<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="mt-15">
          <v-col cols="5"></v-col>
          <v-col cols="2">
            <v-img :width="1000" src="../img/logo.png"></v-img>
          </v-col>
          <v-col cols="5"></v-col>
        </v-row>

        <v-row class="mt-3">
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-divider :thickness="2" class="border-opacity-25 my-5"></v-divider>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>

        <v-row class="mt-3">
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-row>
              <v-col>
                <div style="font-size: 20px">아이디</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="username" placeholder="ID" variant="outlined"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div style="font-size: 20px">비밀번호</div>
              </v-col>
            </v-row>
            <v-row class="mb-5">
              <v-col>
                <v-text-field v-model="password" type="password" placeholder="password" variant="outlined"></v-text-field>
              </v-col>
            </v-row>

            <v-row class="mt-10 mb-5">
              <v-col align="center">
                <v-btn @click="login()" style="height: 60px; width: 5000px" variant="flat" color="#6DA945" class="font-weight-bold">
                  <div class="text-white" style="font-size: 20px">로그인</div>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-container class="mt-5">
          <v-row justify="center" align="center" class="mb-5">
            <div class="font-weight-bold mt-5" style="color: gray; font-size: 20px">SNS로 로그인 하기</div>
          </v-row>
          <v-row justify="center" class="mb-5">
            <v-col cols="1">
              <a :href="`${domain}/oauth2/authorization/naver?redirect_uri=${domain}/redirect`">
                <v-img :height="75" src="../img/naver.png"></v-img>
              </a>
            </v-col>
            <v-col cols="1">
              <a :href="`${domain}/oauth2/authorization/kakao?redirect_uri=${domain}/redirect`">
                <v-img :height="75" src="../img/kakaoTalk.png"></v-img>
              </a>
            </v-col>
          </v-row>
        </v-container>

        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-divider :thickness="2" class="border-opacity-25"></v-divider>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>

        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6" align="end">
            <v-row style="color: #5e913b">
              <v-col cols="5"></v-col>
              <v-col>
                <div>회원가입</div>
              </v-col>
              <v-col>
                <div>아이디찾기</div>
              </v-col>
              <v-col>
                <div>비밀번호찾기</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>

        <!-- <a href="http://192.168.0.18:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3001/oauth/redirect">asdads</a> -->
      </v-container>
    </v-main>
  </v-app>

  <!--푸터-->
  <v-footer border class="mt-5">
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
            <v-row class="text-grey-lighten-2" style="font-size: 12px" justify="center">
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],
      username: '',
      password: '',
      domain: 'http://3.34.134.198:8080'
    };
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    ...mapActions(['saveToken']),
    login() {
      const credentials = {
        username: this.username,
        password: this.password
      };

      this.$axios
        .post('/api/member/login', credentials)
        .then((response) => {
          const token = response.headers.authorization;
          this.saveToken(token); // 토큰 값을 Vuex 스토어에 저장
          this.$router.go(-1);
          // 로그인 성공 후에 리다이렉트 또는 다른 동작 수행
        })
        .catch((error) => {
          // 로그인 실패 처리
          alert('로그인에 실패하였습니다.');
          console.error(error);
        });
    },
    naver() {
      const url = '/api/oauth2/authorization/naver';
      this.$axios
        .get(url)
        .then((response) => {
          const authCookie = response.headers.oauth2_auth_request;
          const urlCookie = response.headers.redirect_uri;

          this.saveAuthCookie(authCookie); // 인증 쿠키 값을 Vuex 스토어에 저장
          this.saveUrlCookie(urlCookie); // URL 쿠키 값을 Vuex 스토어에 저장

          console.log(authCookie);
          console.log(urlCookie);
          this.$router.go(-1);
        })
        .catch((error) => {
          alert('로그인에 실패하였습니다.');
          console.error(error);
        });
    }
  }
};
</script>
