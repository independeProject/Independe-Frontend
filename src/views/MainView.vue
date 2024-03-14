<script setup>
import AppFooter from '@/common/AppFooter.vue';
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- 오늘의 멘트 -->
        <v-row>
          <v-col
            cols="12"
            class="my-1"
          >
            <h1
              class="text-center my-2 font-weight-bold"
              style="color:#5E913B"
            >
              Daily TIP
            </h1>
            <v-card
              variant="outlined"
              style="border-width:2px;"
              class="rounded-pill"
            >
              <v-card-text>
                <div
                  align="center"
                  class="font-weight-bold text-h6"
                >
                  {{ todayMent }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="my-10">
          <!--인기 게시판-->
          <v-col cols="auto">
            <v-row>
              <v-col cols="auto">
                <v-img
                  :width="35"
                  height="45"
                  src="../img/main_hot_board.png"
                />
              </v-col>
              <h2
                class="font-weight-bold my-5"
                style="color:#5E913B"
              >
                HOT 게시판
              </h2>
            </v-row>

            <v-sheet
              :height="405"
              :width="850"
              class="my-2"
            >
              <v-divider
                :thickness="2"
                class="border-opacity-25 mb-2"
                length="810"
              />
              <v-row>
                <v-col cols="auto">
                  <v-list
                    v-for="popularBoard in popularBoardList"
                    :key="popularBoard"
                  >
                    <div v-if="popularBoard.independentPostType === null">
                      <router-link
                        :to="{ name: 'BoardView', params: { regionType: popularBoard.regionTypeEn, regionPostType: popularBoard.regionPostTypeEn } }"
                        style="text-decoration: none;"
                      >
                        <p
                          class="text-grey-darken-1"
                          @click="$store.state.boardCheck = regionsAPI.indexOf(popularBoard.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(popularBoard.regionPostTypeEn)"
                        >
                          [{{ popularBoard.regionType }}·{{ popularBoard.regionPostType }}]
                        </p>
                      </router-link>
                    </div>
                    <div v-else>
                      <router-link
                        :to="{ name: 'IndependentView', params: { independentType: popularBoard.independentPostTypeEn } }"
                        style="text-decoration: none;"
                      >
                        <p
                          class="text-grey-darken-1"
                          @click="$store.state.independentCheck = independentsAPI.indexOf(popularBoard.independentPostTypeEn)"
                        >
                          [자취·{{ popularBoard.independentPostType }}]
                        </p>
                      </router-link>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="6">
                  <v-list
                    v-for="popularBoard in popularBoardList"
                    :key="popularBoard"
                  >
                    <div v-if="popularBoard.title.length <= 23">
                      <v-img
                        v-if="popularBoard.picture === true"
                        style="float:left"
                        :width="15"
                        src="../img/imagePlaceHolder.png"
                        class="my-1 mr-1"
                      />
                      <router-link
                        :to="{ name: 'PostView', params: { postId: popularBoard.postId } }"
                        style="text-decoration: none; color:black;"
                      >
                        {{ popularBoard.title }}
                      </router-link>
                    </div>
                    <div v-else>
                      <v-img
                        v-if="popularBoard.picture === true"
                        style="float:left"
                        :width="15"
                        src="../img/imagePlaceHolder.png"
                        class="my-1 mr-1"
                      />
                      <router-link
                        :to="{ name: 'PostView', params: { postId: popularBoard.postId } }"
                        style="text-decoration: none; color:black;"
                      >
                        <p>{{ popularBoard.title.substr(0, 23) }}...</p>
                      </router-link>
                    </div>
                  </v-list>
                </v-col>
                <v-col
                  cols="4"
                  class="mx-4"
                >
                  <v-list
                    v-for="popularBoard in popularBoardList"
                    :key="popularBoard"
                    style="overflow:hidden"
                  >
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
                            {{ popularBoard.commentCount }}
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
                            {{ popularBoard.recommendCount }}
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
                            {{ popularBoard.views }}
                          </p>
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
            <v-sheet
              :height="430"
              :width="290"
              color="grey-lighten-5"
              class="mt-13"
            >
              <v-row>
                <v-col cols="1" />
                <p class="font-weight-black pt-2">
                  실시간 인기 검색어
                </p>
              </v-row>
              <v-row class="mx-1">
                <v-col cols="auto">
                  <v-list
                    v-for="(topSearch, index) in topSearchList"
                    :key="index"
                    style="background-color: #FAFAFA;"
                  >
                    <p class="text-subtitle-2">
                      {{ index + 1 }}
                    </p>
                  </v-list>
                </v-col>
                <v-col cols="7">
                  <v-list
                    v-for="topSearch in topSearchList"
                    :key="topSearch"
                    style="background-color: #FAFAFA; text-emphasis-color: #FFFFFF;"
                  >
                    <div v-if="topSearch.keyword.length <= 9">
                      <p class="text-subtitle-2">
                        {{ topSearch.keyword }}
                      </p>
                    </div>
                    <div v-else>
                      <p class="text-subtitle-2">
                        {{ topSearch.keyword.substr(0, 9) }}...
                      </p>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="3">
                  <v-list
                    v-for="(topSearch, index) in topSearchList"
                    :key="index"
                    style="background-color: #FAFAFA;"
                  >
                    <div>
                      <div v-if="topSearch.keywordCount >= 10000">
                        <div v-if="index === 0">
                          <p
                            class="text-subtitle-2"
                            style="color:#D50000;"
                          >
                            {{
                              topSearch.keywordCount.toPrecision(3) / 1000 }}K
                          </p>
                        </div>
                        <div v-else>
                          <p class="text-subtitle-2">
                            {{ topSearch.keywordCount.toPrecision(3) / 1000 }}K
                          </p>
                        </div>
                      </div>
                      <div v-else>
                        <div v-if="index === 0">
                          <p
                            class="text-subtitle-2"
                            style="color:#D50000;"
                          >
                            {{ topSearch.keywordCount }}
                          </p>
                        </div>
                        <div v-else>
                          <p class="text-subtitle-2">
                            {{ topSearch.keywordCount }}
                          </p>
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
                  <v-img
                    :width="35"
                    height="45"
                    src="../img/main_independent_board.png"
                  />
                </v-col>
                <h2
                  class="font-weight-bold my-5"
                  style="color:#5E913B"
                >
                  인기 자취 정보
                </h2>
              </v-row>
            </v-col>
            <v-col cols="1">
              <router-link
                :to="{ name: 'IndependentView', params: { independentType: 'CLEAN' } }"
                style="text-decoration: none;"
              >
                <div
                  class="text-grey-darken-1 mt-5 text-subtitle-2"
                  @click="$store.state.independentCheck = 0"
                >
                  더보기 >
                </div>
              </router-link>
            </v-col>
          </v-row>
          <v-row>
            <v-sheet
              :height="220"
              :width="1160"
              class="mx-2"
            >
              <v-divider
                :thickness="2"
                class="border-opacity-25 mb-2"
                length="1160"
              />
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="auto">
                      <v-list
                        v-for="independentBoard in independentBoardList.slice(0, 5)"
                        :key="independentBoard"
                      >
                        <router-link
                          :to="{ name: 'IndependentView', params: { independentType: independentBoard.independentPostTypeEn } }"
                          style="text-decoration: none;"
                        >
                          <p
                            class="text-grey-darken-1"
                            @click="$store.state.independentCheck = independentsAPI.indexOf(independentBoard.independentPostTypeEn)"
                          >
                            [{{ independentBoard.independentPostType }}]
                          </p>
                        </router-link>
                      </v-list>
                    </v-col>
                    <v-col cols="6">
                      <v-list
                        v-for="independentBoard in independentBoardList.slice(0, 5)"
                        :key="independentBoard"
                      >
                        <div v-if="independentBoard.title.length <= 15">
                          <v-img
                            v-if="independentBoard.picture === true"
                            style="float:left"
                            :width="15"
                            src="../img/imagePlaceHolder.png"
                            class="my-1 mr-1"
                          />
                          <router-link
                            :to="{ name: 'PostView', params: { postId: independentBoard.postId } }"
                            style="text-decoration: none; color:black;"
                          >
                            {{ independentBoard.title }}
                          </router-link>
                        </div>
                        <div v-else>
                          <v-img
                            v-if="independentBoard.picture === true"
                            style="float:left"
                            :width="15"
                            src="../img/imagePlaceHolder.png"
                            class="my-1 mr-1"
                          />
                          <router-link
                            :to="{ name: 'PostView', params: { postId: independentBoard.postId } }"
                            style="text-decoration: none; color:black;"
                          >
                            <p>{{ independentBoard.title.substr(0, 15) }}...</p>
                          </router-link>
                        </div>
                      </v-list>
                    </v-col>
                    <v-col
                      cols="4"
                      class="mx-4"
                    >
                      <v-list
                        v-for="independentBoard in independentBoardList.slice(0, 5)"
                        :key="independentBoard"
                        style="overflow:hidden"
                      >
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-img
                                style="float:left;"
                                :width="15"
                                src="../img/commentIcon.png"
                                class="my-1 mx-1"
                              />
                              <p class="text-grey-darken-1 mx-1">
                                {{ independentBoard.commentCount }}
                              </p>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <v-img
                                style="float:left"
                                :width="15"
                                src="../img/recommendIcon.png"
                                class="my-1 mx-1"
                              />
                              <p class="text-grey-darken-1 mx-1">
                                {{ independentBoard.recommendCount }}
                              </p>
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
                      <v-list
                        v-for="independentBoard in independentBoardList.slice(5, 10)"
                        :key="independentBoard"
                      >
                        <router-link
                          :to="{ name: 'IndependentView', params: { independentType: independentBoard.independentPostTypeEn } }"
                          style="text-decoration: none;"
                        >
                          <p
                            class="text-grey-darken-1"
                            @click="$store.state.independentCheck = independentsAPI.indexOf(independentBoard.independentPostTypeEn)"
                          >
                            [{{ independentBoard.independentPostType }}]
                          </p>
                        </router-link>
                      </v-list>
                    </v-col>
                    <v-col cols="6">
                      <v-list
                        v-for="independentBoard in independentBoardList.slice(5, 10)"
                        :key="independentBoard"
                      >
                        <div v-if="independentBoard.title.length <= 15">
                          <v-img
                            v-if="independentBoard.picture === true"
                            style="float:left"
                            :width="15"
                            src="../img/imagePlaceHolder.png"
                            class="my-1 mr-1"
                          />
                          <router-link
                            :to="{ name: 'PostView', params: { postId: independentBoard.postId } }"
                            style="text-decoration: none; color:black;"
                          >
                            {{ independentBoard.title }}
                          </router-link>
                        </div>
                        <div v-else>
                          <v-img
                            v-if="independentBoard.picture === true"
                            style="float:left"
                            :width="15"
                            src="../img/imagePlaceHolder.png"
                            class="my-1 mr-1"
                          />
                          <router-link
                            :to="{ name: 'PostView', params: { postId: independentBoard.postId } }"
                            style="text-decoration: none; color:black;"
                          >
                            <p>{{ independentBoard.title.substr(0, 15) }}...</p>
                          </router-link>
                        </div>
                      </v-list>
                    </v-col>
                    <v-col
                      cols="4"
                      class="mx-4"
                    >
                      <v-list
                        v-for="independentBoard in independentBoardList.slice(5, 10)"
                        :key="independentBoard"
                        style="overflow:hidden"
                      >
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-img
                                style="float:left;"
                                :width="15"
                                src="../img/commentIcon.png"
                                class="my-1 mx-1"
                              />
                              <p class="text-grey-darken-1 mx-1">
                                {{ independentBoard.commentCount }}
                              </p>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <v-img
                                style="float:left"
                                :width="15"
                                src="../img/recommendIcon.png"
                                class="my-1 mx-1"
                              />
                              <p class="text-grey-darken-1 mx-1">
                                {{ independentBoard.recommendCount }}
                              </p>
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
                    <v-img
                      :width="35"
                      height="45"
                      src="../img/main_all_board.png"
                    />
                  </v-col>
                  <h2
                    class="font-weight-bold my-5"
                    style="color:#5E913B"
                  >
                    인기 전체 게시판
                  </h2>
                </v-row>
              </v-col>
              <v-col cols="2">
                <router-link
                  :to="{ name: 'BoardView', params: { regionType: 'ALL', regionPostType: 'FREE' } }"
                  style="text-decoration: none;"
                >
                  <div
                    class="mt-5 text-subtitle-2 text-grey-darken-1"
                    @click="$store.state.boardCheck = 0, $store.state.categoryCheck = 0"
                  >
                    더보기 >
                  </div>
                </router-link>
              </v-col>
              <v-divider
                :thickness="2"
                class="border-opacity-25 mb-2 mx-3"
                length="560"
              />
            </v-row>
            <v-sheet
              :height="220"
              :width="580"
            >
              <v-row>
                <v-col cols="auto">
                  <v-list
                    v-for="allBoard in allBoardList"
                    :key="allBoard"
                  >
                    <router-link
                      :to="{ name: 'BoardView', params: { regionType: 'ALL', regionPostType: 'FREE' } }"
                      style="text-decoration: none;"
                    >
                      <p
                        class="text-grey-darken-1"
                        @click="$store.state.boardCheck = 0, $store.state.categoryCheck = 0"
                      >
                        [자유]
                      </p>
                    </router-link>
                  </v-list>
                </v-col>
                <v-col cols="6">
                  <v-list
                    v-for="allBoard in allBoardList"
                    :key="allBoard"
                  >
                    <div v-if="allBoard.title.length <= 15">
                      <v-img
                        v-if="allBoard.picture === true"
                        style="float:left"
                        :width="15"
                        src="../img/imagePlaceHolder.png"
                        class="my-1 mr-1"
                      />
                      <router-link
                        :to="{ name: 'PostView', params: { postId: allBoard.postId } }"
                        style="text-decoration: none; color:black;"
                      >
                        {{ allBoard.title }}
                      </router-link>
                    </div>
                    <div v-else>
                      <v-img
                        v-if="allBoard.picture === true"
                        style="float:left"
                        :width="15"
                        src="../img/imagePlaceHolder.png"
                        class="my-1 mr-1"
                      />
                      <router-link
                        :to="{ name: 'PostView', params: { postId: allBoard.postId } }"
                        style="text-decoration: none; color:black;"
                      >
                        <p>{{ allBoard.title.substr(0, 15) }}...</p>
                      </router-link>
                    </div>
                  </v-list>
                </v-col>
                <v-col
                  cols="4"
                  class="mx-4"
                >
                  <v-list
                    v-for="allBoard in allBoardList"
                    :key="allBoard"
                    style="overflow:hidden"
                  >
                    <v-row>
                      <v-col cols="6">
                        <div>
                          <v-img
                            style="float:left;"
                            :width="15"
                            src="../img/commentIcon.png"
                            class="my-1 mx-1"
                          />
                          <p class="text-grey-darken-1 mx-1">
                            {{ allBoard.commentCount }}
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <v-img
                            style="float:left"
                            :width="15"
                            src="../img/recommendIcon.png"
                            class="my-1 mx-1"
                          />
                          <p class="text-grey-darken-1 mx-1">
                            {{ allBoard.recommendCount }}
                          </p>
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
                    <v-img
                      :width="35"
                      height="45"
                      src="../img/main_region_board.png"
                    />
                  </v-col>
                  <h2
                    class="font-weight-bold my-5"
                    style="color:#5E913B"
                  >
                    인기 지역 게시판
                  </h2>
                </v-row>
              </v-col>
              <v-col cols="2">
                <router-link
                  :to="{ name: 'BoardView', params: { regionType: 'SEOUL', regionPostType: 'TALK' } }"
                  style="text-decoration: none;"
                >
                  <div
                    class="mt-5 text-subtitle-2 text-grey-darken-1"
                    @click="$store.state.boardCheck = 1, $store.state.categoryCheck = 1"
                  >
                    더보기 >
                  </div>
                </router-link>
              </v-col>
              <v-divider
                :thickness="2"
                class="border-opacity-25 mb-2 mx-3"
                length="560"
              />
            </v-row>
            <v-sheet
              :height="220"
              :width="580"
            >
              <v-row>
                <v-col cols="auto">
                  <v-list
                    v-for="regionBoard in regionBoardList"
                    :key="regionBoard"
                  >
                    <router-link
                      :to="{ name: 'BoardView', params: { regionType: regionBoard.regionTypeEn, regionPostType: regionBoard.regionPostTypeEn } }"
                      style="text-decoration: none;"
                    >
                      <p
                        class="text-grey-darken-1"
                        @click="$store.state.boardCheck = regionsAPI.indexOf(regionBoard.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(regionBoard.regionPostTypeEn)"
                      >
                        [{{ regionBoard.regionType }}·{{ regionBoard.regionPostType }}]
                      </p>
                    </router-link>
                  </v-list>
                </v-col>
                <v-col cols="5">
                  <v-list
                    v-for="regionBoard in regionBoardList"
                    :key="regionBoard"
                  >
                    <div v-if="regionBoard.title.length <= 12">
                      <v-img
                        v-if="regionBoard.picture === true"
                        style="float:left"
                        :width="15"
                        src="../img/imagePlaceHolder.png"
                        class="my-1 mr-1"
                      />
                      <router-link
                        :to="{ name: 'PostView', params: { postId: regionBoard.postId } }"
                        style="text-decoration: none; color:black;"
                      >
                        {{ regionBoard.title }}
                      </router-link>
                    </div>
                    <div v-else>
                      <v-img
                        v-if="regionBoard.picture === true"
                        style="float:left"
                        :width="15"
                        src="../img/imagePlaceHolder.png"
                        class="my-1 mr-1"
                      />
                      <router-link
                        :to="{ name: 'PostView', params: { postId: regionBoard.postId } }"
                        style="text-decoration: none; color:black;"
                      >
                        <p>{{ regionBoard.title.substr(0, 12) }}...</p>
                      </router-link>
                    </div>
                  </v-list>
                </v-col>
                <v-col
                  cols="4"
                  class="ml-6"
                >
                  <v-list
                    v-for="regionBoard in regionBoardList"
                    :key="regionBoard"
                    style="overflow:hidden"
                  >
                    <v-row>
                      <v-col cols="6">
                        <div>
                          <v-img
                            style="float:left;"
                            :width="15"
                            src="../img/commentIcon.png"
                            class="my-1 mx-1"
                          />
                          <p class="text-grey-darken-1 mx-1">
                            {{ regionBoard.commentCount }}
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <v-img
                            style="float:left"
                            :width="15"
                            src="../img/recommendIcon.png"
                            class="my-1 mx-1"
                          />
                          <p class="text-grey-darken-1 mx-1">
                            {{ regionBoard.recommendCount }}
                          </p>
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
              <p
                class="font-weight-bold text-h4"
                style="color:#5E913B"
              >
                자취 정보 영상
              </p>
            </v-col>
            <v-col cols="2">
              <div
                class="mt-5 text-subtitle-2 mr-4"
                align="end"
              >
                더 많은 영상보기
              </div>
            </v-col>
          </v-row>
          <v-row class="px-3">
            <div
              v-for="video in videoList"
              :key="video"
              class="mx-1"
            >
              <v-col cols="auto">
                <iframe
                  width="360"
                  height="195"
                  :src="video.videoUrl"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                />
                <div v-if="video.title.length <= 20">
                  <p
                    class="my-1 font-weight-bold"
                    align="center"
                  >
                    {{ video.title }}
                  </p>
                </div>
                <div v-else>
                  <p
                    class="my-1 font-weight-bold"
                    align="center"
                  >
                    {{ video.title.substr(0, 20) }}...
                  </p>
                </div>
              </v-col>
            </div>
          </v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <AppFooter />
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
      popularBoardList: [],
      independentBoardList: [],
      allBoardList: [],
      regionBoardList: [],
      topSearchList: [],
      videoList: [],
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
  mounted() {
    this.read();

    if (this.$store.state.locationAuthentication === true) {
      this.boolAuthentication = true
    } else {
      this.boolAuthentication = false
    }

    var token = this.$route.query.token

    console.log("token : " +  token)

    if (token) {
      token = "Bearer " + token
      console.log(token);
      this.saveToken(token); // 토큰 값을 Vuex 스토어에 저장
    }

    if (this.getToken) {
      this.loginToken()
    }
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
          this.popularBoardList = res.data.data.popularPostDtos;
          this.independentBoardList = res.data.data.popularIndependentPostsDtos;
          this.allBoardList = res.data.data.regionAllPostDtos;
          this.regionBoardList = res.data.data.regionNotAllPostDtos;
          this.topSearchList = res.data.data.keywordDtos;
          this.videoList = res.data.data.videoMainDtos;

          console.log(res.data)
        })
        .catch(err => console.error(err));
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
  }
};
</script>
