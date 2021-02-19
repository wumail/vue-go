<!-- eslint-disable max-len -->
<template>
  <div>
    <b-navbar
      toggleable="lg"
      style="background-color:#1fc8db;background-image:linear-gradient(141deg,#2cb5e8 0%,#1fc8db 51%,#9fb8ad 0%)"
    >
      <b-container>
        <b-navbar-brand @click="$router.replace({name:'Home'})">
          <img
            class="imgstyle"
            alt="Hrbust logo"
            src="../../images/hrbust_logo.png"
          >
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse
          id="nav-collapse"
          is-nav
        >
          <div class="leftBar">
            <b-nav
              fill
              pills
            >
              <b-nav-item @click="$router.replace({name:'Home'})">
                <b-icon
                  icon="house"
                  aria-hidden="true"
                ></b-icon>
                主页
              </b-nav-item>
              <b-nav-item @click="$router.replace({name:'Question'})">
                <b-icon
                  icon="puzzle"
                  aria-hidden="true"
                ></b-icon>
                问题
              </b-nav-item>
              <b-nav-item @click="$router.replace({name:'Community'})">
                <b-icon
                  icon="signpost-split"
                  aria-hidden="true"
                ></b-icon>
                社区
              </b-nav-item>
              <!-- <b-nav-item @click="$router.replace({name:'Gamezone'})"> -->
              <b-nav-item @click="$router.replace({name:'Gamezone'})">
                <b-icon
                  icon="trophy"
                  aria-hidden="true"
                ></b-icon>
                成绩
                <pre></pre>
              </b-nav-item>
              <b-nav-item @click="$router.replace({name:'Scommunity'})">
                <b-icon
                  icon="question-circle"
                  aria-hidden="true"
                ></b-icon>
                帮助
              </b-nav-item>

            </b-nav>
          </div>
          <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                type="submit"
              >Search</b-button>
            </b-nav-form>

            <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

            <!-- <b-avatar variant="primary"></b-avatar> -->
            <b-nav-item-dropdown
              right
              v-if="userInfo"
            >
              <template v-slot:button-content>
                <em>{{userInfo.name}}
                </em>
              </template>
              <b-dropdown-item @click="$router.push({name:'profile'})">
                <b-button
                  variant="outline-primary"
                  class="mb-2"
                  style="min-width:115px"
                >
                  <b-icon
                    icon="person-fill"
                    aria-hidden="true"
                  ></b-icon>
                  个人主页
                </b-button>
              </b-dropdown-item>
              <b-dropdown-item @click="$router.push({name:'publish'})">
                <b-button
                  variant="outline-secondary"
                  class="mb-2"
                  style="min-width:115px"
                >
                  <b-icon
                    icon="file-earmark-medical"
                    aria-hidden="true"
                  ></b-icon> 发表文章
                </b-button>
              </b-dropdown-item>
              <b-dropdown-item
                v-if="userInfo.group =='administrator'"
                @click="$router.push({name:'pubquest'})"
              >
                <b-button
                  variant="outline-info"
                  class="mb-2"
                  style="min-width:115px"
                >
                  <b-icon
                    icon="file-earmark-plus"
                    aria-hidden="true"
                  ></b-icon> 发布问题
                </b-button>
              </b-dropdown-item>
              <b-dropdown-item @click="$router.push({name:'putcode'})">
                <!--<b-button
                  variant="outline-info"
                  class="mb-2"
                  style="min-width:115px"
                >
                  <b-icon
                    icon="code-slash"
                    aria-hidden="true"
                  ></b-icon> 提交代码
                 <b-badge
                    variant="primary"
                    style="margin-left:6px;"
                  >0</b-badge>
                </b-button>-->
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout">
                <b-button
                  variant="outline-danger"
                  class="mb-2"
                  style="min-width:115px"
                >
                  <b-icon
                    icon="power"
                    aria-hidden="true"
                  ></b-icon> 登出
                </b-button>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <div v-if="!userInfo">
              <b-navbar-nav class="m">
                <b-nav-item
                  right
                  v-if="$route.name!='login'"
                  @click="$router.replace({name:'login'})"
                >
                  登录
                </b-nav-item>
                <b-nav-item
                  right
                  v-if="$route.name!='register'"
                  @click="$router.replace({name:'register'})"
                >
                  注册
                </b-nav-item>
              </b-navbar-nav>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    // 使用mapState获取用户状态
    computed: mapState({
        userInfo: (state) => state.userModule.userInfo,
        // userInfo() {
        //     return this.$store.state.userModule.userInfo;
        // }, */
    }),
    methods: {
        ...mapActions('userModule', { userLogout: 'logout' }),
        logout() {
            this.userLogout().then(() => {
                this.$store.commit('clogstate', false);
                // console.log(this.$store.state.iflogin);
            });
            // console.log('logout');
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
