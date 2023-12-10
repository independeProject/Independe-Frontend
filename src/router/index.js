import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import BoardView from '../views/BoardView.vue';
import IndependentView from '../views/IndependentView.vue';
import PostWriteView from '../views/PostWriteView.vue';
import PostView from '../views/PostView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import SearchView from '../views/SearchView.vue';
import RedriectView from '../views/RedirectView.vue';
import ChatView from '../views/ChatView.vue';
import ChatRoomsView from '../views/ChatRoomsView.vue';

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/board/:regionType/:regionPostType',
    name: 'BoardView',
    component: BoardView
  },
  {
    path: '/independent/:independentType',
    name: 'IndependentView',
    component: IndependentView
  },
  {
    path: '/PostWrite',
    name: 'PostWriteView',
    component: PostWriteView
  },
  {
    path: '/posts/:postId',
    name: 'PostView',
    component: PostView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/redirect',
    name: 'RedirectView',
    component: RedriectView
  },
  {
    path: '/chat/:memberId',
    name: 'ChatView',
    component: ChatView
},
{
  path: '/chatRooms/',
  name: 'ChatRoomsView',
  component: ChatRoomsView
}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkIfAuthenticated(); // 인증 여부 확인 (토큰 유효성 검사 등)

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

// 토큰의 유효성을 검사하는 함수 추가
function checkIfAuthenticated() {
  // 토큰 유효성 검사 로직 구현
  // 예: const token = localStorage.getItem('token');
  //     return token !== null && token !== undefined;
  return false; // 예시로 기본값 false 설정
}

export default router;
