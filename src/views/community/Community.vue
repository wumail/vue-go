<!-- eslint-disable max-len -->
<template>
  <div class="container-fluid">
    <b-overlay
      :show="loading"
      spinner-variant="primary"
      spinner-type="grow"
    >
      <template v-slot:overlay>
        <div class="text-center">
          <b-icon
            icon="three-dots"
            font-scale="3"
            animation="cylon"
          ></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
      <div
        class="row"
        style="margin-top:30px;
      margin-bottom:40px;
      min-height:790px;
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
          >
            <b-icon icon="columns-gap"></b-icon>
            <small style="margin-left:20px">社区</small>

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
              <b-media
                tag="li"
                v-for="post in posts"
                v-bind:key="post.id"
              >
                <template v-slot:aside>
                  <b-img
                    src="https://gitee.com/wumail/wumail_Picbed/raw/master/img/20200907173723.png"
                    v-bind="mainProps"
                    class="avatarStyle"
                    rounded
                    alt="Rounded image"
                  ></b-img>
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

            </ul>
          </div>
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
        <div
          class="col-lg-3 col-md-12 col-sm-12 col-xs-12"
          style="
        border-top-right-radius: 15px;
        border-bottom-right-radius:15px;
        box-shadow: 5px 5px 5px #888888;"
        >
          <h3 style="margin:15px">热门话题</h3>

        </div>

      </div>
    </b-overlay>
  </div>
</template>
<script>
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
    methods: {
        fetchData() {
            this.posts = null;
            this.loading = true;
            this.url = `/posts/page/list?pageNum=${this.currentPage}`;
            userService.pagelist(this.url).then((response) => {
                this.loading = false;
                this.posts = response.data.data.post;
                // console.log(response);
                console.log(response.data.data.post);
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
    },
    beforeRouteLeave(to, from, next) {
        // eslint-disable-next-line no-param-reassign
        from.meta.keepAlive = false;
        next();
    },
};
</script>
<style lang="scss" scoped>
.text-desc {
  font-size: 12px;
  color: #999;
}
.avatarStyle {
  width: 50px;
  height: 50px;
}
</style>
