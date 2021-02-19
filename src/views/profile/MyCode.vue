<!-- eslint-disable max-len -->
<template>
  <div class="container-fluid">
    <div
      class="row"
      style="margin-top:30px;
      margin-bottom:40px;
      min-height:700px
     "
    >
      <div
        class="col-lg-9 col-md-12 col-sm-12 col-xs-12 page-left border"
        style="
        border-top-left-radius: 15px;
        border-bottom-left-radius:15px;
        box-shadow: 5px 5px 5px #888888;"
      >

        <p
          class="h3 mb-2"
          style="margin:15px"
          @click="$router.push({name:'profile'})"
        >
          <b-icon icon="person"></b-icon>
          <small style="margin-left:20px">个人页面</small>
        </p>
        <hr
          style="border-top:1px dashed #cccccc;"
          width="100%"
          color="#cccccc"
          size=1
        >
        <div>
          <div>
            <ul
              class="media-left "
              style="margin-left:-25px"
            >
              <b-media tag="li">
                <template v-slot:aside>
                  <b-img
                    src="https://gitee.com/wumail/wumail_Picbed/raw/master/img/20200907173723.png"
                    v-bind="mainProps"
                    class="profavatarStyle"
                    rounded
                    alt="Rounded image"
                  ></b-img>
                </template>
                <h4 class="mt-0 mb-1">{{userInfo.name}}</h4>
                <p class="mb-0 text-desc">
                  {{userInfo.name}}
                  哈尔滨理工大学
                  计算机科学与技术
                  2018级 7班
                  蒋瑞
                </p>

              </b-media>
            </ul>
          </div>
          <hr
            style="border-top:1px dashed #cccccc;"
            width="100%"
            color="#cccccc"
            size=1
          >
          <b-button
            @click="selectcategory"
            variant="outline-primary"
            block
          >查看</b-button>
          <!--  style="width:100px;margin-left:20px;box-shadow:3px 3px 8px rgba(96 114 144 /60%);"-->
          <div>
            <ul
              class="media-left "
              style="margin-left:-25px;margin-top:20px"
            >
              <div
                class="accordion"
                role="tablist"
              >
                <b-media
                  tag="li"
                  v-for="code in codes"
                  v-bind:key="code.id"
                >
                  <template v-slot:aside>
                  </template>
                  <h5
                    @click="signup(code.id)"
                    class="mt-0 mb-1"
                  >{{code.id}}</h5>
                  <!-- <h5 class="mt-0 mb-1">{{post.title}}</h5> -->
                  <hr
                    style="border-top:1px dashed #cccccc;"
                    width="100%"
                    color="#cccccc"
                    size=1
                  >
                </b-media>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="col-lg-3 col-md-12 col-sm-12 col-xs-12"
        style="
        border-top-right-radius: 15px;
        border-bottom-right-radius:15px;
        box-shadow: 5px 5px 5px #888888;"
      >
        <div>
          <b-nav
            pills
            vertical
            style="margin:20px"
          >
            <b-nav-item @click="ifshow('mypost')">我的文章</b-nav-item>
            <b-nav-item @click="ifshow('mycode')">我的代码</b-nav-item>
            <b-nav-item>编辑个人信息</b-nav-item>
          </b-nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import userService from '../../service/userService';

export default {
    data() {
        return {
            variant: 'light',
            opacity: 0.80,
            loading: false,
            rows: 1,
            perPage: 6,
            currentPage: 1,
            codes: null,
            url: null,
            options: [
                { value: '五子棋', text: '五子棋' },
                { value: '围棋', text: '围棋' },
            ],
        };
    },
    computed: mapState({
        userInfo: (state) => state.userModule.userInfo,
    }),
    methods: {
        selectcategory() {
            this.codes = null;
            this.loading = true;
            this.url = '/codes/list';
            userService.codelist(this.url).then((response) => {
                this.loading = false;
                this.codes = response.data.data.code;
                // console.log(response);
                console.log(response.data.data.code);
                // console.log(response.data.data.total_pages);
                this.rows = response.data.data.total_pages;
            }).catch((err) => {
                this.$bvToast.toast(err.response.data.msg, {
                    title: '数据验证错误',
                    variant: 'danger',
                    toaster: 'b-toaster-top-center',
                    solid: true,
                });
            });
        },
        signup(id) {
            this.$router.push({ path: `/code/${id}` }); // 跳转的详情页面拼接id
        },
        ifshow(name) {
            this.$router.push({ name });
        },
    },
    beforeRouteLeave(to, from, next) {
        // eslint-disable-next-line no-param-reassign
        from.meta.keepAlive = false;
        next();
    },
};
</script>
<style lang="scss" scoped>
.profavatarStyle {
  width: 65px;
  height: 65px;
}
.text-desc {
  font-size: 15px;
  color: #999;
}
</style>
