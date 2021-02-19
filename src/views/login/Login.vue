<!-- eslint-disable max-len -->
<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <h1 style="text-align:center"> <img
            class="imgstyle"
            alt="Hrbust logo"
            src="../../images/hrbust_logo.png"
          >
          <h2 style="margin:20px;color:#fff">计算机博弈平台</h2>
        </h1>
        <b-card title='登录'>
          <b-form>
            <!-- <b-form-group label="手机号">
              <b-form-input
                v-model="$v.user.telephone.$model"
                type="number"
                placeholder="请输入您的手机号"
                :state="validateState('telephone')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号不符合要求
              </b-form-invalid-feedback>
            </b-form-group> -->
            <b-form-group label="用户名">
              <b-form-input
                v-model="$v.user.name.$model"
                type="text"
                placeholder="请输入您的用户名"
                :state="validateState('name')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('name')">
                用户名不符合要求
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input
                class="lorinput"
                v-model="$v.user.password.$model"
                type="password"
                placeholder="请输入您的密码"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码长度不少于8位
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <b-button
                @click="login"
                variant="primary"
                block
              >登录</b-button>
            </b-form-group>
            <p class="logorreg">没有账号？<a
                @click="logorregState('register')"
                style="color:blue"
              >去注册</a></p>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
    required, minLength,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'vuelidate/lib/validators';
// import cunstomValidator from '@/helper/validator';
import { mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            user: {
                // telephone: '',
                name: '',
                password: '',
                group: '',
            },
        };
    },
    validations: {
        user: {

            // telephone: {
            //     required,
            //     telephone: cunstomValidator.telephoneValidator,
            // },
            name: {
                required,
                tminLength: minLength(8),
            },
            password: {
                required,
                minLength: minLength(8),
            },
        },
    },
    methods: {
        ...mapActions('userModule', { userLogin: 'login' }),
        ...mapMutations({ logorregState: 'clogorregstate' }),

        // ...mapMutations({ userlog: 'clogorregstate' }),
        // 这是es6的解构赋值
        validateState(name) {
            const { $dirty, $error } = this.$v.user[name];
            return $dirty ? !$error : null;
        },
        login() {
            // if (this.user.telephone.length !== 11) {
            //   this.validation = false;
            //   return;
            // }
            // this.validation = true;
            // 验证数据
            this.$v.user.$touch();
            if (this.$v.user.$anyError) {
                return;
            }
            // 请求api
            // const api = 'http://localhost:8080/home/register';
            this.userLogin(this.user).then(() => {
                // 跳转主页
                this.$store.commit('clogstate', true);
                // console.log(this.$store.state.iflogin);
                this.$router.replace({ name: 'Home' });
            }).catch((err) => {
                // console.log('err:', err.response.data.msg);
                this.$bvToast.toast(err.response.data.msg, {
                    title: '数据验证错误',
                    variant: 'danger',
                    toaster: 'b-toaster-top-center',
                    solid: true,
                });
            });
            // console.log('login');
        },

    },
};
</script>
<style lang="scss" scoped>
</style>
