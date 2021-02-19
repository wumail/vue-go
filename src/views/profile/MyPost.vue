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
        <div>
          <b-media
            tag="li"
            v-for="post in posts"
            v-bind:key="post.id"
          >
            <template v-slot:aside>
            </template>
            <h5
              @click="signup(post.id)"
              class="mt-0 mb-1"
            >{{post.title}}</h5>
            <!-- <h5 class="mt-0 mb-1">{{post.title}}</h5> -->
            <p class="mb-0">
              {{post.description}}
              <br>
              <span class="text-desc">{{post.updated_at}}</span>
            </p>
            <hr
              style="border-top:1px dashed #cccccc;"
              width="100%"
              color="#cccccc"
              size=1
            >
          </b-media>
          <div
            class="overflow-auto"
            @click="fetchData"
          >
            <div class="mt-3">
              <!-- <h6>Goto first and last button number</h6> -->
              <b-pagination
                pills
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                align="right"
                first-number
                last-number
                style="position:absolute;
              bottom:0;
              right:20px"
              ></b-pagination>
            </div>
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
            posts: null,
            url: null,
        };
    },
    created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
        this.fetchData();
    },
    watch: {
    // 如果路由有变化，会再次执行该方法
        $route: 'fetchData',
    },
    computed: mapState({
        userInfo: (state) => state.userModule.userInfo,
    }),
    methods: {
        fetchData() {
            this.posts = null;
            this.loading = true;
            this.url = `/posts/mypost/list?pageNum=${this.currentPage}`;
            userService.mypost(this.url).then((response) => {
                this.loading = false;
                this.posts = response.data.data.post;
                // console.log(response);
                // console.log(response.data.data.post);
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
            this.$router.push({ path: `/post/${id}` }); // 跳转的详情页面拼接id
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
