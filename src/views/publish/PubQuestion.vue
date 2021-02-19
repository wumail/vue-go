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
          <small style="margin-left:20px">发布问题</small>
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
          ></b-form-input>
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
            placeholder="Enter the content"
            rows="8"
            max-rows="10"
            no-auto-shrink
            :state="validateState('content')"
          ></b-form-textarea>
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
          @click="publish"
          variant="outline-primary"
          block
          style="margin-bottom:20px"
        >发布</b-button>
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

    methods: {
        // ...mapActions('userModule', { userPublish: 'publish' }),
        validateState(name) {
            const { $dirty, $error } = this.$v.post[name];
            return $dirty ? !$error : null;
        },
        publish() {
            // console.log(this.post);
            userService.publishQuest(this.post).then((response) => {
                console.log(response);
                this.$router.replace({ name: 'Community' });
            }).catch((error) => {
                console.log(error);
            });
        },
    },
};
</script>
