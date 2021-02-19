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
        <!--<b-form-select
          v-model="selected"
          id="inline-form-custom-select-pref"
          class="mb-2 mr-sm-3 mb-sm-0"
          :options="options"
          :value="null"
        ></b-form-select>-->
        <hr
          style="border-top:1px dashed #cccccc;"
          width="100%"
          color="#cccccc"
          size=1
        >
        <!-- @click="updatecode(selected)" -->
        <b-button
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
            ucode: null,
            url: null,
            id: this.$route.params.id, // 这样我们的id就拿到了然后在接口处拼接
            // options: [
            //     { value: '五子棋', text: '五子棋' },
            //     { value: '围棋', text: '围棋' },
            // ],
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
        updatecode(value) {
            // console.log(this.post);
            this.code.category = value;
            userService.updatecode(this.url, this.code).then((response) => {
                console.log(response);
                this.$router.replace({ name: 'mycode' });
            }).catch((error) => {
                console.log(error);
            });
        },
        fetchData() {
            this.ucode = null;
            this.loading = true;
            this.url = `/codes/${this.id}`;
            userService.showPost(this.url).then((response) => {
                this.loading = false;
                this.ucode = response.data.data.code;
                this.code.code = this.ucode.code;
                this.code.category = this.ucode.category;
                // console.log(this.upost);
                // console.log(response.data.data.post);
            }).catch((err) => {
                console.log(err);
            });
        },

    },
};
</script>
