<template>
  <div class="container-fluid">
    <div
      class="row"
      style="margin-top:30px;
      margin-bottom:40px"
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
          <b-icon icon="file-earmark-plus"></b-icon>
          <small style="margin-left:20px">发表</small>
        </p>
        <hr
          style="border-top:1px dashed #cccccc;"
          width="100%"
          color="#cccccc"
          size=1
        >
        <b-form-group
          label="标题："
          style="font-size:150%"
        >
          <b-form-input
            v-model="$v.post.title.$model"
            type="text"
            placeholder="Enter the title"
            :state="validateState('title')"
          ></b-form-input>
          <b-form-invalid-feedback :state="validateState('title')">
            必须有标题
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          label="问题描述(简要)："
          style="font-size:150%"
        >
          <b-form-input
            v-model="$v.post.description.$model"
            type="text"
            placeholder="Enter the description"
            :state="validateState('description')"
          >{{upost.description}}</b-form-input>
          <b-form-invalid-feedback :state="validateState('description')">
            必须有问题描述
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          label="内容："
          for="textarea-no-auto-shrink"
          style="font-size:150%"
        >
          <b-form-textarea
            v-model="$v.post.content.$model"
            id="textarea-no-auto-shrink"
            placeholder="Auto height (no-shrink) textarea"
            rows="8"
            max-rows="10"
            no-auto-shrink
            :state="validateState('content')"
          >{{upost.content}}</b-form-textarea>
          <b-form-invalid-feedback :state="validateState('content')">
            必须有内容
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- <b-form-group
          label="添加标签："
          for="tags-basic"
          style="font-size:150%"
        >
          <b-form-tags
            input-id="tags-basic"
            v-model="value"
            class="mb-2"
          ></b-form-tags>
        </b-form-group> -->
        <hr
          style="border-top:1px dashed #cccccc;"
          width="100%"
          color="#cccccc"
          size=1
        >
        <b-button
          @click="update"
          variant="outline-primary"
          block
          style="margin-bottom:20px"
        >更新</b-button>
      </div>
      <div
        class="col-lg-3 col-md-12 col-sm-12 col-xs-12"
        style="
        border-top-right-radius: 15px;
        border-bottom-right-radius:15px;
        box-shadow: 5px 5px 5px #888888;"
      >
        <h3 style="margin:15px">QuestionGuide</h3>
        • Questions title: please describe the problem you posted in a concise language<br>
        • Question supplement: supplement your question in detail<br>
        • Select tags: select one or more appropriate tags, separated by commas<br>
      </div>
    </div>
  </div>
</template>
<script>
import {
    required,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'vuelidate/lib/validators';
// import { mapActions } from 'vuex';
import userService from '@/service/userService';

export default {
    data() {
        return {
            post: {
                title: '',
                description: '',
                content: '',
            },
            upost: null,
            url: null,
            id: this.$route.params.id, // 这样我们的id就拿到了然后在接口处拼接
        };
    },
    validations: {
        post: {
            title: {
                required,
            },
            description: {
                required,
            },
            content: {
                required,
            },
        },
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
        // ...mapActions('userModule', { userPublish: 'publish' }),
        validateState(name) {
            const { $dirty, $error } = this.$v.post[name];
            return $dirty ? !$error : null;
        },
        fetchData() {
            this.upost = null;
            this.loading = true;
            this.url = `/posts/${this.id}`;
            userService.showPost(this.url).then((response) => {
                this.loading = false;
                this.upost = response.data.data.post;
                this.post.title = this.upost.title;
                this.post.description = this.upost.description;
                this.post.content = this.upost.content;
                // console.log(this.upost);
                // console.log(response.data.data.post);
            }).catch((err) => {
                console.log(err);
            });
        },
        update() {
            userService.update(this.url, this.post).then((response) => {
                console.log(response);
                this.$router.replace({ name: 'mypost' });
            }).catch((error) => {
                console.log(error);
            });
        },
    },
};
</script>
