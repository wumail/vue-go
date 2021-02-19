<template>
  <div class="home">
    <!-- <div>
      <b-button>Button</b-button>
      <b-button variant="danger">Button</b-button>
      <b-button variant="success">Button</b-button>
      <b-button variant="outline-primary">Button</b-button>
    </div> -->
    <!-- <img
      alt="Vue logo"
      src="../assets/logo.png"
    > -->
    <!-- <MyHome /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
// import MyHome from '@/components/MyHome.vue';

export default {
    name: 'Home',
    components: {
        HelloWorld,
        // MyHome,
    },
};
</script>
<style lang="scss" scoped>
.profavatarStyle {
  width: 65px;
  height: 65px;
}
</style>
