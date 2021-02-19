<template>
  <div
    class="col-lg-12 col-md-12 col-sm-12 col-xs-12 page-left border"
    style="
        border-radius: 15px;
        box-shadow: 5px 5px 5px #888888;
        margin-top:30px;
        margin-bottom:40px;
        min-height:540px;"
  >
    <div style="margin:20px">
      <!-- <b-button
        v-b-toggle.sidebar-1
        style="margin:20px"
      >Choose the game</b-button> -->

      <!-- <b-sidebar
        id="sidebar-1"
        title="所有游戏"
        shadow="lg"
      >
        <div class="px-3 py-2">

          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <b-img
            src="https://picsum.photos/500/500/?image=54"
            fluid
            thumbnail
          ></b-img>
        </div>
      </b-sidebar> -->

    </div>
    <iframe
      src="static/score.htm"
      scrolling="no"
      style="width: 100%;min-height: 500px;"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
</style>
