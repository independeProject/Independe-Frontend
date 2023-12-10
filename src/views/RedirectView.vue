<template>
    <v-app>
        <v-main>
            <v-container>
                <div v-if="formCheck === 1">
                    <v-row class="mt-3">
                        <v-col cols="auto">
                            <v-img :width="45" :height="45" src="../img/signUp.png"></v-img>
                        </v-col>
                        <h2 class="font-weight-bold mt-5" style="color:#5E913B">인디펜더 회원가입</h2>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-divider :thickness="1" class="border-opacity-25 my-1"></v-divider>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <div class="font-weight-bold mt-5 mb-3" style="color:gray; font-size:20px">이용약관</div>
                            <v-textarea v-model="terms" class="no-resize" :readonly="true" variant="outlined"></v-textarea>
                            <v-row>
                                <v-checkbox v-model="termsAgreed" label="[필수] 이용약관에 동의합니다." color="success"></v-checkbox>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <div class="font-weight-bold mt-5 mb-3" style="color:gray; font-size:20px">개인정보 수집 및 이용 동의서
                            </div>
                            <v-textarea v-model="privacy" class="no-resize" :readonly="true"
                                variant="outlined"></v-textarea>
                            <v-row>
                                <v-checkbox v-model="privacyAgreed" label="[필수] 개인정보 수집 및 이용에 동의합니다."
                                    color="success"></v-checkbox>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="5"></v-col>
                        <v-col cols="1">
                            <v-btn style="height:55px; width: 100px;" @click="cancel">
                                <div style="font-size:16px">취소</div>
                            </v-btn>
                        </v-col>
                        <v-col cols="1">
                            <v-btn style="height:55px; width: 100px;" variant="flat" color="#5E913B"
                                class="font-weight-bold" @click="next">
                                <div class="text-white" style="font-size:16px">다음</div>
                            </v-btn>
                        </v-col>
                        <v-col cols="5"></v-col>
                    </v-row>
                </div>
                <div v-else>
                    <v-row class="mt-3">
                        <v-col cols="auto">
                            <v-img :width="45" :height="45" src="../img/privacy.png"></v-img>
                        </v-col>
                        <h2 class="font-weight-bold mt-5" style="color:#5E913B">개인정보입력</h2>
                    </v-row>

                    <v-row class="mb-1">
                        <v-col>
                            <v-divider :thickness="1" class="border-opacity-25 my-5"></v-divider>
                        </v-col>
                    </v-row>
                    
                    <v-row class="mt-10">
                        <v-col cols="3"></v-col>
                        <v-col cols="1">
                            <div class="font-weight-bold mt-5" style="color:gray; font-size:20px">닉네임</div>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="nickname" placeholder="NICKNAME" class="no-resize" variant="underlined"
                                @blur="nicknameValid"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-btn variant="flat" color="#898E93" class="mt-3 font-weight-bold">
                                <div class="text-white" @click="nicknameDuplicate">중복확인</div>
                            </v-btn>
                        </v-col>
                        <v-col cols="2"></v-col>
                    </v-row>
                    
                    <v-row class="mt-1">
                        <v-col cols="3"></v-col>
                        <v-col cols="auto">
                            <div style="font-size:12px; color:darkred" v-if="!nicknameDuplicateCheck && nicknameDupBtn > 0">! 사용 불가능한 닉네임 입니다.</div>
                            <div style="font-size:12px; color:darkgreen" v-else-if="nicknameDuplicateCheck && nicknameDupBtn > 0">사용 가능한 닉네임 입니다.</div>
                        </v-col>
                    </v-row>

                    <v-row class="mt-1">
                        <v-col cols="3"></v-col>
                        <v-col cols="auto">
                            <div style="font-size:12px; color:darkred" v-if="!nickVaild">! 닉네임이 너무 깁니다. 닉네임은 최대 12글자까지
                                가능합니다.</div>
                        </v-col>
                    </v-row>
                    
                    <v-row class="mt-10">
                        <v-col cols="3"></v-col>
                        <v-col cols="1">
                            <div class="font-weight-bold mt-5" style="color:gray; font-size:20px">이메일</div>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="email" type="email" placeholder="EMAIL" class="no-resize"
                                variant="underlined" @blur="emailValid"></v-text-field>
                        </v-col>
                        <v-col cols="2"></v-col>
                    </v-row>

                    <v-row class="mt-1">
                        <v-col cols="3"></v-col>
                        <v-col cols="auto">
                            <div style="font-size:12px; color:darkred" v-if="!emailVaild">! 올바른 이메일 양식이 아닙니다.</div>
                        </v-col>
                    </v-row>
                    
                    <v-row class="mt-10">
                        <v-col cols="3"></v-col>
                        <v-col cols="1">
                            <div class="font-weight-bold mt-5" style="color:gray; font-size:20px">전화번호</div>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="number" placeholder="PHONE NUMBER" class="no-resize"
                                variant="underlined" @input="formatPhoneNumber" type="tel" maxlength="13" @blur="numberCount++"></v-text-field>
                        </v-col>
                        <v-col cols="2"></v-col>
                    </v-row>
                    
                    <v-row class="mt-1">
                        <v-col cols="3"></v-col>
                        <v-col cols="auto">
                            <div style="font-size:12px; color:darkred" v-if="number.length !== 13 && numberCount !== 0">! 전화번호는 13자리 입니다.</div>
                        </v-col>
                    </v-row>

                    <v-row class="mt-15 mb-10">
                        <v-col cols="5"></v-col>
                        <v-col cols="1">
                            <v-btn style="height:55px; width: 100px;" @click="cancel">
                                <div style="font-size:16px">취소</div>
                            </v-btn>
                        </v-col>
                        <v-col cols="1">
                            <v-btn style="height:55px; width: 100px;" variant="flat" color="#5E913B"
                                class="font-weight-bold" @click="craete">
                                <div class="text-white" style="font-size:16px">생성</div>
                            </v-btn>
                        </v-col>
                        <v-col cols="5"></v-col>
                    </v-row>
                </div>
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
    name: 'SignUptView',
    data() {
        return {
            active_tab: 0,
            link: ['메인', '게시판', '자취생활'],

            terms: `이용약관
            
1. 서비스 목적과 범위
      1.1. "인디펜더"는 사용자들이 다양한 커뮤니티 활동을 할 수 있는 온라인 플랫폼을 제공합니다.
      1.2. 본 서비스는 회원 간의 상호작용을 위한 커뮤니케이션 도구, 콘텐츠 공유, 이벤트 및 프로젝트 등을 포함합니다.

2. 이용자의 권리와 의무
      2.1. 회원은 본 서비스를 이용함으로써 다른 회원 및 관리자에 대한 존중과 배려를 요구 받습니다.
      2.2. 회원은 본 서비스를 합법적인 목적으로만 사용해야 하며, 타인의 권리를 침해하거나 불법 활동을 수행해서는 안됩니다.

3. 개인정보 처리 방침
      3.1. "인디펜더"는 회원의 개인정보를 보호하기 위해 노력하며, 개인정보 처리에 대한 규정은 별도의 개인정보 처리 방침에 따릅니다.
      3.2. 회원은 본 서비스를 이용함으로써 개인정보 처리 방침에 동의한 것으로 간주됩니다.

4. 서비스 이용 제한 사항
      4.1. 회원은 다른 회원의 권리를 침해하거나 부적절한 콘텐츠를 게시하여서는 안됩니다.
      4.2. 회원은 서비스 이용에 있어 법적, 윤리적인 제한 사항을 준수해야 합니다.

5. 지적 재산권에 대한 규정
      5.1. 회원이 서비스에 게시한 콘텐츠에 대한 지적 재산권은 해당 회원에게 속합니다.
      5.2. 회원은 타인의 지적 재산권을 존중해야 하며, 불법적으로 타인의 저작권을 침해해서는 안됩니다.

6. 책임 제한 및 면책 조항
      6.1. "인디펜더"는 회원 간의 상호작용 및 서비스 이용으로 발생하는 문제에 대해 어떠한 책임도 지지 않습니다.
      6.2. 본 서비스는 제공되는 기능 및 콘텐츠의 정확성, 완전성, 신뢰성에 대해 보증하지 않습니다.

7. 분쟁 해결 방법과 관할법원
      7.1. 서비스 이용으로 발생하는 분쟁은 상호 합의를 통해 해결을 시도해야 합니다.
      7.2. 분쟁이 해결되지 않을 경우, 관할법원에 소를 제기할 수 있습니다.

8. 약관 변경에 대한 규정
      8.1. "인디펜더"는 필요한 경우 이용약관을 변경할 수 있으며, 변경사항은 별도의 공지를 통해 효력이 발생합니다.

9.계약 해지 조항
      9.1. 회원은 언제든지 서비스 이용을 중단하고 계정을 해지할 수 있습니다.`,
            privacy: `개인정보 수집 및 이용 동의서
            
            
1. 수집하는 개인정보의 항목
        • 성명, 이메일 주소, 연락처 등

2. 개인정보의 수집 및 이용 목적
        • 회원 가입 및 서비스 제공, 고객 지원 및 문의 응대, 서비스 개선 및 향상 등

3. 개인정보의 보유 및 이용 기간
        • 개인정보는 수집 및 이용 목적을 달성한 후, 관련 법령이 정한 기간 내에 파기됩니다.

4. 개인정보의 제3자 제공
        • "인디펜더"는 이용자의 개인정보를 제3자에게 제공하지 않으며, 법령에 의해 요구되는 경우에는 예외로 합니다.

5.개인정보의 처리 위탁
        • "인디펜더"는 개인정보 처리를 위탁하지 않으며, 모든 개인정보 처리는 자체적으로 이루어집니다.

6. 개인정보의 파기
        • 개인정보는 수집 및 이용 목적이 달성된 후, 관련 법령에 따라 안전하게 파기됩니다.

7. 개인정보 수집 및 이용 동의의 거부
        • 이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다. 단, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.

8. 개인정보 보호 관련 권리
        • 이용자는 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지 등의 권리를 행사할 수 있습니다.

9. 개인정보 보호 관련 문의처
        • 개인정보 보호 관련 문의나 불만사항은 아래 연락처로 문의하여 주시기 바랍니다:
        [010-2483-6671]

10. 개인정보 수집 및 이용 동의
        • 본인은 위에 기술된 개인정보 수집 및 이용에 동의합니다. 해당 정보는 "인디펜더" 서비스의 이용과 관련된 목적으로만 사용될 것을 약속합니다.`,
            formCheck: 1,
            termsAgreed: false, // 이용약관 동의 여부
            privacyAgreed: false, // 개인정보 수집 및 이용 동의 여부
            emailVaild: true,
            nickVaild: true,
            nicknameDupCheck: true,
            nicknameDuplicateCheck: false,
            numberCheck: false,
            nicknameDupBtn: 0,
            numberCount: 0,

            nickname: "",
            email: "",
            number: "",
        }
    },
    computed: {
    ...mapGetters(['getToken']),
    },
    created() {
        const token = "Bearer " + this.$route.query.token
        console.log('token',token)

        if (token) {
        this.saveToken(token); // 토큰 값을 Vuex 스토어에 저장
        } else {
        window.alert('로그인에 실패하였습니다.')
        this.$router.push({path:'/login'})
        }
    },
    methods: {
        ...mapActions(['saveToken']),
        formatPhoneNumber() {
            // 입력된 전화번호에서 하이픈(-) 제거 및 숫자만 추출
            let formattedNumber = this.number.replace(/-/g, '').replace(/\D/g, '');

            // 숫자 입력 제한 (최대 10자리)
            formattedNumber = formattedNumber.slice(0, 11);

            // 하이픈(-)을 포함한 형식으로 다시 입력
            if (formattedNumber.length > 3 && formattedNumber.length <= 7) {
                formattedNumber = formattedNumber.replace(/(\d{3})(\d+)/, '$1-$2');
            } else if (formattedNumber.length > 7) {
                formattedNumber = formattedNumber.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
            }

            // 포맷된 전화번호를 반영
            this.number = formattedNumber;

            this.numberCheck = formattedNumber.length === 13;
        },
        cancel() {
            this.$router.go(-1);
        },
        next() {
            if (this.termsAgreed && this.privacyAgreed) {
                this.formCheck = 2;
            } else {
                alert('필수 약관에 동의해야 합니다.');
            }
        },
        nicknameValid() {
            if (this.nickname.length > 12) {
                this.nickVaild = false;
            } else {
                this.nickVaild = true;
            }
        },
        emailValid() {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.email)) {
                this.emailVaild = true
            } else {
                this.emailVaild = false
            }
        },
        nicknameDuplicate() {
            this.$axios.post("/api/members/nickname", { nickname: this.nickname })
                .then(res => {
                    this.nicknameDupCheck = res.data.idDuplicatedNot
                    this.nicknameDupBtn = this.nicknameDupBtn + 1

                    if (this.nicknameDupCheck === true)
                        this.nicknameDuplicateCheck = true
                    else
                        this.nicknameDuplicateCheck = false

                    console.log(this.nicknameDupBtn)
                    console.log(res.data.idDuplicatedNot)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        craete() {
            const Oauthtoken = this.getToken;
            if (this.nickname !== '' && this.nicknameDuplicateCheck && this.nicknameDupBtn > 0 && this.nickVaild && this.emailVaild && this.email !== '' && this.number !== '' && this.number.length === 13)
            {
                this.$axios.put("/api/members", { nickname: this.nickname, email: this.email, number: this.number }, { headers: {Authorization: Oauthtoken}})
                .then(res => {
                    alert("회원가입이 완료되었습니다.")
                    this.$router.push({ path: '/login'});
                    console.log(res)
                })
                .catch(error => {
                    console.log(error);
                });
            }
            else if(this.nicknameDupBtn === 0)
            {
                alert("중복확인을 해주세요.")
            }
            else
            {
                alert("정보가 올바르지 않습니다. 다시 한 번 확인해 주세요.")
            }
            
            this.$store.dispatch('logout');
            // const token = this.$route.query.token
            // if (token) {
            //     this.$store.state.token = this.$route.query.token
            //     console.log('this.$store.state.token')
            // }
        }
    },
    mounted() {
        this.formCheck = 1
    }
}   
</script>

<style>
.no-resize ::-webkit-resizer {
    display: none;
    resize: none;
}</style>
