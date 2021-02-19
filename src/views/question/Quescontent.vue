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
          margin-bottom:10px;
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
        <div
          class="text-desc"
          style="margin-left:5px;
          margin-bottom:10px;
          font-size:18px"
        >
          <b-button
            @click="onUp"
            block
            variant="light"
          >
            <b-icon
              id="ic"
              icon="capslock"
            ></b-icon>
            <small style="margin-left:5px">提交代码</small>
          </b-button>
          <b-form-group
            v-if="upstate"
            label=" "
            for="textarea-no-auto-shrink"
            style="font-size:150%;"
          >
            <b-form-textarea
              v-model="$v.code.code.$model"
              id="textarea-no-auto-shrink"
              placeholder="请输入代码"
              rows="8"
              max-rows="10"
              no-auto-shrink
              :state="validateState('code')"
            ></b-form-textarea>
            <b-form-invalid-feedback
              class="text-desc"
              style="color:red"
              :state="validateState('code')"
            >
              必须有内容
            </b-form-invalid-feedback>
            <b-button
              @click="putcode"
              class="mt-3"
              variant="outline-primary"
              style="margin-bottom:3px;
            float:right;
            width:200px"
            >提交</b-button>
          </b-form-group>
        </div>
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
import {
    required,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            code: {
                code: '',
                title: '',
            },
            icon: 1,
            upstate: false,
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
    validations: {
        code: {
            code: {
                required,
            },
        },
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.code[name];
            return $dirty ? !$error : null;
        },
        fetchData() {
            this.post = null;
            this.loading = true;
            this.url = `/quests/${this.id}`;
            userService.showQuest(this.url).then((response) => {
                this.loading = false;
                this.post = response.data.data.quest;
                // console.log(this.userInfo);
                // console.log(response);
            }).catch((err) => {
                console.log(err);
            });
        },
        putcode() {
            // console.log(this.post);
            this.code.title = this.post.id;
            userService.putcode(this.code).then((response) => {
                console.log(response);
                this.upstate = false;

                // this.$router.push({ path: '../../assets/source/score.htm' });
                // this.$router.replace({ name: 'profile' });
            }).catch((error) => {
                console.log(error);
            });
        },
        updatep() {
            this.$router.push({ path: `/code/usdcode/${this.id}` }); // 跳转的详情页面拼接id
        },
        deletep() {
            this.url = `/quests/${this.id}`;
            userService.deletep(this.url).then((response) => {
                console.log(response);
                this.$router.replace({ name: 'Question' });
            }).catch((error) => {
                console.log(error);
            });
        },
        onClose() {
            this.$refs.popover.$emit('close');
        },
        onUp() {
            this.upstate = !this.upstate;
            if (this.upstate) {
                document.getElementById('ic').style.transform = 'rotate(180deg)';
            } else document.getElementById('ic').style.transform = 'rotate(0deg)';
        },
    },
    beforeRouteLeave(to, from, next) {
        // eslint-disable-next-line eqeqeq
        if (to.path == '/question') {
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
