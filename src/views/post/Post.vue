<!-- eslint-disable max-len -->
<template>
  <div class="container-fluid">
    <div
      class="row"
      style="margin-top:30px;
      margin-bottom:40px;
      min-height:500px;"
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
          <b-icon icon="file-earmark-text"></b-icon>
          <small style="margin-left:20px">{{post.title}}</small>
        </p>
        <p class="mb-0 text-desc">
          作者：{{post.user_name}} | 更新时间：{{post.updated_at}}
        </p>
        <hr
          style="border-top:1px dashed #cccccc;"
          width="100%"
          color="#cccccc"
          size=1
        >
        <p style="margin:20px;min-height:300px;">
        <pre>
          <p>{{post.content}}</p>
          </pre>
        </p>
        <div
          class="text-desc"
          style="margin-left:5px;
          font-size:18px"
          v-if="post.user_name == userInfo.name"
        >
          <b-button
            @click="updatep"
            variant="light"
          >
            <b-icon icon="pencil"></b-icon>
            <small style="margin-left:5px">编辑</small>
          </b-button>
          <span style="margin-left:10px;margin-right:10px">|</span>
          <b-button
            variant="light"
            id="popover-button-variant"
            href="#"
            tabindex="0"
          >
            <b-popover
              target="popover-button-variant"
              variant="danger"
              triggers="focus"
              ref="popover"
            >
              <template v-slot:title>确认删除？</template>
              <b-button
                @click="deletep"
                variant="danger"
              >Yes?</b-button>
              <span style="margin-left:10px;margin-right:10px"></span>
              <b-button
                variant="light"
                @click="onClose"
              >No!</b-button>
            </b-popover>
            <b-icon icon="trash"></b-icon>
            <small style="margin-left:5px">删除</small>
          </b-button>
        </div>
        <hr
          style="border-top:1px dashed #cccccc;"
          width="100%"
          color="#cccccc"
          size=1
        >
      </div>
      <div
        class="col-lg-3 col-md-12 col-sm-12 col-xs-12"
        style="
        border-top-right-radius: 15px;
        border-bottom-right-radius:15px;
        box-shadow: 5px 5px 5px #888888;"
      >
        <h3 style="margin:15px">发起人</h3>
        <ul
          class="media-left "
          style="margin-left:-25px"
        >
          <b-media tag="li">
            <template v-slot:aside>
              <b-img
                src="https://gitee.com/wumail/wumail_Picbed/raw/master/img/20200907173723.png"
                v-bind="mainProps"
                class="avatarStyle"
                rounded
                alt="Rounded image"
              ></b-img>
            </template>
            <h5 class="mt-0 mb-1">{{post.user_name}}</h5>
            <span class="text-desc">发表于{{post.created_at}}</span>
          </b-media>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import userService from '@/service/userService';

export default {
    data() {
        return {
            post: null,
            url: null,
            id: this.$route.params.id, // 这样我们的id就拿到了然后在接口处拼接
        };
    },
    computed: mapState({
        userInfo: (state) => state.userModule.userInfo,
    }),
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
            this.post = null;
            this.loading = true;
            this.url = `/posts/${this.id}`;
            userService.showPost(this.url).then((response) => {
                this.loading = false;
                this.post = response.data.data.post;
                console.log(this.userInfo);
                // console.log(response.data.data.post);
            }).catch((err) => {
                console.log(err);
            });
        },
        updatep() {
            this.$router.push({ path: `/post/update/${this.id}` }); // 跳转的详情页面拼接id
        },
        deletep() {
            this.url = `/posts/${this.id}`;
            userService.deletep(this.url).then((response) => {
                console.log(response);
                this.$router.replace({ name: 'Community' });
            }).catch((error) => {
                console.log(error);
            });
        },
        onClose() {
            this.$refs.popover.$emit('close');
        },
    },
    beforeRouteLeave(to, from, next) {
        // eslint-disable-next-line eqeqeq
        if (to.path == '/mypost' || to.path == '/community') {
            // eslint-disable-next-line no-param-reassign
            to.meta.keepAlive = true;
        } else {
            // eslint-disable-next-line no-param-reassign
            to.meta.keepAlive = false;
        }
        next();
    },
};
</script>
<style lang="scss" scoped>
.avatarStyle {
  width: 55px;
  height: 55px;
}
.text-desc {
  font-size: 15px;
  color: #999;
}
</style>
