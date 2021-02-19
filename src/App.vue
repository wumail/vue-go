<!-- eslint-disable max-len -->
<template>
  <div id="app">
    <div
      v-if="!logstate"
      class="ReLo"
    >
      <div v-if="this.logorreg === 'login'">
        <login />

      </div>
      <div v-if="this.logorreg === 'register'">
        <register />

      </div>
    </div>
    <div v-if="logstate">
      <navbar />
      <b-container>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </b-container>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Navbar from './views/layout/Navbar.vue';
import login from './views/login/Login.vue';
import register from './views/register/Register.vue';

export default {
    components: { Navbar, login, register },
    name: 'App',
    created() {
    // 在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            this.$store.replaceState({ ...this.$store.state, ...JSON.parse(sessionStorage.getItem('store')) });
        }

        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state));
        });
    },
    data() {
        return {
            // logorreg: 'login',
        };
    },
    computed: mapState({
        logstate: (state) => state.iflogin,
        logorreg: (state) => state.logorreg,
    }),
    methods: {
        ...mapMutations({ logorregState: 'clogorregstate' }),
        dologorreg(logorreg) {
            this.$store.state.logorreg = logorreg;
        },
    },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

.ReLo {
  background-image: linear-gradient(
    to bottom right,
    rgb(123, 104, 238),
    rgb(72, 209, 204)
  );
  background-attachment: fixed;
  width: 100vw;
  padding-top: 1%;
  padding-bottom: 5.7%;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
.logorreg {
  text-align: center;
  margin-top: 20px;
}
#lorgbtn {
  background-image: linear-gradient(
    to right,
    rgb(72, 209, 204),
    rgb(123, 104, 238)
  );
}
#lorinput {
  border: 0;
  border-bottom: 1px solid #ccc;
}
.imgstyle {
  width: 300px;
}
</style>
