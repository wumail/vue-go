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
          <b-icon icon="file-earmark-code"></b-icon>
          <small style="margin-left:20px">提交代码</small>
        </p>
        <hr
          style="border-top:1px dashed #cccccc;"
          width="100%"
          color="#cccccc"
          size=1
        >
        <b-form-group
          label="代码"
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
          <b-form-invalid-feedback :state="validateState('code')">
            必须有内容
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-select
          v-model="selected"
          id="inline-form-custom-select-pref"
          class="mb-2 mr-sm-3 mb-sm-0"
          :options="options"
          :value="null"
        ></b-form-select>
        <hr
          style="border-top:1px dashed #cccccc;"
          width="100%"
          color="#cccccc"
          size=1
        >
        <b-button
          @click="putcode(selected)"
          variant="outline-primary"
          block
          style="margin-bottom:20px"
        >提交</b-button>
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
            code: {
                code: '',
                category: '',
            },
            options: [
                { value: '五子棋', text: '五子棋' },
                { value: '军棋', text: '军棋' },
            ],
        };
    },
    validations: {
        code: {
            code: {
                required,
            },
        },
    },

    methods: {
        // ...mapActions('userModule', { userPublish: 'publish' }),
        validateState(name) {
            const { $dirty, $error } = this.$v.code[name];
            return $dirty ? !$error : null;
        },
        putcode(value) {
            // console.log(this.post);
            this.code.category = value;
            userService.putcode(this.code).then((response) => {
                console.log(response);
                this.$router.replace({ name: 'profile' });
            }).catch((error) => {
                console.log(error);
            });
        },
    },
    beforeRouteLeave(to, from, next) {
        // eslint-disable-next-line eqeqeq
        if (to.path == '/mycode') {
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
