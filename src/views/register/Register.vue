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
        <b-card title="注册">
          <b-form>
            <b-form-group label="姓名">
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
                @click="register"
                class="logbt"
                variant="primary"
                block
              >注册</b-button>
            </b-form-group>
            <p class="logorreg">已有账号？<a
                @click="logorregState('login')"
                style="color:blue"
              >去登录</a></p>
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
// import userService from '@/service/userService';
import { mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            user: {
                name: '',
                // telephone: '',
                password: '',
            },
            // validation: null,
        };
    },
    validations: {
        user: {
            name: {
                required,
                minLength: minLength(8),
            },
            // telephone: {
            //     required,
            //     telephone: cunstomValidator.telephoneValidator,
            // },
            password: {
                required,
                minLength: minLength(8),
            },
        },
    },
    methods: {
        // ...mapMutations('userModule', ['SET_TOKEN', 'SET_USERINFO']),
        ...mapActions('userModule', { userRegister: 'register' }),
        ...mapMutations({ logorregState: 'clogorregstate' }),

        // 这是es6的解构赋值
        validateState(name) {
            const { $dirty, $error } = this.$v.user[name];
            return $dirty ? !$error : null;
        },
        register() {
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
            this.userRegister(this.user).then(() => {
                // 跳转主页
                this.$store.commit('clogstate', true);
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
            console.log('register');
            // userService.register(this.user).then((res) => {
            //     // 保存token
            //     this.SET_TOKEN(res.data.data.token);
            //     //
            //     // vuex重构 保存token
            //     // this.$store.commit('userModule/SET_TOKEN', res.data.data.token);
            //     //
            //     // 未vuex重构 保存token
            //     // storageService.set(storageService.USER_TOKEN, res.data.data.token);
            //     return userService.info();
            // }).then((response) => {
            //     // 保存用户信息
            //     this.SET_USERINFO(response.data.user);
            //     // this.$store.commit('userModule/SET_USERINFO', res.data.user);
            // eslint-disable-next-line max-len
            //     // storageService.set(storageService.USER_INFO, JSON.stringify(response.data.user));
            //     // 跳转主页
            //     this.$router.replace({ name: 'Home' });
            // }).catch((err) => {
            //     // console.log('err:', err.response.data.msg);
            //     this.$bvToast.toast(err.response.data.msg, {
            //         title: '数据验证错误',
            //         variant: 'danger',
            //         toaster: 'b-toaster-top-center',
            //         solid: true,
            //     });
            // });
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
