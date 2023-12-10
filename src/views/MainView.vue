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
        <!-- 오늘의 멘트 -->
        <v-row>
          <v-col cols="12" class="my-1">
            <h1 class="text-center my-2 font-weight-bold" style="color:#5E913B">Daily TIP</h1>
            <v-card variant="outlined" style="border-width:2px;" class="rounded-pill">
              <v-card-text>
                <div align="center" class="font-weight-bold text-h6">{{ todayMent }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="my-10">
          <!--인기 게시판-->
          <v-col cols="auto">
            <v-row>
              <v-col cols="auto">
                <v-img :width="35" height="45" src="../img/main_hot_board.png"></v-img>
              </v-col>
              <h2 class="font-weight-bold my-5" style="color:#5E913B">HOT 게시판</h2>
            </v-row>

            <v-sheet :height="405" :width="850" class="my-2">
              <v-divider :thickness="2" class="border-opacity-25 mb-2" length="810"></v-divider>
              <v-row>
                <v-col cols="auto">
                  <v-list v-for="popularBoard in popularBoard" :key="popularBoard">
                    <div v-if="popularBoard.independentPostType === null">
                      <router-link
                        :to="{ name: 'BoardView', params: { regionType: popularBoard.regionTypeEn, regionPostType: popularBoard.regionPostTypeEn } }"
                        style="text-decoration: none;">
                        <p @click="$store.state.boardCheck = regionsAPI.indexOf(popularBoard.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(popularBoard.regionPostTypeEn)"
                          class="text-grey-darken-1">[{{ popularBoard.regionType }}·{{ popularBoard.regionPostType }}]</p>
                      </router-link>
                    </div>
                    <div v-else>
                      <router-link
                        :to="{ name: 'IndependentView', params: { independentType: popularBoard.independentPostTypeEn } }"
                        style="text-decoration: none;">
                        <p @click="$store.state.independentCheck = independentsAPI.indexOf(popularBoard.independentPostTypeEn)"
                          class="text-grey-darken-1">[자취·{{ popularBoard.independentPostType }}]</p>
                      </router-link>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="6">
                  <v-list v-for="popularBoard in popularBoard" :key="popularBoard">
                    <div v-if="popularBoard.title.length <= 23">
                      <v-img style="float:left" v-if="popularBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <router-link :to="{ name: 'PostView', params: { postId: popularBoard.postId } }"
                        style="text-decoration: none; color:black;">
                        {{ popularBoard.title }}
                      </router-link>
                    </div>
                    <div v-else>
                      <v-img style="float:left" v-if="popularBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <router-link :to="{ name: 'PostView', params: { postId: popularBoard.postId } }"
                        style="text-decoration: none; color:black;">
                        <p>{{ popularBoard.title.substr(0, 23) }}...</p>
                      </router-link>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="4" class="mx-4">
                  <v-list v-for="popularBoard in popularBoard" :key="popularBoard" style="overflow:hidden">
                    <v-row>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ popularBoard.commentCount }}</p>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ popularBoard.recommendCount }}</p>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/viewIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ popularBoard.views }}</p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>

          <!--실시간 검색어-->
          <v-col cols="auto">
            <v-sheet :height="430" :width="290" color="grey-lighten-5" class="mt-13">
              <v-row>
                <v-col cols="1"></v-col>
                <p class="font-weight-black pt-2">실시간 인기 검색어</p>
              </v-row>
              <v-row class="mx-1">
                <v-col cols="auto">
                  <v-list v-for="(topSearch, index) in topSearch" :key="index" style="background-color: #FAFAFA;">
                    <p class="text-subtitle-2">{{ index + 1 }}</p>
                  </v-list>
                </v-col>
                <v-col cols="7">
                  <v-list v-for="topSearch in topSearch" :key="topSearch"
                    style="background-color: #FAFAFA; text-emphasis-color: #FFFFFF;">
                    <div v-if="topSearch.keyword.length <= 9">
                      <p class="text-subtitle-2">{{ topSearch.keyword }}</p>
                    </div>
                    <div v-else>
                      <p class="text-subtitle-2">{{ topSearch.keyword.substr(0, 9) }}...</p>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="3">
                  <v-list v-for="(topSearch, index) in topSearch" :key="index" style="background-color: #FAFAFA;">
                    <div>
                      <div v-if="topSearch.keywordCount >= 10000">
                        <div v-if="index === 0">
                          <p class="text-subtitle-2" style="color:#D50000;">{{
                            topSearch.keywordCount.toPrecision(3) / 1000 }}K</p>
                        </div>
                        <div v-else>
                          <p class="text-subtitle-2">{{ topSearch.keywordCount.toPrecision(3) / 1000 }}K</p>
                        </div>
                      </div>
                      <div v-else>
                        <div v-if="index === 0">
                          <p class="text-subtitle-2" style="color:#D50000;">{{ topSearch.keywordCount }}</p>
                        </div>
                        <div v-else>
                          <p class="text-subtitle-2">{{ topSearch.keywordCount }}</p>
                        </div>
                      </div>
                    </div>
                  </v-list>
                </v-col>
              </v-row>

            </v-sheet>
          </v-col>
        </v-row>

        <!--실시간 자취 게시판-->
        <v-row class="mx-1">
          <v-row>
            <v-col cols="11">
              <v-row>
                <v-col cols="auto">
                  <v-img :width="35" height="45" src="../img/main_independent_board.png"></v-img>
                </v-col>
                <h2 class="font-weight-bold my-5" style="color:#5E913B">인기 자취 정보</h2>
              </v-row>
            </v-col>
            <v-col cols="1">
              <router-link :to="{ name: 'IndependentView', params: { independentType: 'CLEAN' } }"
                style="text-decoration: none;">
                <div @click="$store.state.independentCheck = 0" class="text-grey-darken-1 mt-5 text-subtitle-2">더보기 >
                </div>
              </router-link>
            </v-col>
          </v-row>
          <v-row>
            <v-sheet :height="220" :width="1160" class="mx-2">
              <v-divider :thickness="2" class="border-opacity-25 mb-2" length="1160"></v-divider>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="auto">
                      <v-list v-for="independentBoard in independentBoard.slice(0, 5)" :key="independentBoard">
                        <router-link
                          :to="{ name: 'IndependentView', params: { independentType: independentBoard.independentPostTypeEn } }"
                          style="text-decoration: none;">
                          <p @click="$store.state.independentCheck = independentsAPI.indexOf(independentBoard.independentPostTypeEn)"
                            class="text-grey-darken-1">[{{ independentBoard.independentPostType }}]</p>
                        </router-link>
                      </v-list>
                    </v-col>
                    <v-col cols="6">
                      <v-list v-for="independentBoard in independentBoard.slice(0, 5)" :key="independentBoard">
                        <div v-if="independentBoard.title.length <= 15">
                          <v-img style="float:left" v-if="independentBoard.picture === true" :width="15"
                            src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                          <router-link :to="{ name: 'PostView', params: { postId: independentBoard.postId } }"
                            style="text-decoration: none; color:black;">
                            {{ independentBoard.title }}
                          </router-link>
                        </div>
                        <div v-else>
                          <v-img style="float:left" v-if="independentBoard.picture === true" :width="15"
                            src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                          <router-link :to="{ name: 'PostView', params: { postId: independentBoard.postId } }"
                            style="text-decoration: none; color:black;">
                            <p>{{ independentBoard.title.substr(0, 15) }}...</p>
                          </router-link>
                        </div>
                      </v-list>
                    </v-col>
                    <v-col cols="4" class="mx-4">
                      <v-list v-for="independentBoard in independentBoard.slice(0, 5)" :key="independentBoard"
                        style="overflow:hidden">
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left;" :width="15" src="../img/commentIcon.png"
                                class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.commentCount }}</p>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left" :width="15" src="../img/recommendIcon.png"
                                class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.recommendCount }}</p>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="auto">
                      <v-list v-for="independentBoard in independentBoard.slice(5, 10)" :key="independentBoard">
                        <router-link
                          :to="{ name: 'IndependentView', params: { independentType: independentBoard.independentPostTypeEn } }"
                          style="text-decoration: none;">
                          <p @click="$store.state.independentCheck = independentsAPI.indexOf(independentBoard.independentPostTypeEn)"
                            class="text-grey-darken-1">[{{ independentBoard.independentPostType }}]</p>
                        </router-link>
                      </v-list>
                    </v-col>
                    <v-col cols="6">
                      <v-list v-for="independentBoard in independentBoard.slice(5, 10)" :key="independentBoard">
                        <div v-if="independentBoard.title.length <= 15">
                          <v-img style="float:left" v-if="independentBoard.picture === true" :width="15"
                            src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                          <router-link :to="{ name: 'PostView', params: { postId: independentBoard.postId } }"
                            style="text-decoration: none; color:black;">
                            {{ independentBoard.title }}
                          </router-link>
                        </div>
                        <div v-else>
                          <v-img style="float:left" v-if="independentBoard.picture === true" :width="15"
                            src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                          <router-link :to="{ name: 'PostView', params: { postId: independentBoard.postId } }"
                            style="text-decoration: none; color:black;">
                            <p>{{ independentBoard.title.substr(0, 15) }}...</p>
                          </router-link>
                        </div>
                      </v-list>
                    </v-col>
                    <v-col cols="4" class="mx-4">
                      <v-list v-for="independentBoard in independentBoard.slice(5, 10)" :key="independentBoard"
                        style="overflow:hidden">
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left;" :width="15" src="../img/commentIcon.png"
                                class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.commentCount }}</p>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left" :width="15" src="../img/recommendIcon.png"
                                class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.recommendCount }}</p>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
          </v-row>
        </v-row>

        <v-row class="my-15">
          <!--실시간 전체 게시판-->
          <v-col cols="6">
            <v-row>
              <v-col cols="10">
                <v-row>
                  <v-col cols="auto">
                    <v-img :width="35" height="45" src="../img/main_all_board.png"></v-img>
                  </v-col>
                  <h2 class="font-weight-bold my-5" style="color:#5E913B">인기 전체 게시판</h2>
                </v-row>
              </v-col>
              <v-col cols="2">
                <router-link :to="{ name: 'BoardView', params: { regionType: 'ALL', regionPostType: 'FREE' } }"
                  style="text-decoration: none;">
                  <div @click="$store.state.boardCheck = 0, $store.state.categoryCheck = 0"
                    class="mt-5 text-subtitle-2 text-grey-darken-1">더보기 ></div>
                </router-link>
              </v-col>
              <v-divider :thickness="2" class="border-opacity-25 mb-2 mx-3" length="560"></v-divider>
            </v-row>
            <v-sheet :height="220" :width="580">
              <v-row>
                <v-col cols="auto">
                  <v-list v-for="allBoard in allBoard" :key="allBoard">
                    <router-link :to="{ name: 'BoardView', params: { regionType: 'ALL', regionPostType: 'FREE' } }"
                      style="text-decoration: none;">
                      <p @click="$store.state.boardCheck = 0, $store.state.categoryCheck = 0" class="text-grey-darken-1">
                        [자유]</p>
                    </router-link>
                  </v-list>
                </v-col>
                <v-col cols="6">
                  <v-list v-for="allBoard in allBoard" :key="allBoard">
                    <div v-if="allBoard.title.length <= 15">
                      <v-img style="float:left" v-if="allBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <router-link :to="{ name: 'PostView', params: { postId: allBoard.postId } }"
                        style="text-decoration: none; color:black;">
                        {{ allBoard.title }}
                      </router-link>
                    </div>
                    <div v-else>
                      <v-img style="float:left" v-if="allBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <router-link :to="{ name: 'PostView', params: { postId: allBoard.postId } }"
                        style="text-decoration: none; color:black;">
                        <p>{{ allBoard.title.substr(0, 15) }}...</p>
                      </router-link>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="4" class="mx-4">
                  <v-list v-for="allBoard in allBoard" :key="allBoard" style="overflow:hidden">
                    <v-row>
                      <v-col cols="6">
                        <div>
                          <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ allBoard.commentCount }}</p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ allBoard.recommendCount }}</p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>

          <!--실시간 지역 게시판-->
          <v-col cols="6">
            <v-row>
              <v-col cols="10">
                <v-row>
                  <v-col cols="auto">
                    <v-img :width="35" height="45" src="../img/main_region_board.png"></v-img>
                  </v-col>
                  <h2 class="font-weight-bold my-5" style="color:#5E913B">인기 지역 게시판</h2>
                </v-row>
              </v-col>
              <v-col cols="2">
                <router-link :to="{ name: 'BoardView', params: { regionType: 'SEOUL', regionPostType: 'TALK' } }"
                  style="text-decoration: none;">
                  <div @click="$store.state.boardCheck = 1, $store.state.categoryCheck = 1"
                    class="mt-5 text-subtitle-2 text-grey-darken-1">더보기 ></div>
                </router-link>
              </v-col>
              <v-divider :thickness="2" class="border-opacity-25 mb-2 mx-3" length="560"></v-divider>
            </v-row>
            <v-sheet :height="220" :width="580">
              <v-row>
                <v-col cols="auto">
                  <v-list v-for="regionBoard in regionBoard" :key="regionBoard">
                    <router-link
                      :to="{ name: 'BoardView', params: { regionType: regionBoard.regionTypeEn, regionPostType: regionBoard.regionPostTypeEn } }"
                      style="text-decoration: none;">
                      <p @click="$store.state.boardCheck = regionsAPI.indexOf(regionBoard.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(regionBoard.regionPostTypeEn)"
                        class="text-grey-darken-1">[{{ regionBoard.regionType }}·{{ regionBoard.regionPostType }}]</p>
                    </router-link>
                  </v-list>
                </v-col>
                <v-col cols="5">
                  <v-list v-for="regionBoard in regionBoard" :key="regionBoard">
                    <div v-if="regionBoard.title.length <= 12">
                      <v-img style="float:left" v-if="regionBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <router-link :to="{ name: 'PostView', params: { postId: regionBoard.postId } }"
                        style="text-decoration: none; color:black;">
                        {{ regionBoard.title }}
                      </router-link>
                    </div>
                    <div v-else>
                      <v-img style="float:left" v-if="regionBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <router-link :to="{ name: 'PostView', params: { postId: regionBoard.postId } }"
                        style="text-decoration: none; color:black;">
                        <p>{{ regionBoard.title.substr(0, 12) }}...</p>
                      </router-link>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="4" class="ml-6">
                  <v-list v-for="regionBoard in regionBoard" :key="regionBoard" style="overflow:hidden">
                    <v-row>
                      <v-col cols="6">
                        <div>
                          <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ regionBoard.commentCount }}</p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ regionBoard.recommendCount }}</p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <!--자취 정보 영상-->
        <v-row class="my-15">
          <v-row class="mx-1">
            <v-col cols="10">
              <p class="font-weight-bold text-h4" style="color:#5E913B">자취 정보 영상</p>
            </v-col>
            <v-col cols="2">
              <div class="mt-5 text-subtitle-2 mr-4" align="end">더 많은 영상보기</div>
            </v-col>
          </v-row>
          <v-row class="px-3">
            <div v-for="video in video" :key="video" class="mx-1">
              <v-col cols="auto">
                <iframe width="360" height="195" :src="video.videoUrl" title="YouTube video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
                <div v-if="video.title.length <= 20">
                  <p class="my-1 font-weight-bold" align="center">{{ video.title }}</p>
                </div>
                <div v-else>
                  <p class="my-1 font-weight-bold" align="center">{{ video.title.substr(0, 20) }}...</p>
                </div>
              </v-col>
            </div>
          </v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

  <!--푸터-->
  <v-footer border>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MainView',
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],
      todayMent: [],
      popularBoard: [],
      independentBoard: [],
      allBoard: [],
      regionBoard: [],
      topSearch: [],
      video: [],
      independentsAPI: ["CLEAN", 'WASH', 'COOK', 'HEALTH', 'ETC'],
      regionsAPI: ["ALL", 'SEOUL', 'PUSAN', 'ULSAN', 'KYEONGNAM'],
      regionCategoryAPI: ["FREE", 'TALK', 'RESTAURANT', 'PLAY', 'MEET', 'MARKET'],

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
  methods: {
    ...mapActions(['saveToken']),
    read() {
      this.$axios.get('/api/posts/main'/*'https://9f51b12f-d360-49fc-a90e-b61d8463e86b.mock.pstmn.io/posts/main'*/, {
        headers: {
          Authorization: this.$store.state.token, // 헤더에 토큰 추가
        },
      })
        .then((res) => {
          this.todayMent = res.data.data.todayMent;
          this.popularBoard = res.data.data.popularPostDtos;
          this.independentBoard = res.data.data.popularIndependentPostsDtos;
          this.allBoard = res.data.data.regionAllPostDtos;
          this.regionBoard = res.data.data.regionNotAllPostDtos;
          this.topSearch = res.data.data.keywordDtos;
          this.video = res.data.data.videoMainDtos;

          console.log(res.data)
        })
        .catch(err => console.error(err));
    },
    toggleLocationAuthentication() {
      this.$store.commit('toggleLocationAuthentication');

      if (this.$store.state.locationAuthentication === true)
      {this.getAddr();
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
              console.log("region : " + result[0].address.region_1depth_name);
              this.$store.state.currentLocation = result[0].address.region_1depth_name
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
    this.read();

    if (this.$store.state.locationAuthentication === true)
    {
      this.boolAuthentication = true
    }
    else
    this.boolAuthentication = false

    var token = this.$route.query.token

    console.log("token : " +  token)

    if (token) {
      token = "Bearer " + token
      console.log(token);
      this.saveToken(token); // 토큰 값을 Vuex 스토어에 저장
    }

    if (this.getToken)
      this.loginToken()
  },
};
</script>