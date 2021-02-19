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

export default {
    data() {
        return {
            wshow: '我的文章',
        };
    },
    computed: mapState({
        userInfo: (state) => state.userModule.userInfo,
    }),
    methods: {
        ifshow(name) {
            this.$router.push({ name });
        },
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
